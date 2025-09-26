jQuery(function ($) {
    $(document).ready(function () {
        function hexToRgba(hex, opacity) {
            // 去掉 #
            hex = hex.replace(/^#/, '');

            // 解析 RGB 组件
            let r = parseInt(hex.substring(0, 2), 16);
            let g = parseInt(hex.substring(2, 4), 16);
            let b = parseInt(hex.substring(4, 6), 16);

            // 返回 rgba 格式
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        //获取url中的参数
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
        $('.paragraph:not(.paragraph--type--section):not(form.node-form .paragraph)').each(function () {
            $(this).find('>.paragraph__column .field--name-field-class .field__label').remove();
        });
        $('.paragraph:not(.paragraph--type--section):not(form.node-form .paragraph)').each(function () {
            var show_name = $.trim($(this).find('.paragraph__column .field--name-field-tags').text());
            var class_width = $.trim($(this).find('>.paragraph__column .field--name-field-width').text());
            var background_color = $.trim($(this).find('>.paragraph__column .field--name-field-background-color').text());
            var background_image = $(this).find('>.paragraph__column .field--name-field-background img').attr('src');
            var class_name = $.trim($(this).find('>.paragraph__column .field--name-field-class').text());
            var id_name = $.trim($(this).find('>.paragraph__column .field--name-field-id').text());
            var class_Border = $.trim($(this).find('>.paragraph__column .field--name-field-has-border>.field__item').text());
            if (id_name) {
                $(this).parent().attr('data-id', id_name);
            };
            if (class_name) {
                $(this).parent().addClass(class_name);
            };
            if (class_Border == 'True') {
                $(this).parent().addClass('has-border');
            };
            if (show_name) {
                $(this).parent().addClass(show_name);
            };
            if (class_width) {
                $(this).addClass(class_width);
            };
            if (background_color) {
                var regex = /(\#[0-9a-fA-F]{6})\s+([0-9]*\.?[0-9]+)/;
                var matches = background_color.match(regex);
                var color = matches[1];
                var opacity = matches[2];
                let rgbaColor = hexToRgba(color, opacity);
                $(this).parent().css({
                    "background-color": rgbaColor,
                });
            };
            if (background_image) {
                $(this).parent().css({
                    "background": "url(" + background_image + ")",
                    "width": "100%",
                    "height": "100%",
                    "background-position": "50%",
                    "background-size": "cover",
                    "background-repeat": "no-repeat",
                });
            }
            if (class_Border == 'True') {
                $(this).parent().addClass('has-border');
            };
        });
        $(function () {
            setTimeout(function () {
                // 获取 content_id
                var content_id = getUrlParam('contentid');
                // 获取目标 div
                var targetDiv = $('[data-id="' + content_id + '"]');
                // 检查 content_id 是否存在
                if (content_id) {
                    // 滚动到目标 div
                    $('html, body').animate({
                        scrollTop: targetDiv.offset().top - 160
                    }, 500);
                }
            }, 200);
        });
        // paragraph--type--bp-simple
        $('.page-node-type-programme .paragraph--type--bp-simple>.paragraph__column>.field--name-bp-text>h2:nth-of-type(1)').addClass('side-title');
        // paragraph section style
        $('.paragraph.paragraph--type--section:not(form.node-form .paragraph)').each(function () {
            var show_name = $.trim($(this).find('>.paragraph__column .field--name-field-tags').text());
            var class_width = $.trim($(this).find('>.paragraph__column .field--name-field-width').text());
            var background_color = $.trim($(this).find('>.paragraph__column .field--name-field-background-color').text());
            var background_image = $(this).find('>.paragraph__column .field--name-field-background img').attr('src');
            var class_name = $.trim($(this).find('>.paragraph__column .field--name-field-class').text());
            if (show_name) {
                $(this).parent().addClass(show_name);
            };
            if (class_width) {
                $(this).addClass(class_width);
            };
            if (background_color) {
                var regex = /(\#[0-9a-fA-F]{6})\s+([0-9]*\.?[0-9]+)/;
                var matches = background_color.match(regex);
                var color = matches[1];
                var opacity = matches[2];
                let rgbaColor = hexToRgba(color, opacity);
                $(this).parent().css({
                    "background-color": rgbaColor,
                });
            };
            if (background_image) {
                $(this).parent().css({
                    "background": "url(" + background_image + ")",
                    "width": "100%",
                    "height": "100%",
                    "background-position": "50%",
                    "background-size": "cover",
                    "background-repeat": "no-repeat",
                });
            };
            if (class_name) {
                $(this).addClass(class_name);
            };
        });
        // paragraph Module 1
        $('.paragraph--type--module-1').each(function () {
            // add side-title
            $(this).find('.field--name-bp-header').addClass('side-title');
            // add button link
            var link = $.trim($(this).find('.field--name-bp-link').text());
            if (link.length > 0) {
                var link_text = $.trim($(this).find('.field--name-field-link-text').text());
                $(this).find('.field--name-bp-link').before('<a class="button_link" href="' + link + '" target="_blank" role="link">' + link_text + '</a>');
            }
        });
        // paragraph Module 2
        $('.paragraph--type--module-2').each(function () {
            // add side-title
            $(this).find('>.paragraph__column>.field--name-bp-header').addClass('side-title');
            var columns = $.trim($(this).find('>.paragraph__column>.field--name-field-columns-tags>a').text());
            $(this).find('>.paragraph__column').addClass('row');
            $(this).find('>.paragraph__column>h2').addClass('w-100');
            if (columns) {
                switch (columns) {
                    case '1':
                        $(this).find('>.paragraph__column>.field--name-field-columns-tags').nextAll().addClass('col-md-12');
                        break;
                    case '2':
                        $(this).find('>.paragraph__column>.field--name-field-columns-tags').nextAll().addClass('col-md-6');
                        break;
                    case '3':
                        $(this).find('>.paragraph__column>.field--name-field-columns-tags').nextAll().addClass('col-md-6 col-lg-4');
                        break;
                    case '4':
                        $(this).find('>.paragraph__column>.field--name-field-columns-tags').nextAll().addClass('col-md-6 col-xl-3');
                        break;
                    default:
                }
            }
            // add button link
            var outerElement = $(this);
            outerElement.find('.paragraph--type--card-list').each(function () {
                var link = $.trim($(this).find('.field--name-bp-link').text());
                if (link.length > 0) {
                    var link_text = $.trim($(this).find('.field--name-field-link-text').text());
                    $(this).find('.field--name-bp-link').before('<a class="button_link" href="' + link + '" target="_blank" role="link">' + link_text + '</a>');
                }
            });
        });
        // paragraph Module 3
        var paragraphSwiperhtmlContent = `
        <div class="swiper paragraphSwiper">
            <h2 class="swiper-title side-title"></h2>
            <div class="swiper-wrapper"></div>
            <div class="swiper-button-next paragraphSwiper-button-next"></div>
            <div class="swiper-button-prev paragraphSwiper-button-prev"></div>
            <div class="swiper-pagination paragraphSwiper-pagination"></div>
        </div>
        `;
        $('.paragraph--type--module-3').each(function (index) {
            var outerElement = $(this);
            // 为当前模块生成唯一的 swiper 类名
            var swiperClassName = `.paragraphSwiper${index}`; // 生成唯一类名，例如 .paragraphSwiper0, .paragraphSwiper1, ...
            // title
            var title = $.trim(outerElement.find('>.paragraph__column>.field--name-bp-header').text());
            // 将 HTML 内容插入到当前模块，并替换类名
            var swiperHtml = paragraphSwiperhtmlContent.replace(/paragraphSwiper/g, `paragraphSwiper${index}`);
            outerElement.find('>.paragraph__column').after(swiperHtml);
            outerElement.find('>.paragraph__column>div:not(h2):not(.field--name-field-tags):not(.field--name-field-width):not(.field--name-field-class)').each(function () {
                var innerElement = $(this);
                var paragraphSwiper_title = $.trim(innerElement.find('.field--name-bp-header').text());
                var paragraphSwiper_url = innerElement.find('.field--name-field-image>img').attr('src');
                var paragraphSwiper_link = $.trim(innerElement.find('.field--type-link').text());
                var paragraphSwiperItemContent = '';
                if (paragraphSwiper_url !== undefined) {
                    paragraphSwiperItemContent = `
                    <div class="swiper-slide swiper-img" data-bs-toggle="modal" data-bs-target="#Module3Modal">
                        <img class="image img-fluid" loading="lazy" src="${paragraphSwiper_url}" alt="${paragraphSwiper_title}" />
                    </div>
                    `;
                }
                // 将内容添加到对应的 swiper-wrapper
                $(`.paragraphSwiper${index} .swiper-wrapper`).append(paragraphSwiperItemContent);
            });
            outerElement.find('.swiper-title').prepend(title);
            outerElement.find('>.paragraph__column').html('');
            //初始化 Module Swiper
            var paragraphSwiper = new Swiper(`.paragraphSwiper${index}`, {
                watchOverflow: true,
                slidesPerView: "auto",
                navigation: {
                    nextEl: `.paragraphSwiper${index}-button-next`,
                    prevEl: `.paragraphSwiper${index}-button-prev`,
                },
                pagination: {
                    el: `.paragraphSwiper${index}-pagination`,
                    dynamicBullets: true,
                    dynamicMainBullets: 3
                },
            });
            $('.paragraph--type--module-3 .swiper-slide').on('click', function () {
                var index = $(this).index(); // 獲取被點擊的元素索引
                $('#Module3Modal .swiper-wrapper').html('');
                var innerElement = $(this);
                innerElement.parent().find('.swiper-slide').each(function (index) {
                    var outerElement = $(this);
                    var img_html = outerElement.html();
                    $('#Module3Modal .swiper-wrapper').append('<div class="swiper-slide">' + img_html + '</div>');
                });
                // Modal Swiper
                var Module3Swiper = new Swiper(".Module3Swiper", {
                    // speed: 2000,
                    navigation: {
                        nextEl: '.Module3Swiper-button-next',
                        prevEl: '.Module3Swiper-button-prev',
                    },
                    pagination: {
                        el: ".Module3Swiper-pagination",
                        dynamicBullets: true,
                    },
                });
                Module3Swiper.slideTo(index);
            });
        });
        // paragraph Module 4
        var paragraphAccordionhtmlContent = '';
        $('.paragraph--type--module-4').each(function () {
            var outerElement = $(this);
            var columns = $.trim(outerElement.find('>.paragraph__column .field--name-field-columns-tags>a').text());
            outerElement.find('>.paragraph__column').addClass('row i2-collapse-flush accordion accordion-flush').attr('id', 'i2AccordionFlush');
            if (columns) {
                switch (columns) {
                    case '1':
                        outerElement.find('>.paragraph__column>.field--name-field-columns-tags').nextAll().addClass('col-md-12');
                        break;
                    case '2':
                        outerElement.find('>.paragraph__column>.field--name-field-columns-tags').nextAll().addClass('col-md-6');
                        break;
                    case '3':
                        outerElement.find('>.paragraph__column>.field--name-field-columns-tags').nextAll().addClass('col-md-6 col-lg-4');
                        break;
                    case '4':
                        outerElement.find('>.paragraph__column>.field--name-field-columns-tags').nextAll().addClass('col-md-6 col-xl-3');
                        break;
                    default:
                }
            };
            outerElement.find('>.paragraph__column>div:not(h2):not(.field--name-field-tags):not(.field--name-field-width):not(.field--name-field-class)').each(function (index) {
                var innerElement = $(this);
                var title = $.trim(innerElement.find('.field--name-field-title').text());
                var url = innerElement.find('.field--name-field-image>img').attr('src');
                var html = innerElement.find('.field--name-bp-text').html();
                paragraphAccordionhtmlContent = `
                <div class="accordion-header" id="i2-heading-${index}">
                    <div class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#i2-collapse-${index}"
                        aria-expanded="false" aria-controls="i2-collapse-${index}">                        
                        <img loading="lazy" src="${url}"  alt="" class="img-fluid">
                    </div>
                </div>
                <div class="accordion-data">
                    <div id="i2-collapse-${index}" class="accordion-collapse collapse" aria-labelledby="i2-heading-${index}"
                        data-bs-parent="#i2AccordionFlush">                        
                        <div class="accordion-body">
                            <div class="views-field-title">${title}</div>
                            ${html}
                        </div>
                    </div>
                </div>
                `;
                innerElement.find('.paragraph--type--i2-accordion>.paragraph__column').after(paragraphAccordionhtmlContent);
                innerElement.find('.paragraph--type--i2-accordion>.paragraph__column').html('');
            });
        });
        $(window).resize(function () {
            // 獲取 div 的新寬度
            if ($('.i2-collapse-flush').length > 0) {
                var newWidth = $('.i2-collapse-flush').width();
                var i2LeftOffset = $('.i2-collapse-flush').offset().left;
                $(".ipep-collapse .views-row").each(function () {
                    var _thisleftOffset = $(this).offset().left;
                    var gap = i2LeftOffset - _thisleftOffset - 20;
                    $(this).find('.accordion-data').css({
                        'width': newWidth,
                        'margin-left': gap,
                    });
                });
            }
        });
        $(".paragraph--type--i2-accordion").click(function () {
            var i2LeftOffset = $(this).parents('.i2-collapse-flush').offset().left;
            var newWidth = $(this).parents('.i2-collapse-flush').width();
            var _thisleftOffset = $(this).offset().left;
            var gap = i2LeftOffset - _thisleftOffset - 20;
            $(this).find('.accordion-data').css({
                'width': newWidth,
                'margin-left': gap,
            });
        });
        // paragraph Module 5
        $('.paragraph--type--module-5').each(function (i) {
            var outerElement = $(this);
            var h2_text = outerElement.find('.field--name-bp-header').text();
            outerElement.addClass('swiper paragraphGallerySwiper');

            outerElement.find('>.paragraph__column').addClass('swiper-wrapper');
            outerElement.find('>.paragraph__column').before(`
                <h2 class="field field--name-bp-header field--type-string field--label-hidden field__item side-title">${h2_text}</h2>
            `);
            outerElement.find('>.paragraph__column .field--name-bp-header').remove();

            // 使用唯一的類名為導航按鈕和分頁
            outerElement.append(`
                <div class="GallerySwiper-button">
                    <div class="swiper-button-next swiper-button-next-${i}"></div>
                    <div class="swiper-button-prev swiper-button-prev-${i}"></div>
                    <div class="swiper-pagination swiper-pagination-${i}"></div>
                </div>
            `);

            outerElement.find('>.paragraph__column>div:not(h2):not(.field--name-field-subheader):not(.field--name-field-tags):not(.field--name-field-width):not(.field--name-field-class):not(.field--name-field-columns-tags):not(.field--name-field-has-border):not(.field--name-bp-modal-button-text):not(.field--name-bp-link field--type-link)').each(function () {
                var innerElement = $(this);
                innerElement.addClass('swiper-slide');
            });

            // 使用唯一的變量名稱初始化 Swiper
            var swiperInstance = new Swiper(outerElement[0], {
                watchOverflow: true,
                touchMoveStopPropagation: false, // 不停止事件传播
                touchStartPreventDefault: true, // 阻止默认事件
                allowTouchMove: false, // 禁止触摸滑动
                navigation: {
                    nextEl: `.swiper-button-next-${i}`,
                    prevEl: `.swiper-button-prev-${i}`,
                },
                pagination: {
                    el: `.swiper-pagination-${i}`,
                    dynamicBullets: true,
                    dynamicMainBullets: 3
                },
            });
            var link = $.trim(outerElement.find('.field--name-bp-link').text());
            var link_text = $.trim(outerElement.find('.field--name-bp-modal-button-text').text());
            if (link) {
                $('.GallerySwiper-button').after('<div class="link"><div><a href="' + link + '" role="link" target="_blank" ;">' + link_text + '</a></div></div>');
            }
        });
        // paragraph Module 7
        var i2_table = `
        <div class="i2-table table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr></tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        `;

        $('.paragraph--type--module-7').each(function () {
            var outerElement = $(this);
            var title = $.trim(outerElement.find('.field--name-bp-header').text());
            outerElement.prepend('<h2 class="side-title">' + title + '</h2>');
            outerElement.find('>.paragraph__column').after(i2_table);
            outerElement.find('.paragraph--type--table-thead').parent().addClass('table-thead');
            outerElement.find('.paragraph--type--table-tbodys').parent().addClass('table-tbodys');

            // 获取当前表格的选择器
            var currentTable = outerElement.find('.i2-table table');

            outerElement.find('.table-thead').each(function () {
                var innerTheadElement = $(this);
                var Thead_title = $.trim(innerTheadElement.find('.field--name-field-thead').text());
                currentTable.find('thead>tr').append('<th scope="col">' + Thead_title + '</th>');
            });

            outerElement.find('.table-tbodys').each(function (index) {
                var innerTbodysElement = $(this);
                var innerTbodys_link = $.trim(innerTbodysElement.find('.field--name-bp-link').text());
                var innerTbodys_link_text = $.trim(innerTbodysElement.find('.field--name-field-link-text').text());

                // 为每个表格创建新的行
                currentTable.find('tbody').append('<tr></tr>');
                innerTbodysElement.find('.paragraph--type--table-tbodys>.paragraph__column>div:not(.field--name-field-link-text):not(.field--name-bp-link)').each(function () {
                    var innersubTbodysElement = $(this);
                    var subTbody_title = $.trim(innersubTbodysElement.find('.field--name-field-tbody').text());
                    currentTable.find('tbody>tr').eq(index).append('<td>' + subTbody_title + '</td>');
                });
                // 判断 innerTbodys_link 是否存在
                if (innerTbodys_link) {
                    currentTable.find('tbody>tr').eq(index).append('<td><a class="button_link" href="' + innerTbodys_link + '" target="_blank" role="link">' + innerTbodys_link_text + '</a></td>');
                } else {
                    currentTable.find('tbody>tr').eq(index).append('<td class="p-0"></td>');
                }
            });

            outerElement.find('>.paragraph__column').html('');
        });
        $('.paragraph--type--module-7 .i2-table>table>tbody tr').each(function () {
            var outerElement = $(this);
            outerElement.find('>td:not(:first)').each(function () {
                var innerTbodysElement = $(this);
                if (innerTbodysElement.text().trim() == '') {
                    innerTbodysElement.hide();
                }
            });
        });
        // paragraph Module 8
        var module_card = '';
        $('.paragraph--type--module-8').each(function () {
            var outerElement = $(this);
            var columns = $.trim(outerElement.find('>.paragraph__column .field--name-field-columns-tags>a').text());
            outerElement.find('>.paragraph__column').addClass('row');
            outerElement.find('>.paragraph__column>h2').addClass('w-100');
            outerElement.find('>.paragraph__column>.field--name-field-subheader').addClass('w-100');
            if (columns) {
                switch (columns) {
                    case '1':
                        outerElement.find('>.paragraph__column>.field--name-field-subheader').nextAll().addClass('col-md-12');
                        break;
                    case '2':
                        outerElement.find('>.paragraph__column>.field--name-field-subheader').nextAll().addClass('col-md-6');
                        break;
                    case '3':
                        outerElement.find('>.paragraph__column>.field--name-field-subheader').nextAll().addClass('col-md-6 col-lg-4');
                        break;
                    case '4':
                        outerElement.find('>.paragraph__column>.field--name-field-subheader').nextAll().addClass('col-md-6 col-lg-3');
                        break;
                    default:
                }
            };
            outerElement.find('>.paragraph__column>div:not(h2):not(.field--name-field-subheader):not(.field--name-field-tags):not(.field--name-field-width):not(.field--name-field-class):not(.field--name-field-columns-tags)').each(function (index) {
                var innerElement = $(this);
                var header = $.trim(innerElement.find('.field--name-bp-header').text());
                var img = innerElement.find('.field--name-field-image>img').attr('src');
                var text = innerElement.find('.field--name-bp-text').html();
                var textHtml = text ? `<div class="card-text">${text}</div>` : '<div class="card-text"></div>  ';
                var topic = innerElement.find('.field--name-field-topic-content').html();
                var topicHtml = topic ? `<div class="card-topic">${topic}</div>` : '<div class="card-topic"></div>';
                var link = $.trim(innerElement.find('.field--name-bp-link').text());
                if (link) {
                    module_card = `
                     <div class="card i2_card">
                        <div class="card-img-top"><img loading="lazy" src="${img}" alt="" class="img-fluid"></div>
                        <div class="card-body">
                            ${topicHtml}
                            <div class="card-title">${header}</div>
                            ${textHtml}                          
                        </div>
                        <a class="cover-link" target="_blank" href="${link}">link to content</a>
                    </div>
                    `;
                } else {
                    module_card = `
                    <div class="card i2_card">
                       <div class="card-img-top"><img loading="lazy" src="${img}" alt="" class="img-fluid"></div>
                       <div class="card-body">
                            ${topicHtml}
                            <div class="card-title">${header}</div>
                            ${textHtml}                         
                       </div>
                   </div>
                   `;
                }
                innerElement.find('.paragraph--type--module-card').html(module_card);
            });
        });
        // paragraph Module 9
        $('.paragraph--type--module-9').each(function () {
            var column_text = $.trim($(this).find('.block-field-blockparagraphmodule-9field-column .field--name-field-column').text());
            $(this).find('>.paragraph__column>.layout--twocol-section--50-50').removeClass("layout--twocol-section--50-50");
            switch (column_text) {
                case '32':
                    $(this).find('>.paragraph__column>.layout--twocol-section>.layout__region--first').addClass('column-25');
                    $(this).find('>.paragraph__column>.layout--twocol-section>.layout__region--second').addClass('column-75');
                    break;
                case '31':
                    $(this).find('>.paragraph__column>.layout--twocol-section>.layout__region--first').addClass('column-33');
                    $(this).find('>.paragraph__column>.layout--twocol-section>.layout__region--second').addClass('column-67');
                    break;
                case '33':
                    $(this).find('>.paragraph__column>.layout--twocol-section>.layout__region--first').addClass('column-50');
                    $(this).find('>.paragraph__column>.layout--twocol-section>.layout__region--second').addClass('column-50');
                    break;
                case '34':
                    $(this).find('>.paragraph__column>.layout--twocol-section>.layout__region--first').addClass('column-67');
                    $(this).find('>.paragraph__column>.layout--twocol-section>.layout__region--second').addClass('column-33');
                    break;
                case '35':
                    $(this).find('>.paragraph__column>.layout--twocol-section>.layout__region--first').addClass('column-75');
                    $(this).find('>.paragraph__column>.layout--twocol-section>.layout__region--second').addClass('column-25');
                    break;
            }
        });
        // i2 Accordion 
        $('.paragraph--type--i2-accordion-paragraphs').each(function (outerIndex) {
            var outerElement = $(this);
            var title = $.trim(outerElement.find('>.paragraph__column>.field--name-bp-header').text());
            outerElement.prepend('<h2 class="side-title">' + title + '</h2>');
            outerElement.find('>.paragraph__column>.field--name-bp-header').remove();
            outerElement.find('>.paragraph__column').attr({
                'class': 'accordion paragraph__column',
                'id': 'i2Accordion' + outerIndex // 确保 ID 唯一
            });
            outerElement.find('>.paragraph__column>div:not(h2):not(.field--name-field-subheader):not(.field--name-field-tags):not(.field--name-field-width):not(.field--name-field-class):not(.field--name-field-columns-tags)').each(function (innerIndex) {
                var innerElement = $(this);
                innerElement.addClass('accordion-item');
                var headerId = 'heading' + outerIndex + '-' + innerIndex; // 确保 header ID 唯一
                var collapseId = 'collapse' + outerIndex + '-' + innerIndex; // 确保 collapse ID 唯一
                innerElement.find('.field--name-bp-modal-title').addClass('accordion-header').attr({
                    'id': headerId,
                    'data-bs-toggle': 'collapse',
                    'data-bs-target': '#' + collapseId,
                    'aria-expanded': 'false',
                    'aria-controls': collapseId,
                });
                innerElement.find('.field--name-bp-modal-title').next().addClass('accordion-collapse collapse').attr({
                    'id': collapseId,
                    'aria-labelledby': headerId,
                    'data-bs-parent': '#' + 'i2Accordion' + outerIndex,
                });
                innerElement.find('.field--name-bp-modal-title').next().find('>.paragraph__column').addClass('accordion-body');
            });
        });
        // paragraph 將Link 變成button
        $('.paragraph--type--link').each(function () {
            var link_text = $.trim($(this).find('.field--name-field-link-text').text());
            $(this).find('.field--name-bp-link>.link-item>.link-url>a').text(link_text).attr('target', '_blank');
        });

        // 將title變成h2包裹
        $('.field--name-bp-header').each(function () {
            var $this = $(this);
            var newH2 = $('<h2>', {
                class: $this.attr('class'),
                html: $this.html()
            });
            $this.replaceWith(newH2);
        });
        $('.paragraph--type--card-list .field--name-bp-header').each(function () {
            var $this = $(this);
            var newH3 = $('<h3>', {
                class: $this.attr('class'),
                html: $this.html()
            });
            $this.replaceWith(newH3);
        });

        // paragraph Module add obs-items class
        $('.paragraph--type--module-1').each(function () {
            $(this).addClass('obs-items');
        });
        $('.paragraph--type--module-3').each(function () {
            $(this).addClass('obs-items');
        });
        $('.paragraph--type--module-4').each(function () {
            $(this).addClass('obs-items');
        });
        $('.paragraph--type--module-5').each(function () {
            $(this).addClass('obs-items');
        });
        $('.paragraph--type--module-8').each(function () {
            $(this).addClass('obs-items');
        });
        $('.page-node-type-programme .paragraph--type--section').each(function () {
            $(this).addClass('obs-items');
        });
        $('.page-node-40 .block-field-blockparagraphmodule-9bp-header').each(function () {
            $(this).addClass('obs-items');
        });
    });
});