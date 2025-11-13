<?php

namespace Drupal\auto_translate\Service;

use Drupal\Core\Config\ConfigFactoryInterface;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\RequestException;

/**
 * Service for handling DeepSeek API translation requests.
 */
class TranslateService {

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * The HTTP client.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * Constructs a TranslateService object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   * @param \GuzzleHttp\ClientInterface $http_client
   *   The HTTP client.
   */
  public function __construct(ConfigFactoryInterface $config_factory, ClientInterface $http_client) {
    $this->configFactory = $config_factory;
    $this->httpClient = $http_client;
  }

  /**
   * Translate text using DeepSeek API.
   *
   * @param string $text
   *   The text to translate.
   * @param string $target_lang
   *   Target language code (zh-TW for TC, zh-CN for SC).
   * @param string $source_lang
   *   Source language code (default: 'auto' for auto-detect).
   *
   * @return string
   *   The translated text.
   *
   * @throws \Exception
   *   If translation fails.
   */
  public function translate($text, $target_lang, $source_lang = 'auto') {
    $config = $this->configFactory->get('auto_translate.settings');
    $api_key = $config->get('api_key');

    \Drupal::logger('auto_translate')->debug('TranslateService::translate called', [
      'target_lang' => $target_lang,
      'source_lang' => $source_lang,
      'text_length' => strlen($text),
      'has_api_key' => !empty($api_key),
    ]);

    if (empty($api_key)) {
      \Drupal::logger('auto_translate')->error('API key is not configured');
      throw new \Exception('DeepSeek API key is not configured. Please configure it in the module settings at /admin/config/services/auto-translate');
    }

    // Validate API key format (DeepSeek keys start with 'sk-')
    if (strpos($api_key, 'sk-') !== 0) {
      \Drupal::logger('auto_translate')->warning('API key format may be incorrect. DeepSeek API keys should start with "sk-"');
    }

    // Log API key info (masked for security)
    $masked_key = substr($api_key, 0, 7) . '...' . substr($api_key, -4);
    \Drupal::logger('auto_translate')->debug('Using API key: @key', ['@key' => $masked_key]);

    // Map language codes to language names for DeepSeek
    $lang_names = [
      'tc' => '繁體中文',
      'sc' => '简体中文',
      'zh-TW' => '繁體中文',
      'zh-CN' => '简体中文',
      'en' => 'English',
    ];

    $target_lang_name = $lang_names[$target_lang] ?? ($lang_names['sc'] ?? '简体中文');

    // Build translation prompt
    // If source language is 'auto', let DeepSeek detect and translate
    if ($source_lang === 'auto') {
      $prompt = "请将以下文本翻译为{$target_lang_name}。如果文本已经是{$target_lang_name}，请保持原样。只返回翻译后的文本，不要添加任何解释、说明或标记：\n\n" . $text;
    } else {
      $source_lang_name = $lang_names[$source_lang] ?? '原始语言';
      // If source and target are different, force translation
      if ($source_lang !== $target_lang) {
        $prompt = "请将以下{$source_lang_name}文本翻译为{$target_lang_name}。只返回翻译后的文本，不要添加任何解释、说明或标记：\n\n" . $text;
      } else {
        // Source and target are same, but still ask for translation (might be different variant)
        $prompt = "请将以下文本翻译为{$target_lang_name}。只返回翻译后的文本，不要添加任何解释、说明或标记：\n\n" . $text;
      }
    }

    \Drupal::logger('auto_translate')->debug('Translation prompt', [
      'source_lang' => $source_lang,
      'target_lang' => $target_lang,
      'prompt_length' => strlen($prompt),
      'prompt_preview' => substr($prompt, 0, 200),
    ]);

    // DeepSeek API endpoint (OpenAI compatible)
    $url = 'https://api.deepseek.com/v1/chat/completions';

    $options = [
      'json' => [
        'model' => 'deepseek-chat',
        'messages' => [
          [
            'role' => 'user',
            'content' => $prompt,
          ],
        ],
        'temperature' => 0.3,
        'max_tokens' => 4000,
      ],
      'headers' => [
        'Content-Type' => 'application/json',
        'Authorization' => 'Bearer ' . $api_key,
      ],
      // Increase timeout to 120 seconds for long translations
      'timeout' => 120,
      'connect_timeout' => 30,
    ];

    try {
      \Drupal::logger('auto_translate')->debug('Sending request to DeepSeek API', [
        'url' => $url,
        'target_lang' => $target_lang,
        'text_length' => strlen($text),
      ]);

      $response = $this->httpClient->request('POST', $url, $options);
      $response_body = $response->getBody()->getContents();
      $body = json_decode($response_body, TRUE);

      \Drupal::logger('auto_translate')->debug('DeepSeek API response received', [
        'status_code' => $response->getStatusCode(),
        'has_choices' => isset($body['choices']),
        'response_preview' => substr($response_body, 0, 200),
      ]);

      if (isset($body['choices'][0]['message']['content'])) {
        $translated_text = trim($body['choices'][0]['message']['content']);

        // Log translation result
        \Drupal::logger('auto_translate')->debug('Translation successful', [
          'translated_length' => strlen($translated_text),
          'original_length' => strlen($text),
          'translated_preview' => substr($translated_text, 0, 200),
          'original_preview' => substr($text, 0, 200),
          'is_same' => $translated_text === $text,
        ]);

        // Check if translation actually happened
        if ($translated_text === $text) {
          \Drupal::logger('auto_translate')->warning('DeepSeek returned same text as original', [
            'source_lang' => $source_lang,
            'target_lang' => $target_lang,
            'text_preview' => substr($text, 0, 100),
          ]);
        }

        return $translated_text;
      }
      else {
        \Drupal::logger('auto_translate')->error('Invalid response structure from DeepSeek API', [
          'response' => $response_body,
        ]);
        throw new \Exception('Invalid response from DeepSeek API. Response: ' . substr($response_body, 0, 500));
      }
    }
    catch (RequestException $e) {
      $message = 'Failed to translate text: ' . $e->getMessage();
      $error_details = [
        'message' => $e->getMessage(),
        'has_response' => $e->hasResponse(),
      ];

      if ($e->hasResponse()) {
        $error_body = $e->getResponse()->getBody()->getContents();
        $error_details['response_body'] = $error_body;
        $error_details['status_code'] = $e->getResponse()->getStatusCode();
        $message .= ' - Status: ' . $e->getResponse()->getStatusCode() . ' - ' . $error_body;
      }

      \Drupal::logger('auto_translate')->error('DeepSeek API request failed', $error_details);
      throw new \Exception($message);
    }
  }

}

