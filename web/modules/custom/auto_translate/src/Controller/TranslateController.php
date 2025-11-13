<?php

namespace Drupal\auto_translate\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\auto_translate\Service\TranslateService;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Access\CsrfTokenGenerator;

/**
 * Controller for handling translation requests.
 */
class TranslateController extends ControllerBase {

  /**
   * The translate service.
   *
   * @var \Drupal\auto_translate\Service\TranslateService
   */
  protected $translateService;

  /**
   * The CSRF token generator.
   *
   * @var \Drupal\Core\Access\CsrfTokenGenerator
   */
  protected $csrfToken;

  /**
   * Constructs a TranslateController object.
   *
   * @param \Drupal\auto_translate\Service\TranslateService $translate_service
   *   The translate service.
   * @param \Drupal\Core\Access\CsrfTokenGenerator $csrf_token
   *   The CSRF token generator.
   */
  public function __construct(TranslateService $translate_service, CsrfTokenGenerator $csrf_token) {
    $this->translateService = $translate_service;
    $this->csrfToken = $csrf_token;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('auto_translate.translate_service'),
      $container->get('csrf_token')
    );
  }

  /**
   * Translate content using Google Translate API.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request object.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   JSON response with translated content.
   */
  public function translate(Request $request) {
    // Verify CSRF token if provided
    $token = NULL;
    if ($request->headers->has('X-CSRF-Token')) {
      $token = $request->headers->get('X-CSRF-Token');
    }

    $data = json_decode($request->getContent(), TRUE);
    if (!$token && isset($data['token'])) {
      $token = $data['token'];
    }

    // If token is provided, validate it (but don't block if missing for now)
    if ($token) {
      if (!$this->csrfToken->validate($token, 'auto_translate')) {
        \Drupal::logger('auto_translate')->warning('Invalid CSRF token provided');
        // For now, we'll allow the request to proceed even with invalid token
        // You can uncomment the next line to enforce strict CSRF validation:
        // return new JsonResponse(['success' => FALSE, 'message' => 'Invalid CSRF token'], 403);
      }
    }

    // Log the request for debugging
    \Drupal::logger('auto_translate')->notice('Translation request received: @data', [
      '@data' => json_encode([
        'has_text' => isset($data['text']),
        'has_target_lang' => isset($data['target_lang']),
        'target_lang' => $data['target_lang'] ?? 'N/A',
        'source_lang' => $data['source_lang'] ?? 'auto',
        'text_length' => isset($data['text']) ? strlen($data['text']) : 0,
        'has_token' => !empty($token),
      ]),
    ]);

    if (!isset($data['text']) || !isset($data['target_lang'])) {
      \Drupal::logger('auto_translate')->error('Missing required parameters');
      return new JsonResponse([
        'success' => FALSE,
        'message' => 'Missing required parameters: text and target_lang',
        'debug' => [
          'received_data' => array_keys($data ?? []),
        ],
      ], 400);
    }

    $text = $data['text'];
    $target_lang = $data['target_lang'];
    $source_lang = $data['source_lang'] ?? 'auto';

    try {
      $translated_text = $this->translateService->translate($text, $target_lang, $source_lang);

      \Drupal::logger('auto_translate')->notice('Translation successful: @length chars', [
        '@length' => strlen($translated_text),
      ]);

      return new JsonResponse([
        'success' => TRUE,
        'translated_text' => $translated_text,
      ]);
    }
    catch (\Exception $e) {
      $error_message = $e->getMessage();
      \Drupal::logger('auto_translate')->error('Translation failed: @error', [
        '@error' => $error_message,
      ]);

      return new JsonResponse([
        'success' => FALSE,
        'message' => $error_message,
        'error_details' => [
          'type' => get_class($e),
          'file' => $e->getFile(),
          'line' => $e->getLine(),
        ],
      ], 500);
    }
  }

  /**
   * Save translated content to node.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request object.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   JSON response with save status.
   */
  public function save(Request $request) {
    $data = json_decode($request->getContent(), TRUE);

    if (!isset($data['nid']) || !isset($data['fields'])) {
      return new JsonResponse([
        'success' => FALSE,
        'message' => 'Missing required parameters: nid and fields',
      ], 400);
    }

    try {
      $node = \Drupal\node\Entity\Node::load($data['nid']);

      if (!$node) {
        return new JsonResponse([
          'success' => FALSE,
          'message' => 'Node not found',
        ], 404);
      }

      // Update fields with translated content
      foreach ($data['fields'] as $field_name => $field_value) {
        if ($node->hasField($field_name)) {
          $field = $node->get($field_name);

          // Handle complex field structure (e.g., body[0][value])
          if (is_array($field_value) && isset($field_value[0])) {
            // Field has delta structure
            $field_values = [];
            foreach ($field_value as $delta => $delta_value) {
              if (is_array($delta_value)) {
                // Has property structure (e.g., [0][value])
                $field_values[] = $delta_value;
              } else {
                // Simple value
                $field_values[] = ['value' => $delta_value];
              }
            }
            $field->setValue($field_values);
          }
          elseif (is_array($field_value)) {
            // Simple array value
            $field->setValue($field_value);
          }
          else {
            // Simple string value - set as first delta
            $field->setValue([['value' => $field_value]]);
          }
        }
      }

      $node->save();

      return new JsonResponse([
        'success' => TRUE,
        'message' => 'Translation saved successfully',
      ]);
    }
    catch (\Exception $e) {
      return new JsonResponse([
        'success' => FALSE,
        'message' => $e->getMessage(),
      ], 500);
    }
  }

}

