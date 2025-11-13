<?php

namespace Drupal\auto_translate\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure Auto Translate settings.
 */
class TranslateSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['auto_translate.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'auto_translate_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('auto_translate.settings');

    $form['api_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('DeepSeek API Key'),
      '#description' => $this->t('Enter your DeepSeek API key. You can get one from <a href="https://platform.deepseek.com/api_keys" target="_blank">DeepSeek Platform</a>.'),
      '#default_value' => $config->get('api_key'),
      '#required' => TRUE,
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('auto_translate.settings')
      ->set('api_key', $form_state->getValue('api_key'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}

