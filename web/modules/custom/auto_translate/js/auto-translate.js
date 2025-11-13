// Immediate check - this should run as soon as file loads
console.log('🚀 auto-translate.js 文件已加载！');
console.log('检查依赖:', {
  jQuery: typeof jQuery !== 'undefined',
  Drupal: typeof Drupal !== 'undefined',
  drupalSettings: typeof drupalSettings !== 'undefined'
});

(function ($, Drupal, drupalSettings) {
  'use strict';

  console.log('✅ auto-translate.js IIFE 开始执行');

  Drupal.behaviors.autoTranslate = {
    attach: function (context, settings) {
      console.log('=== Auto Translate: 模块初始化 ===');
      console.log('Context:', context);
      console.log('Settings:', settings);

      var self = this;
      var originalFields = {};
      var translatedFields = {};
      var currentNodeId = null;

      // Check if buttons exist
      var $tcBtn = $('.translate-tc-btn', context);
      var $scBtn = $('.translate-sc-btn', context);
      console.log('检查按钮是否存在:', {
        tcButton: $tcBtn.length,
        scButton: $scBtn.length,
        tcButtonId: $tcBtn.length ? $tcBtn.attr('id') : 'N/A',
        scButtonId: $scBtn.length ? $scBtn.attr('id') : 'N/A'
      });

      // Get current node ID from URL or form
      function getNodeId() {
        // Method 1: Try to get from URL
        var path = window.location.pathname;
        var match = path.match(/\/node\/(\d+)\/edit/);
        if (match) {
          console.log('从 URL 获取节点 ID:', match[1]);
          return match[1];
        }

        // Method 2: Try to get from form action URL
        var $form = $('form.node-form, form[id*="node-form"]');
        if ($form.length > 0) {
          var action = $form.attr('action') || '';
          var actionMatch = action.match(/\/node\/(\d+)\/edit/);
          if (actionMatch) {
            console.log('从表单 action 获取节点 ID:', actionMatch[1]);
            return actionMatch[1];
          }
        }

        // Method 3: Try to get from hidden input field
        var $nidInput = $('input[name*="nid"], input[name*="node_id"], input[id*="nid"]');
        if ($nidInput.length > 0) {
          var nidValue = $nidInput.val();
          if (nidValue && /^\d+$/.test(nidValue)) {
            console.log('从隐藏字段获取节点 ID:', nidValue);
            return nidValue;
          }
        }

        // Method 4: Try to get from data attributes
        var $nodeElement = $('[data-node-id], [data-nid]');
        if ($nodeElement.length > 0) {
          var dataNid = $nodeElement.attr('data-node-id') || $nodeElement.attr('data-nid');
          if (dataNid && /^\d+$/.test(dataNid)) {
            console.log('从 data 属性获取节点 ID:', dataNid);
            return dataNid;
          }
        }

        // Method 5: Try to get from Drupal settings
        if (typeof drupalSettings !== 'undefined' && drupalSettings.path) {
          var currentPath = drupalSettings.path.currentPath || '';
          var pathMatch = currentPath.match(/node\/(\d+)\/edit/);
          if (pathMatch) {
            console.log('从 drupalSettings.path 获取节点 ID:', pathMatch[1]);
            return pathMatch[1];
          }
        }

        console.warn('无法获取节点 ID，尝试的方法:', [
          'URL: ' + path,
          '表单 action: ' + ($form.length > 0 ? $form.attr('action') : 'N/A'),
          '隐藏字段: ' + ($nidInput.length > 0 ? $nidInput.val() : 'N/A'),
          'data 属性: ' + ($nodeElement.length > 0 ? ($nodeElement.attr('data-node-id') || $nodeElement.attr('data-nid')) : 'N/A')
        ]);

        return null;
      }

      // Get all translatable text fields including paragraphs
      function getTranslatableFields() {
        console.log('=== getTranslatableFields: 开始查找可翻译字段 ===');
        var fields = {};
        var fieldIndex = 0;

        // Get title field
        var titleField = $('#edit-title-0-value');
        console.log('检查 Title 字段:', {
          found: titleField.length > 0,
          value: titleField.length > 0 ? titleField.val() : 'N/A',
          trimmed: titleField.length > 0 ? titleField.val().trim() : 'N/A'
        });
        if (titleField.length && titleField.val().trim()) {
          fields['title'] = {
            element: titleField,
            value: titleField.val(),
            name: 'title[0][value]'
          };
          console.log('✓ 找到 Title 字段:', fields['title'].value.substring(0, 50) + '...');
        }

        // Get body field (CKEditor5 or CKEditor4)
        var bodyField = $('#edit-body-0-value');
        console.log('检查 Body 字段:', {
          found: bodyField.length > 0,
          id: bodyField.length > 0 ? bodyField.attr('id') : 'N/A'
        });
        if (bodyField.length) {
          var bodyValue = '';
          var isCkeditor5 = false;
          var isCkeditor4 = false;
          var ckeditorId = 'edit-body-0-value';

          // Check for CKEditor5 (Drupal's CKEditor5)
          // CKEditor5 syncs to textarea, so we can check by looking for the editor element
          var $editorElement = $('[data-drupal-selector="' + ckeditorId + '"]');
          console.log('检查 CKEditor5:', {
            editorElementFound: $editorElement.length > 0,
            hasCkEditorClass: $editorElement.length > 0 ? $editorElement.hasClass('ck-editor') : false
          });
          if ($editorElement.length && $editorElement.hasClass('ck-editor')) {
            // CKEditor5 is active - get value from textarea (it syncs automatically)
            bodyValue = bodyField.val();
            isCkeditor5 = true;
            console.log('✓ 检测到 CKEditor5, 从 textarea 获取值, 长度:', bodyValue.length);
          }
          // Alternative: Check for Drupal.editors
          else if (typeof Drupal !== 'undefined' && Drupal.editors && Drupal.editors.ckeditor5) {
            // Try to get instance from Drupal.editors
            var editor = Drupal.editors.ckeditor5;
            if (editor && editor.attach && bodyField.data('editor-active-id')) {
              bodyValue = bodyField.val();
              isCkeditor5 = true;
              console.log('✓ 通过 Drupal.editors 检测到 CKEditor5, 长度:', bodyValue.length);
            }
          }

          // Check for CKEditor4 (fallback)
          if (!isCkeditor5 && typeof CKEDITOR !== 'undefined' && CKEDITOR.instances[ckeditorId]) {
            bodyValue = CKEDITOR.instances[ckeditorId].getData();
            isCkeditor4 = true;
            console.log('✓ 检测到 CKEditor4, 长度:', bodyValue.length);
          }

          // Fallback to textarea value
          if (!isCkeditor5 && !isCkeditor4) {
            bodyValue = bodyField.val();
            console.log('✓ 使用 textarea 值 (非 CKEditor), 长度:', bodyValue.length);
          }

          if (bodyValue && bodyValue.trim()) {
            fields['body'] = {
              element: bodyField,
              value: bodyValue,
              name: 'body[0][value]',
              isCkeditor5: isCkeditor5,
              isCkeditor4: isCkeditor4,
              ckeditorId: ckeditorId
            };
            console.log('✓ 找到 Body 字段:', bodyValue.substring(0, 50) + '...');
          } else {
            console.log('✗ Body 字段为空或只有空白');
          }
        }

        // Get body field (if using textarea directly)
        var bodyTextarea = $('textarea[name*="body"]');
        if (bodyTextarea.length && !fields.body) {
          var bodyValue = bodyTextarea.val();
          if (bodyValue.trim()) {
            fields['body'] = {
              element: bodyTextarea,
              value: bodyValue,
              name: bodyTextarea.attr('name')
            };
          }
        }

        // Get all paragraphs fields
        var paragraphContainers = $('.paragraphs-subform, .field--widget-paragraphs, .field--widget-entity-reference-paragraphs');
        console.log('检查 Paragraphs 字段:', {
          containersFound: paragraphContainers.length,
          selectors: ['.paragraphs-subform', '.field--widget-paragraphs', '.field--widget-entity-reference-paragraphs']
        });

        paragraphContainers.each(function(index) {
          var $paragraph = $(this);
          console.log('处理 Paragraph 容器 #' + (index + 1) + ':', {
            classes: $paragraph.attr('class'),
            inputsFound: $paragraph.find('input[type="text"], textarea').length
          });

          // Find all text inputs and textareas within this paragraph
          $paragraph.find('input[type="text"], textarea').each(function() {
            var $field = $(this);
            var name = $field.attr('name');

            // Skip system fields and buttons
            if (name &&
                !name.includes('form_token') &&
                !name.includes('form_id') &&
                !name.includes('form_build_id') &&
                !name.includes('_format') &&
                !name.includes('_langcode') &&
                !name.includes('_weight') &&
                !name.includes('_actions') &&
                !name.includes('remove_button') &&
                !name.includes('add_more') &&
                $field.is(':visible') &&
                $field.attr('type') !== 'hidden' &&
                !$field.hasClass('button')) {

              var fieldValue = '';
              var isCkeditor5 = false;
              var isCkeditor4 = false;
              var ckeditorId = $field.attr('id');

              // Check for CKEditor5 (Drupal's CKEditor5)
              // CKEditor5 syncs to textarea automatically
              if (ckeditorId) {
                var $editorElement = $('[data-drupal-selector="' + ckeditorId + '"]');
                if ($editorElement.length && $editorElement.hasClass('ck-editor')) {
                  fieldValue = $field.val();
                  isCkeditor5 = true;
                }
                // Alternative check
                else if (typeof Drupal !== 'undefined' && Drupal.editors && $field.data('editor-active-id')) {
                  fieldValue = $field.val();
                  isCkeditor5 = true;
                }
              }

              // Check for CKEditor4 (fallback)
              if (!isCkeditor5 && ckeditorId && typeof CKEDITOR !== 'undefined' && CKEDITOR.instances[ckeditorId]) {
                fieldValue = CKEDITOR.instances[ckeditorId].getData();
                isCkeditor4 = true;
              }

              // Fallback to textarea value
              if (!isCkeditor5 && !isCkeditor4) {
                fieldValue = $field.val();
              }

              if (fieldValue && fieldValue.trim()) {
                var fieldKey = 'field_' + fieldIndex + '_' + name.replace(/[\[\]]/g, '_');
                fields[fieldKey] = {
                  element: $field,
                  value: fieldValue,
                  name: name,
                  isCkeditor5: isCkeditor5,
                  isCkeditor4: isCkeditor4,
                  ckeditorId: ckeditorId
                };
                console.log('✓ 找到 Paragraph 字段:', {
                  key: fieldKey,
                  name: name,
                  valuePreview: fieldValue.substring(0, 50) + '...',
                  length: fieldValue.length,
                  isCkeditor5: isCkeditor5,
                  isCkeditor4: isCkeditor4
                });
                fieldIndex++;
              } else {
                console.log('✗ 跳过空字段:', name);
              }
            }
          });
        });

        // Get all other text fields (excluding system fields and paragraphs)
        $('input[type="text"], textarea').each(function() {
          var $field = $(this);
          var name = $field.attr('name');

          // Skip if already processed or is a paragraph field
          if ($field.closest('.paragraphs-subform, .field--widget-paragraphs').length > 0) {
            return;
          }

          // Skip system fields
          if (name &&
              !name.includes('form_token') &&
              !name.includes('form_id') &&
              !name.includes('form_build_id') &&
              !name.includes('_format') &&
              !name.includes('_langcode') &&
              !name.includes('_weight') &&
              name !== 'title' &&
              name !== 'body') {

            // Check if it's a translatable field (not a button, hidden field, etc.)
            if ($field.is(':visible') &&
                $field.attr('type') !== 'hidden' &&
                !$field.hasClass('button')) {

              var fieldValue = '';
              var isCkeditor5 = false;
              var isCkeditor4 = false;
              var ckeditorId = $field.attr('id');

              // Check for CKEditor5 (Drupal's CKEditor5)
              // CKEditor5 syncs to textarea automatically
              if (ckeditorId) {
                var $editorElement = $('[data-drupal-selector="' + ckeditorId + '"]');
                if ($editorElement.length && $editorElement.hasClass('ck-editor')) {
                  fieldValue = $field.val();
                  isCkeditor5 = true;
                }
                // Alternative check
                else if (typeof Drupal !== 'undefined' && Drupal.editors && $field.data('editor-active-id')) {
                  fieldValue = $field.val();
                  isCkeditor5 = true;
                }
              }

              // Check for CKEditor4 (fallback)
              if (!isCkeditor5 && ckeditorId && typeof CKEDITOR !== 'undefined' && CKEDITOR.instances[ckeditorId]) {
                fieldValue = CKEDITOR.instances[ckeditorId].getData();
                isCkeditor4 = true;
              }

              // Fallback to textarea value
              if (!isCkeditor5 && !isCkeditor4) {
                fieldValue = $field.val();
              }

              if (fieldValue && fieldValue.trim()) {
                var fieldKey = name.replace(/[\[\]]/g, '_');
                if (!fields[fieldKey]) {
                  fields[fieldKey] = {
                    element: $field,
                    value: fieldValue,
                    name: name,
                    isCkeditor5: isCkeditor5,
                    isCkeditor4: isCkeditor4,
                    ckeditorId: ckeditorId
                  };
                }
              }
            }
          }
        });

        console.log('=== getTranslatableFields: 完成 ===');
        console.log('总共找到', Object.keys(fields).length, '个可翻译字段');
        console.log('字段列表:', Object.keys(fields));
        return fields;
      }

      // Collect all text content from the page
      function collectTextContent() {
        console.log('=== collectTextContent: 开始收集文本内容 ===');
        var fields = getTranslatableFields();
        var texts = [];
        var fieldMap = {};

        Object.keys(fields).forEach(function(key, index) {
          var field = fields[key];
          var text = field.value || '';

          if (text.trim()) {
            texts.push(text);
            fieldMap[index] = {
              key: key,
              element: field.element,
              name: field.name
            };
            console.log('收集文本 #' + index + ':', {
              key: key,
              name: field.name,
              textPreview: text.substring(0, 100) + '...',
              textLength: text.length
            });
          }
        });

        console.log('=== collectTextContent: 完成 ===');
        console.log('总共收集', texts.length, '个文本字段');
        return {
          texts: texts,
          fieldMap: fieldMap
        };
      }

      // Translate text using DeepSeek API (server-side only)
      function translateText(text, targetLang, sourceLang) {
        return new Promise(function(resolve, reject) {
          console.log('========================================');
          console.log('=== translateText: 开始翻译 (DeepSeek) ===');
          console.log('========================================');
          console.log('翻译参数:', {
            textLength: text.length,
            textPreview: text.substring(0, 200) + '...',
            targetLang: targetLang,
            sourceLang: sourceLang || 'auto'
          });

          // Check if we have API key for server-side translation (DeepSeek)
          var apiKey = drupalSettings.autoTranslate ? drupalSettings.autoTranslate.apiKey : null;

          if (!apiKey) {
            reject(new Error('未配置 DeepSeek API Key。请在 /admin/config/services/auto-translate 配置 API Key。'));
            return;
          }

          console.log('✓ 检测到 API Key，使用服务器端翻译 (DeepSeek)');

          // Use server-side translation (DeepSeek)
          var csrfToken = getCsrfToken();
          var requestData = {
            text: text,
            target_lang: targetLang,
            source_lang: sourceLang || 'auto'
          };
          if (csrfToken) {
            requestData.token = csrfToken;
          }

          console.log('发送服务器端翻译请求...');
          $.ajax({
            url: '/auto-translate/translate',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            beforeSend: function(xhr) {
              if (csrfToken) {
                xhr.setRequestHeader('X-CSRF-Token', csrfToken);
              }
              console.log('AJAX 请求已发送到服务器端 (DeepSeek)');
            },
            success: function(response) {
              console.log('========================================');
              console.log('服务器端响应:', response);
              if (response.success) {
                console.log('✓ 通过服务器端翻译 (DeepSeek) 成功');
                console.log('翻译文本长度:', response.translated_text ? response.translated_text.length : 0);
                console.log('翻译文本预览 (前500字符):', response.translated_text ? response.translated_text.substring(0, 500) : 'N/A');

                // Check if translation actually happened
                if (response.translated_text && response.translated_text === requestData.text) {
                  console.warn('⚠️ 警告：DeepSeek 返回的文本与原始文本完全相同！');
                  console.warn('这可能是因为：');
                  console.warn('1. 源语言和目标语言相同');
                  console.warn('2. 文本已经是目标语言');
                  console.warn('3. DeepSeek 没有执行翻译');
                  // Still resolve, but log the warning
                }

                resolve(response.translated_text);
              } else {
                console.error('✗ 服务器端翻译失败:', response.message);
                reject(new Error('DeepSeek API 翻译失败: ' + (response.message || '未知错误')));
              }
            },
            error: function(xhr, status, error) {
              console.error('========================================');
              console.error('=== 服务器端翻译 AJAX 错误 ===');
              console.error('状态:', status);
              console.error('错误:', error);
              console.error('状态码:', xhr.status);
              console.error('完整响应文本:', xhr.responseText);

              // Parse error response
              var errorMessage = 'DeepSeek API 请求失败';
              var errorDetails = '';

              try {
                if (xhr.responseJSON) {
                  console.error('响应 JSON:', xhr.responseJSON);
                  if (xhr.responseJSON.message) {
                    errorMessage = xhr.responseJSON.message;
                  }
                  if (xhr.responseJSON.error_details) {
                    errorDetails = JSON.stringify(xhr.responseJSON.error_details);
                    console.error('错误详情:', errorDetails);
                  }
                } else if (xhr.responseText) {
                  console.error('尝试解析响应文本...');
                  try {
                    var parsed = JSON.parse(xhr.responseText);
                    console.error('解析后的响应:', parsed);
                    if (parsed.message) {
                      errorMessage = parsed.message;
                    }
                    if (parsed.error_details) {
                      errorDetails = JSON.stringify(parsed.error_details);
                    }
                  } catch (parseError) {
                    console.error('无法解析 JSON:', parseError);
                    // Use raw response text
                    errorMessage = xhr.responseText.substring(0, 500);
                  }
                }
              } catch (e) {
                console.error('解析错误时出错:', e);
                if (xhr.responseText) {
                  errorMessage = xhr.responseText.substring(0, 500);
                }
              }

              // Check if it's a timeout or connection error
              var isGatewayTimeout = xhr.status === 504 || errorMessage.includes('504') || errorMessage.includes('Gateway Timeout') || errorMessage.includes('Gateway Time-out');
              var isTimeout = errorMessage.includes('timeout') || errorMessage.includes('timed out') || errorMessage.includes('Operation timed out') || xhr.status === 0 || isGatewayTimeout;
              var isAuthError = errorMessage.includes('401') || errorMessage.includes('Unauthorized') || errorMessage.includes('invalid') || errorMessage.includes('Authentication');
              var isConnectionError = errorMessage.includes('Connection') || errorMessage.includes('cURL error');

              console.error('错误类型判断:', {
                isTimeout: isTimeout,
                isAuthError: isAuthError,
                isConnectionError: isConnectionError,
                errorMessage: errorMessage
              });

              if (isAuthError) {
                reject(new Error('DeepSeek API Key 无效或已过期。请检查 API Key 配置。\n错误详情: ' + errorMessage + (errorDetails ? '\n' + errorDetails : '')));
              } else if (isGatewayTimeout) {
                reject(new Error('请求超时（504 Gateway Timeout）。Nginx 网关超时，通常是因为文本太长或 DeepSeek API 响应太慢。\n建议：\n1. 尝试翻译较短的文本\n2. 检查服务器 Nginx 超时设置（建议增加到 180 秒）\n3. 或者将文本分成多个部分分别翻译\n错误详情: ' + errorMessage.substring(0, 200)));
              } else if (isTimeout) {
                reject(new Error('DeepSeek API 请求超时（超过 120 秒）。文本可能太长，请尝试翻译较短的文本，或检查网络连接。\n错误详情: ' + errorMessage));
              } else if (isConnectionError) {
                reject(new Error('无法连接到 DeepSeek API。请检查服务器网络连接。\n错误详情: ' + errorMessage));
              } else {
                reject(new Error('DeepSeek API 请求失败。\n错误: ' + errorMessage + (errorDetails ? '\n详情: ' + errorDetails : '')));
              }
            }
          });
        });
      }


      // Translate all fields
      function translateAllFields(targetLang) {
        console.log('========================================');
        console.log('=== translateAllFields: 开始翻译 ===');
        console.log('目标语言:', targetLang);
        console.log('========================================');

        // Get fields first to have full field info
        var allFields = getTranslatableFields();
        var content = collectTextContent();
        var texts = content.texts;
        var fieldMap = content.fieldMap;

        console.log('=== translateAllFields: 字段统计 ===');
        console.log('找到的字段数量:', texts.length);
        console.log('字段映射:', fieldMap);

        if (texts.length === 0) {
          console.error('✗ 没有找到可翻译的文本内容');
          alert('No text content found to translate. Please check that you have text in Title and Paragraphs fields.');
          console.log('可用字段:', allFields);
          return;
        }

        // Show loading indicator
        var $buttons = $('.translate-tc-btn, .translate-sc-btn');
        $buttons.prop('disabled', true).text('Translating...');

        // Combine all texts for batch translation
        var combinedText = texts.join('\n\n---FIELD_SEPARATOR---\n\n');
        console.log('=== translateAllFields: 合并文本 ===');
        console.log('合并后的文本长度:', combinedText.length);
        console.log('合并后的文本预览:', combinedText.substring(0, 500) + '...');

        // Detect source language from current page language
        var sourceLang = 'auto';
        var htmlLang = document.documentElement.getAttribute('lang');
        if (htmlLang) {
          if (htmlLang.includes('zh-TW') || htmlLang === 'tc') {
            sourceLang = 'tc';
          } else if (htmlLang.includes('zh-CN') || htmlLang === 'sc') {
            sourceLang = 'sc';
          } else if (htmlLang.includes('en')) {
            sourceLang = 'en';
          }
        }

        // If source language is same as target language, use 'auto' to let DeepSeek detect
        if (sourceLang === targetLang) {
          console.warn('⚠️ 源语言和目标语言相同 (' + sourceLang + ')，改为使用 auto 让 DeepSeek 自动检测');
          sourceLang = 'auto';
        }

        console.log('=== translateAllFields: 翻译参数 ===');
        console.log('文本数量:', texts.length);
        console.log('目标语言:', targetLang);
        console.log('源语言:', sourceLang);
        console.log('HTML lang 属性:', htmlLang);

        translateText(combinedText, targetLang, sourceLang)
          .then(function(translatedText) {
            console.log('========================================');
            console.log('=== translateAllFields: 收到翻译结果 ===');
            console.log('========================================');
            console.log('原始文本长度:', combinedText.length);
            console.log('翻译结果长度:', translatedText.length);
            console.log('原始文本预览:', combinedText.substring(0, 300));
            console.log('翻译结果预览:', translatedText.substring(0, 300));
            console.log('结果是否相同?', combinedText === translatedText);

            // Check if translation actually happened
            // Note: For HTML content, we need to compare text content, not HTML
            var originalTextContent = $('<div>').html(combinedText).text().trim();
            var translatedTextContent = $('<div>').html(translatedText).text().trim();

            console.log('文本内容比较:');
            console.log('原始文本内容长度:', originalTextContent.length);
            console.log('翻译文本内容长度:', translatedTextContent.length);
            console.log('原始文本内容预览:', originalTextContent.substring(0, 200));
            console.log('翻译文本内容预览:', translatedTextContent.substring(0, 200));
            console.log('文本内容是否相同?', originalTextContent === translatedTextContent);

            // Check if translation actually happened (compare text content, not HTML)
            if (originalTextContent === translatedTextContent || translatedText.length < 10) {
              console.error('⚠️ 严重警告：翻译结果与原始文本相同或为空！');
              console.error('原始文本 (HTML):', combinedText.substring(0, 200));
              console.error('翻译结果 (HTML):', translatedText.substring(0, 200));
              console.error('原始文本 (纯文本):', originalTextContent.substring(0, 200));
              console.error('翻译结果 (纯文本):', translatedTextContent.substring(0, 200));
              console.error('翻译服务可能没有正常工作！');
              console.error('可能的原因：');
              console.error('1. DeepSeek API 返回了原始文本（文本已经是目标语言）');
              console.error('2. 翻译结果分割错误');
              console.error('3. 翻译服务没有真正执行翻译');

              // Still proceed, but warn the user
              console.warn('⚠️ 警告：翻译结果与原始文本相同，但继续处理...');
              // Don't reject, let it continue - maybe the text is already in target language
            }

            // Split translated text back
            var translatedTexts = translatedText.split('\n\n---FIELD_SEPARATOR---\n\n');
            console.log('=== translateAllFields: 分割翻译结果 ===');
            console.log('分割成', translatedTexts.length, '个部分');
            console.log('期望的字段数量:', texts.length);

            if (translatedTexts.length !== texts.length) {
              console.warn('⚠ 警告: 翻译结果数量与原始字段数量不匹配!');
              console.warn('原始字段数:', texts.length);
              console.warn('翻译结果数:', translatedTexts.length);
            }

            // Store original values
            originalFields = {};
            translatedFields = {};

            console.log('=== translateAllFields: 开始更新字段 ===');
            Object.keys(fieldMap).forEach(function(index) {
              var fieldInfo = fieldMap[index];
              var originalValue = texts[index];
              var translatedValue = translatedTexts[index] || texts[index];

              console.log('========================================');
              console.log('处理字段 #' + index + ':', {
                key: fieldInfo.key,
                name: fieldInfo.name,
                originalLength: originalValue.length,
                translatedLength: translatedValue.length,
                originalPreview: originalValue.substring(0, 100),
                translatedPreview: translatedValue.substring(0, 100)
              });
              console.log('原始值完整:', originalValue);
              console.log('翻译值完整:', translatedValue);
              console.log('值是否相同?', originalValue === translatedValue);

              // Check if translation actually happened
              if (originalValue === translatedValue) {
                console.error('⚠️ 警告：翻译值与原始值相同！翻译可能失败！');
                console.error('这可能是以下原因：');
                console.error('1. Google Translate API 返回了原始文本');
                console.error('2. 翻译结果分割错误');
                console.error('3. 翻译服务没有真正执行翻译');
              }

              // Clean up translated value (remove HTML tags if it's plain text field)
              if (translatedValue && !fieldInfo.name.includes('body') && !fieldInfo.name.includes('text')) {
                // For title and simple text fields, strip HTML if present
                var tempDiv = $('<div>').html(translatedValue);
                var plainText = tempDiv.text();
                if (plainText.trim()) {
                  translatedValue = plainText;
                  console.log('清理 HTML 标签后的文本:', translatedValue.substring(0, 50) + '...');
                }
              }

              originalFields[fieldInfo.key] = originalValue;
              translatedFields[fieldInfo.key] = translatedValue;

              // Update field value
              var $field = fieldInfo.element;

              // Find the original field info to check if it's CKEditor
              var originalField = null;
              Object.keys(allFields).forEach(function(key) {
                if (allFields[key].element.is($field)) {
                  originalField = allFields[key];
                }
              });

              console.log('字段类型检测:', {
                found: originalField !== null,
                isCkeditor5: originalField ? originalField.isCkeditor5 : false,
                isCkeditor4: originalField ? originalField.isCkeditor4 : false,
                ckeditorId: originalField ? originalField.ckeditorId : 'N/A'
              });

              // Handle CKEditor5 (Drupal 11)
              if (originalField && originalField.isCkeditor5 && originalField.ckeditorId) {
                console.log('========================================');
                console.log('更新 CKEditor5 字段 (Drupal 11):', originalField.ckeditorId);
                console.log('字段名称:', fieldInfo.name);
                console.log('翻译前值长度:', $field.val().length);
                console.log('要设置的值长度:', translatedValue.length);

                var editorId = originalField.ckeditorId;
                var updated = false;

                // Method 1: Try to find CKEditor5 instance using multiple methods
                try {
                  console.log('========================================');
                  console.log('Method 1: 尝试使用 CKEditor5 API');

                  var editor = null;
                  var editorElement = null;

                  // Try to find editor element
                  editorElement = document.querySelector('[data-drupal-selector="' + editorId + '"]');
                  if (!editorElement) {
                    // Try to find by textarea ID
                    editorElement = $field.closest('.form-textarea-wrapper').next('.ck-editor')[0];
                  }

                  console.log('编辑器元素:', editorElement ? '找到' : '未找到');

                  // Method 1a: Check for Drupal.CKEditor5Instances (most common in Drupal 11)
                  if (typeof Drupal !== 'undefined' && Drupal.CKEditor5Instances) {
                    console.log('尝试使用 Drupal.CKEditor5Instances');
                    if (Drupal.CKEditor5Instances.get) {
                      editor = Drupal.CKEditor5Instances.get(editorId);
                      console.log('通过 Drupal.CKEditor5Instances.get() 获取:', editor ? '成功' : '失败');
                    } else if (Drupal.CKEditor5Instances[editorId]) {
                      editor = Drupal.CKEditor5Instances[editorId];
                      console.log('通过 Drupal.CKEditor5Instances[id] 获取:', editor ? '成功' : '失败');
                    }

                    // Also try to get from all instances
                    if (!editor && Drupal.CKEditor5Instances.getAll) {
                      var allInstances = Drupal.CKEditor5Instances.getAll();
                      console.log('所有 CKEditor5 实例数量:', Object.keys(allInstances || {}).length);
                      for (var key in allInstances) {
                        if (allInstances[key] && allInstances[key].sourceElement && allInstances[key].sourceElement.id === editorId) {
                          editor = allInstances[key];
                          console.log('通过遍历所有实例找到:', key);
                          break;
                        }
                      }
                    }
                  }

                  // Method 1b: Check for Drupal.editors.ckeditor5
                  if (!editor && typeof Drupal !== 'undefined' && Drupal.editors && Drupal.editors.ckeditor5) {
                    console.log('尝试使用 Drupal.editors.ckeditor5');
                    if (Drupal.editors.ckeditor5.instances && Drupal.editors.ckeditor5.instances[editorId]) {
                      editor = Drupal.editors.ckeditor5.instances[editorId];
                      console.log('通过 Drupal.editors.ckeditor5.instances 获取:', editor ? '成功' : '失败');
                    }
                  }

                  // Method 1c: Check for global CKEditor5 instances
                  if (!editor && window.CKEditor5) {
                    console.log('尝试使用 window.CKEditor5');
                    if (editorElement && editorElement.ckeditorInstance) {
                      editor = editorElement.ckeditorInstance;
                      console.log('通过 editorElement.ckeditorInstance 获取:', editor ? '成功' : '失败');
                    }
                  }

                  // Method 1d: Try to get from the textarea element itself
                  if (!editor && $field[0]) {
                    var textareaElement = $field[0];
                    if (textareaElement.ckeditorInstance) {
                      editor = textareaElement.ckeditorInstance;
                      console.log('通过 textarea.ckeditorInstance 获取:', editor ? '成功' : '失败');
                    }
                  }

                  // Method 1e: Try to find in window object
                  if (!editor) {
                    // CKEditor5 might store instances globally
                    for (var prop in window) {
                      if (prop.includes('CKEditor') || prop.includes('ckeditor')) {
                        try {
                          var obj = window[prop];
                          if (obj && typeof obj === 'object' && obj.get) {
                            var testEditor = obj.get(editorId);
                            if (testEditor && typeof testEditor.setData === 'function') {
                              editor = testEditor;
                              console.log('通过 window.' + prop + ' 获取:', '成功');
                              break;
                            }
                          }
                        } catch (e) {
                          // Ignore
                        }
                      }
                    }
                  }

                  if (editor && typeof editor.setData === 'function') {
                    console.log('✓ 找到 CKEditor5 实例，使用 setData() 更新');
                    console.log('编辑器对象:', editor);
                    editor.setData(translatedValue);
                    updated = true;
                    console.log('✓ 通过 CKEditor5 setData() 更新成功');

                    // Verify
                    setTimeout(function() {
                      var currentData = editor.getData();
                      console.log('验证 setData 结果:');
                      console.log('当前编辑器内容长度:', currentData.length);
                      console.log('当前编辑器内容预览:', currentData.substring(0, 200));
                      console.log('是否包含中文?', /[\u4e00-\u9fa5]/.test(currentData));
                    }, 200);
                  } else {
                    console.warn('未找到可用的 CKEditor5 实例');
                    console.log('尝试的方法:', [
                      'Drupal.CKEditor5Instances',
                      'Drupal.editors.ckeditor5',
                      'window.CKEditor5',
                      'editorElement.ckeditorInstance'
                    ]);
                    console.log('可用的全局对象:', Object.keys(window).filter(function(k) { return k.includes('CK') || k.includes('ck'); }));
                  }
                } catch (e) {
                  console.warn('使用 CKEditor5 API 更新失败:', e);
                  console.error('错误详情:', e.message, e.stack);
                }

                // Method 2: Find and update CKEditor5's contenteditable element directly (FORCE UPDATE with retry)
                if (!updated) {
                  console.log('========================================');
                  console.log('Method 2: 强制直接更新 CKEditor5 contenteditable 元素（带重试机制）');

                  // Find the CKEditor5 contenteditable div
                  // From the HTML structure: .form-textarea-wrapper contains textarea, .ck-editor is a sibling
                  var $textarea = $field;
                  var $formTextareaWrapper = $textarea.closest('.form-textarea-wrapper');

                  // CKEditor5 is usually the NEXT sibling of .form-textarea-wrapper
                  var $ckEditor = $formTextareaWrapper.next('.ck-editor');

                  // If not found, try other methods
                  if ($ckEditor.length === 0) {
                    $ckEditor = $formTextareaWrapper.siblings('.ck-editor');
                  }
                  if ($ckEditor.length === 0) {
                    $ckEditor = $formTextareaWrapper.parent().find('.ck-editor');
                  }
                  if ($ckEditor.length === 0) {
                    $ckEditor = $textarea.closest('form').find('.ck-editor');
                  }

                  console.log('找到 .ck-editor，数量:', $ckEditor.length);

                  // Find .ck-content inside .ck-editor
                  var $contentEditable = null;
                  if ($ckEditor.length > 0) {
                    $contentEditable = $ckEditor.find('.ck-content[contenteditable="true"]');
                    console.log('在 .ck-editor 中找到 .ck-content，数量:', $contentEditable.length);
                  }

                  // Direct search as fallback
                  if (!$contentEditable || $contentEditable.length === 0) {
                    $contentEditable = $textarea.closest('form').find('.ck-content[contenteditable="true"]');
                    console.log('直接搜索 .ck-content，数量:', $contentEditable.length);
                  }

                  if ($contentEditable && $contentEditable.length > 0) {
                    console.log('✓ 找到 CKEditor5 contenteditable 元素');
                    console.log('元素:', $contentEditable[0]);
                    console.log('当前内容预览:', $contentEditable[0].innerHTML.substring(0, 100));

                    try {
                      var targetElement = $contentEditable[0];
                      var originalContent = targetElement.innerHTML;
                      var retryCount = 0;
                      var maxRetries = 10;

                      console.log('========================================');
                      console.log('开始强制更新 CKEditor5（带重试机制）');
                      console.log('原始内容长度:', originalContent.length);
                      console.log('新内容长度:', translatedValue.length);

                      // Step 1: Update textarea first
                      $field.val(translatedValue);
                      if ($field[0]) {
                        $field[0].value = translatedValue;
                        $field[0].setAttribute('value', translatedValue);
                        console.log('✓ textarea 已更新');
                      }

                      // Use MutationObserver to watch for changes and force update
                      var observer = new MutationObserver(function(mutations) {
                        var currentContent = targetElement.innerHTML;
                        var hasChinese = /[\u4e00-\u9fa5]/.test(currentContent);
                        var expectedChinese = /[\u4e00-\u9fa5]/.test(translatedValue);

                        // If content was reverted to English, force update again
                        if (!hasChinese && expectedChinese && currentContent !== translatedValue) {
                          console.warn('⚠️ 检测到内容被恢复为英文，强制重新设置');
                          targetElement.innerHTML = translatedValue;
                          targetElement.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                      });

                      // Start observing
                      observer.observe(targetElement, {
                        childList: true,
                        subtree: true,
                        characterData: true
                      });

                      // Function to force update
                      function forceUpdate() {
                        retryCount++;
                        console.log('========================================');
                        console.log('强制更新尝试 #' + retryCount);

                        // Step 1: Update textarea FIRST (CKEditor5 might read from it)
                        $field.val(translatedValue);
                        if ($field[0]) {
                          $field[0].value = translatedValue;
                          $field[0].setAttribute('value', translatedValue);
                        }

                        // Step 2: Directly replace innerHTML
                        targetElement.innerHTML = translatedValue;
                        console.log('✓ innerHTML 已设置');
                        console.log('设置后的内容预览:', targetElement.innerHTML.substring(0, 200));

                        // Step 3: Trigger ALL possible events
                        var events = [
                          new Event('input', { bubbles: true, cancelable: true }),
                          new Event('change', { bubbles: true }),
                          new Event('blur', { bubbles: true }),
                          new Event('focus', { bubbles: true }),
                          new Event('keyup', { bubbles: true }),
                          new Event('keydown', { bubbles: true }),
                          new Event('paste', { bubbles: true, cancelable: true }),
                        ];

                        try {
                          events.push(new InputEvent('beforeinput', { bubbles: true, cancelable: true, inputType: 'insertText' }));
                          events.push(new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'insertText' }));
                        } catch (e) {
                          // Ignore
                        }

                        events.forEach(function(event) {
                          targetElement.dispatchEvent(event);
                        });

                        // Step 4: Also trigger on textarea
                        if ($field[0]) {
                          $field[0].value = translatedValue;
                          $field[0].dispatchEvent(new Event('input', { bubbles: true }));
                          $field[0].dispatchEvent(new Event('change', { bubbles: true }));
                        }

                        // Step 5: Check if update was successful
                        setTimeout(function() {
                          var editorContent = targetElement.innerHTML;
                          var hasChinese = /[\u4e00-\u9fa5]/.test(editorContent);
                          var expectedChinese = /[\u4e00-\u9fa5]/.test(translatedValue);

                          console.log('验证结果:');
                          console.log('编辑器内容预览:', editorContent.substring(0, 200));
                          console.log('编辑器是否包含中文?', hasChinese);
                          console.log('期望包含中文?', expectedChinese);

                          if (hasChinese || !expectedChinese) {
                            console.log('✓ CKEditor5 内容更新成功！');
                            observer.disconnect(); // Stop observing
                            return true; // Success
                          } else if (retryCount < maxRetries) {
                            console.warn('⚠️ 更新未成功，将在 200ms 后重试...');
                            setTimeout(forceUpdate, 200);
                            return false; // Will retry
                          } else {
                            console.error('✗ 已达到最大重试次数，更新失败');
                            observer.disconnect(); // Stop observing
                            return false; // Failed
                          }
                        }, 100);
                      }

                      // Start the update process
                      forceUpdate();

                      // Stop observer after 5 seconds
                      setTimeout(function() {
                        observer.disconnect();
                        console.log('MutationObserver 已停止');
                      }, 5000);

                      updated = true;
                    } catch (e) {
                      console.error('强制更新失败:', e);
                      console.error('错误详情:', e.message, e.stack);
                    }
                  } else {
                    console.error('✗ 未找到 CKEditor5 contenteditable 元素');
                    console.log('尝试的选择器:', [
                      '.form-textarea-wrapper + .ck-editor .ck-content',
                      '.ck-editor .ck-content'
                    ]);
                    console.log('textarea 元素:', $field[0]);
                    console.log('textarea 父元素:', $field.parent()[0]);
                    console.log('form-textarea-wrapper:', $formTextareaWrapper[0]);
                    console.log('form-textarea-wrapper 的兄弟元素:', $formTextareaWrapper.siblings().length);
                  }
                }

                // Method 3: Update textarea and force sync (fallback)
                if (!updated) {
                  console.log('========================================');
                  console.log('使用 textarea 更新方式 (强制同步)');

                  // Set value on textarea
                  $field.val(translatedValue);

                  // Also set native value
                  if ($field[0]) {
                    $field[0].value = translatedValue;
                    $field[0].setAttribute('value', translatedValue);
                  }

                  // Try multiple ways to trigger CKEditor5 sync

                  // 1. Trigger all possible events
                  $field.trigger('input');
                  $field.trigger('change');
                  $field.trigger('blur');
                  $field.trigger('focus');

                  // 2. Use native events
                  if ($field[0]) {
                    var nativeInput = $field[0];
                    nativeInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
                    nativeInput.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
                    nativeInput.dispatchEvent(new Event('blur', { bubbles: true }));
                    nativeInput.dispatchEvent(new Event('focus', { bubbles: true }));
                  }

                  // 3. Try Drupal's editor update mechanism
                  if (typeof Drupal !== 'undefined' && Drupal.editors && Drupal.editors.ckeditor5) {
                    try {
                      if (Drupal.editors.ckeditor5.update) {
                        Drupal.editors.ckeditor5.update($field[0], translatedValue);
                        console.log('✓ 调用 Drupal.editors.ckeditor5.update()');
                      }
                    } catch (e) {
                      console.warn('调用 Drupal.editors.ckeditor5.update() 失败:', e);
                    }
                  }

                  // 4. Try to find and update the editor instance via DOM
                  setTimeout(function() {
                    // Look for the editor element again and try to update
                    var editorElement = document.querySelector('[data-drupal-selector="' + editorId + '"]');
                    if (editorElement) {
                      var $editor = $(editorElement);
                      var $contentEditable = $editor.find('.ck-content[contenteditable="true"]');

                      if ($contentEditable.length > 0) {
                        console.log('延迟更新：找到 contenteditable，直接设置内容');
                        $contentEditable[0].innerHTML = translatedValue;
                        $contentEditable.trigger('input');
                        $contentEditable[0].dispatchEvent(new Event('input', { bubbles: true }));
                      }
                    }

                    // Verify
                    var currentValue = $field.val();
                    console.log('========================================');
                    console.log('验证 CKEditor5 更新结果:');
                    console.log('textarea 当前值长度:', currentValue.length);
                    console.log('期望值长度:', translatedValue.length);
                    console.log('值匹配?', currentValue === translatedValue);

                    // Check if editor content is updated
                    var $editorContainer = $field.closest('.form-textarea-wrapper').next('.ck-editor');
                    if ($editorContainer.length > 0) {
                      var $editorContent = $editorContainer.find('.ck-content');
                      if ($editorContent.length > 0) {
                        var editorText = $editorContent.text();
                        console.log('编辑器内容预览:', editorText.substring(0, 100));
                        console.log('编辑器内容是否包含中文?', /[\u4e00-\u9fa5]/.test(editorText));
                      }
                    }
                  }, 500);

                  updated = true;
                }

                console.log('✓ CKEditor5 字段更新完成:', {
                  id: originalField.ckeditorId,
                  name: fieldInfo.name,
                  length: translatedValue.length,
                  method: updated ? 'success' : 'failed'
                });
              }
              // Handle CKEditor4
              else if (originalField && originalField.isCkeditor4 && originalField.ckeditorId) {
                if (typeof CKEDITOR !== 'undefined' && CKEDITOR.instances[originalField.ckeditorId]) {
                  CKEDITOR.instances[originalField.ckeditorId].setData(translatedValue);
                  console.log('✓ 已更新 CKEditor4 字段:', {
                    id: originalField.ckeditorId,
                    name: fieldInfo.name,
                    length: translatedValue.length
                  });
                } else {
                  // Fallback to textarea
                  $field.val(translatedValue);
                  $field.trigger('change');
                  console.log('✓ 已更新 textarea 字段 (CKEditor4 fallback):', fieldInfo.name);
                }
              }
              // Regular text field (including Title)
              else {
                console.log('========================================');
                console.log('更新普通文本字段:', fieldInfo.name);
                console.log('字段元素:', $field);
                console.log('字段 ID:', $field.attr('id'));
                console.log('字段名称:', $field.attr('name'));
                console.log('翻译前值:', $field.val());
                console.log('要设置的值:', translatedValue);

                // Method 1: Use jQuery val()
                $field.val(translatedValue);

                // Method 2: Use native DOM setter (more reliable)
                if ($field[0]) {
                  $field[0].value = translatedValue;
                  console.log('使用原生 DOM setter 设置值');
                }

                // Method 3: Set attribute directly
                $field.attr('value', translatedValue);

                // Trigger ALL possible events to ensure form recognizes the change
                $field.trigger('input');
                $field.trigger('change');
                $field.trigger('keyup');
                $field.trigger('keydown');
                $field.trigger('blur');
                $field.trigger('focus');

                // Use native events as well
                if ($field[0]) {
                  var nativeInput = $field[0];
                  nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
                  nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
                }

                // Wait a bit and verify
                setTimeout(function() {
                  var currentValue = $field.val();
                  var nativeValue = $field[0] ? $field[0].value : 'N/A';

                  console.log('========================================');
                  console.log('验证字段更新结果:');
                  console.log('jQuery .val():', currentValue);
                  console.log('原生 .value:', nativeValue);
                  console.log('期望值:', translatedValue);
                  console.log('jQuery 值匹配?', currentValue === translatedValue);
                  console.log('原生值匹配?', nativeValue === translatedValue);

                  if (currentValue !== translatedValue && nativeValue !== translatedValue) {
                    console.error('⚠️ 字段值更新失败！');
                    console.error('尝试强制更新...');

                    // Force update one more time
                    if ($field[0]) {
                      $field[0].value = translatedValue;
                      $field[0].setAttribute('value', translatedValue);
                    }
                    $field.val(translatedValue);
                    $field.attr('value', translatedValue);

                    // Trigger events again
                    $field.trigger('input').trigger('change');
                    if ($field[0]) {
                      $field[0].dispatchEvent(new Event('input', { bubbles: true }));
                      $field[0].dispatchEvent(new Event('change', { bubbles: true }));
                    }

                    // Final check
                    var finalValue = $field.val();
                    console.log('最终值:', finalValue);
                    console.log('最终匹配?', finalValue === translatedValue);
                  } else {
                    console.log('✓ 字段值更新成功！');
                  }
                }, 100);

                console.log('✓ 已更新普通文本字段:', {
                  name: fieldInfo.name,
                  length: translatedValue.length
                });
              }
            });

            console.log('=== translateAllFields: 字段更新完成 ===');
            console.log('已更新', Object.keys(translatedFields).length, '个字段');

            // Show save button
            $('#save-translation-button').show();

            // Show success message
            alert('Translation completed! ' + Object.keys(translatedFields).length + ' fields translated. Click "Save Translation" to save the changes.');
          })
          .catch(function(error) {
            alert('Translation error: ' + error.message);
          })
          .finally(function() {
            $buttons.prop('disabled', false);
            $('.translate-tc-btn').text('Translate to TC (繁體)');
            $('.translate-sc-btn').text('Translate to SC (簡體)');
          });
      }

      // Save translated content
      function saveTranslation() {
        currentNodeId = getNodeId();

        if (!currentNodeId) {
          alert('Cannot determine node ID. Please save manually.');
          return;
        }

        if (Object.keys(translatedFields).length === 0) {
          alert('No translation to save.');
          return;
        }

        // Collect all field values
        var fields = getTranslatableFields();
        var fieldsToSave = {};
        var fieldStructure = {};

        Object.keys(fields).forEach(function(key) {
          var field = fields[key];
          var $field = field.element;
          var value = '';

          // Handle CKEditor5
          if (field.isCkeditor5 && field.ckeditorId && typeof Drupal !== 'undefined' && Drupal.CKEditor5Instances) {
            var ckeditor5Instance = Drupal.CKEditor5Instances.get(field.ckeditorId);
            if (ckeditor5Instance) {
              value = ckeditor5Instance.getData();
            } else {
              value = $field.val();
            }
          }
          // Handle CKEditor4
          else if (field.isCkeditor4 && field.ckeditorId && typeof CKEDITOR !== 'undefined' && CKEDITOR.instances[field.ckeditorId]) {
            value = CKEDITOR.instances[field.ckeditorId].getData();
          }
          // Regular field
          else {
            value = $field.val();
          }

          // Map field name properly
          var fieldName = field.name || $field.attr('name');
          if (fieldName) {
            // Handle Drupal field naming (e.g., field_name[0][value] or title[0][value])
            if (fieldName.includes('[')) {
              var parts = fieldName.match(/([^\[]+)\[(\d+)\]\[([^\]]+)\]/);
              if (parts) {
                var baseName = parts[1];
                var delta = parseInt(parts[2]);
                var property = parts[3];

                if (!fieldsToSave[baseName]) {
                  fieldsToSave[baseName] = {};
                }
                if (!fieldsToSave[baseName][delta]) {
                  fieldsToSave[baseName][delta] = {};
                }
                fieldsToSave[baseName][delta][property] = value;

                fieldStructure[baseName] = {
                  delta: delta,
                  property: property
                };
              } else {
                // Simple array field
                var baseName = fieldName.split('[')[0];
                fieldsToSave[baseName] = value;
              }
            } else {
              // Simple field
              fieldsToSave[fieldName] = value;
            }
          }
        });

        // Show loading
        $('#save-translation-button').prop('disabled', true).text('Saving...');

        // Save via AJAX
        var csrfToken = getCsrfToken();

        // Prepare request data
        var requestData = {
          nid: currentNodeId,
          fields: fieldsToSave,
          field_structure: fieldStructure
        };

        // Add CSRF token to request data if available
        if (csrfToken) {
          requestData.token = csrfToken;
        }

        $.ajax({
          url: '/auto-translate/save',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(requestData),
          beforeSend: function(xhr) {
            if (csrfToken) {
              xhr.setRequestHeader('X-CSRF-Token', csrfToken);
            }
          },
          success: function(response) {
            if (response.success) {
              alert('Translation saved successfully!');
              $('#save-translation-button').hide();
              // Optionally reload the page
              // window.location.reload();
            } else {
              alert('Save failed: ' + (response.message || 'Unknown error'));
            }
          },
          error: function(xhr, status, error) {
            var errorMsg = 'Save failed';
            if (xhr.responseJSON && xhr.responseJSON.message) {
              errorMsg = xhr.responseJSON.message;
            }
            alert(errorMsg);
          },
          complete: function() {
            $('#save-translation-button').prop('disabled', false).text('Save Translation');
          }
        });
      }

      // Get CSRF token from Drupal
      function getCsrfToken() {
        console.log('=== 获取 CSRF Token ===');

        // Method 1: Try to get from form token input
        var token = $('input[name="form_token"]').val();
        if (token) {
          console.log('✓ 从 form_token input 获取到 token');
          return token;
        }

        // Method 2: Try to get from drupalSettings
        if (typeof drupalSettings !== 'undefined' && drupalSettings.path && drupalSettings.path.csrfToken) {
          console.log('✓ 从 drupalSettings.path.csrfToken 获取到 token');
          return drupalSettings.path.csrfToken;
        }

        // Method 3: Use Drupal's AJAX system to get token
        if (typeof Drupal !== 'undefined' && Drupal.ajax && Drupal.ajax.bindings) {
          // Try to get token from any form on the page
          var $form = $('form');
          if ($form.length > 0) {
            var formToken = $form.find('input[name="form_token"]').first().val();
            if (formToken) {
              console.log('✓ 从页面表单获取到 token');
              return formToken;
            }
          }
        }

        // Method 4: Try to get from meta tag
        token = $('meta[name="csrf-token"]').attr('content');
        if (token) {
          console.log('✓ 从 meta tag 获取到 token');
          return token;
        }

        // Method 5: Try to get from hidden input with name containing 'token'
        token = $('input[type="hidden"][name*="token"]').first().val();
        if (token) {
          console.log('✓ 从 hidden input 获取到 token');
          return token;
        }

        // Method 6: Generate token using Drupal's token service (if available)
        if (typeof Drupal !== 'undefined' && Drupal.ajax && typeof Drupal.ajax.prototype.beforeSerialize === 'function') {
          // This is a fallback - we'll proceed without token for now
          console.warn('⚠ 无法获取 CSRF token，将尝试不使用 token 发送请求');
        }

        console.warn('⚠ 未找到 CSRF token');
        return '';
      }

      // Function to bind events
      function bindEvents() {
        console.log('=== 开始绑定事件 ===');

        // Check buttons again (they might be loaded now)
        var $tcBtnCheck = $('.translate-tc-btn, #translate-tc-button');
        var $scBtnCheck = $('.translate-sc-btn, #translate-sc-button');
        var $saveBtnCheck = $('.save-translation-btn, #save-translation-button');

        console.log('再次检查按钮:', {
          tcButton: $tcBtnCheck.length,
          scButton: $scBtnCheck.length,
          saveButton: $saveBtnCheck.length,
          tcButtonHTML: $tcBtnCheck.length ? $tcBtnCheck[0].outerHTML.substring(0, 100) : 'N/A',
          scButtonHTML: $scBtnCheck.length ? $scBtnCheck[0].outerHTML.substring(0, 100) : 'N/A'
        });

        // Use event delegation on document to catch all clicks
        $(document).off('click.auto-translate', '.translate-tc-btn, #translate-tc-button').on('click.auto-translate', '.translate-tc-btn, #translate-tc-button', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('========================================');
          console.log('🖱️ 点击了 "Translate to TC (繁體)" 按钮');
          console.log('按钮元素:', this);
          console.log('========================================');
          translateAllFields('tc');
          return false;
        });

        $(document).off('click.auto-translate', '.translate-sc-btn, #translate-sc-button').on('click.auto-translate', '.translate-sc-btn, #translate-sc-button', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('========================================');
          console.log('🖱️ 点击了 "Translate to SC (簡體)" 按钮');
          console.log('按钮元素:', this);
          console.log('========================================');
          translateAllFields('sc');
          return false;
        });

        $(document).off('click.auto-translate', '.save-translation-btn, #save-translation-button').on('click.auto-translate', '.save-translation-btn, #save-translation-button', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('🖱️ 点击了 "Save Translation" 按钮');
          saveTranslation();
          return false;
        });

        // Also bind directly if buttons exist
        if ($tcBtnCheck.length > 0) {
          $tcBtnCheck.off('click.auto-translate-direct').on('click.auto-translate-direct', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('直接绑定 TC 按钮被点击');
            translateAllFields('tc');
            return false;
          });
        }

        if ($scBtnCheck.length > 0) {
          $scBtnCheck.off('click.auto-translate-direct').on('click.auto-translate-direct', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('直接绑定 SC 按钮被点击');
            translateAllFields('sc');
            return false;
          });
        }

        console.log('=== 事件绑定完成 ===');
      }

      // Bind events immediately
      bindEvents();

      // Also bind after a short delay to catch late-loading buttons
      setTimeout(function() {
        console.log('延迟检查按钮并重新绑定事件...');
        bindEvents();
      }, 500);

      // Also bind when DOM is ready (if not already)
      $(document).ready(function() {
        console.log('Document ready - 重新绑定事件');
        bindEvents();
      });

      // Expose test function to window for debugging
      window.testAutoTranslate = function() {
        console.log('=== 手动测试 Auto Translate ===');
        var $tcBtn = $('.translate-tc-btn, #translate-tc-button');
        var $scBtn = $('.translate-sc-btn, #translate-sc-button');
        console.log('按钮状态:', {
          tcButton: $tcBtn.length,
          scButton: $scBtn.length,
          tcButtonVisible: $tcBtn.length ? $tcBtn.is(':visible') : false,
          scButtonVisible: $scBtn.length ? $scBtn.is(':visible') : false,
          tcButtonHTML: $tcBtn.length ? $tcBtn[0].outerHTML : 'N/A',
          scButtonHTML: $scBtn.length ? $scBtn[0].outerHTML : 'N/A'
        });

        // Try to trigger click manually
        if ($tcBtn.length > 0) {
          console.log('尝试手动触发 TC 按钮点击...');
          $tcBtn.trigger('click');
        } else {
          console.error('TC 按钮不存在！');
        }
      };

      // Expose function to manually update CKEditor5
      window.forceUpdateCKEditor5 = function(editorId, newContent) {
        console.log('=== 手动强制更新 CKEditor5 ===');
        console.log('编辑器 ID:', editorId);
        console.log('新内容长度:', newContent ? newContent.length : 'N/A');

        if (!editorId) {
          editorId = 'edit-body-0-value';
        }

        var textarea = document.getElementById(editorId);
        if (!textarea) {
          console.error('未找到 textarea:', editorId);
          return;
        }

        var $textarea = $(textarea);
        var $formTextareaWrapper = $textarea.closest('.form-textarea-wrapper');
        var $ckEditor = $formTextareaWrapper.next('.ck-editor');

        if ($ckEditor.length === 0) {
          $ckEditor = $formTextareaWrapper.siblings('.ck-editor');
        }

        console.log('找到 .ck-editor:', $ckEditor.length);

        var $contentEditable = $ckEditor.find('.ck-content[contenteditable="true"]');
        console.log('找到 .ck-content:', $contentEditable.length);

        if ($contentEditable.length > 0) {
          var targetElement = $contentEditable[0];
          var contentToSet = newContent || textarea.value;

          console.log('当前编辑器内容:', targetElement.innerHTML.substring(0, 100));
          console.log('要设置的内容:', contentToSet.substring(0, 100));

          // Try to find CKEditor5 instance first
          var editor = null;
          if (typeof Drupal !== 'undefined' && Drupal.CKEditor5Instances) {
            if (Drupal.CKEditor5Instances.get) {
              editor = Drupal.CKEditor5Instances.get(editorId);
            } else if (Drupal.CKEditor5Instances[editorId]) {
              editor = Drupal.CKEditor5Instances[editorId];
            }
          }

          if (editor && typeof editor.setData === 'function') {
            console.log('✓ 找到 CKEditor5 实例，使用 setData()');
            editor.setData(contentToSet);
            console.log('✓ setData() 完成');
          } else {
            console.log('未找到 CKEditor5 实例，直接设置 innerHTML');
            targetElement.innerHTML = contentToSet;
            targetElement.dispatchEvent(new Event('input', { bubbles: true }));
            targetElement.dispatchEvent(new Event('change', { bubbles: true }));
          }

          // Update textarea
          textarea.value = contentToSet;
          $(textarea).val(contentToSet);

          // Verify
          setTimeout(function() {
            var editorContent = targetElement.innerHTML;
            console.log('========================================');
            console.log('验证结果:');
            console.log('编辑器内容预览:', editorContent.substring(0, 200));
            console.log('编辑器是否包含中文?', /[\u4e00-\u9fa5]/.test(editorContent));
            console.log('textarea 值预览:', textarea.value.substring(0, 200));
          }, 500);
        } else {
          console.error('未找到 .ck-content 元素');
        }
      };

      console.log('💡 提示:');
      console.log('  - testAutoTranslate() - 手动测试按钮');
      console.log('  - forceUpdateCKEditor5("edit-body-0-value", "中文内容") - 手动强制更新 CKEditor5');
    }
  };

})(jQuery, Drupal, drupalSettings);

