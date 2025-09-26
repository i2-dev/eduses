jQuery(function ($) {
    $(document).ready(function () {
        /////////// common
        var lang = document.documentElement.getAttribute('lang');

        if ($('body').hasClass('page-node-2')) {
            if (lang === 'zh-hant') {
                window.location.href = '/zh-hant/about-us/about-no-limits';
            } else if (lang === 'zh-hans') {
                window.location.href = '/zh-hans/about-us/about-no-limits';
            } else {
                window.location.href = '/en/about-us/about-no-limits';
            }
        } else if ($('body').hasClass('page-node-75')) {
            if (lang === 'zh-hant') {
                window.location.href = '/zh-hant/programmes?field_performance_form_tags_target_id=40';
            } else if (lang === 'zh-hans') {
                window.location.href = '/zh-hans/programmes?field_performance_form_tags_target_id=40';
            } else {
                window.location.href = '/en/programmes?field_performance_form_tags_target_id=40';
            }
        } else {
            if ($('.dialog-off-canvas-main-canvas>header').hasClass('page-not-found')) {
                if (lang === 'zh-hant') {
                    window.location.href = '/zh-hant';
                } else if (lang === 'zh-hans') {
                    window.location.href = '/zh-hans';
                } else {
                    window.location.href = '/';
                }
            }
        }
        //获取url中的参数
        function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
        function formatDate(dateString) {
            const date = new Date(dateString);
            const options = { day: 'numeric', month: 'long' };
            return date.toLocaleDateString('en-GB', options);
        }
        function AccessibilityServices(icon) {
            if (lang === 'zh-hant') {
                switch (icon) {
                    case '3':
                        iconClass_text = '口述影像';
                        break;
                    case '4':
                        iconClass_text = '語音場刊';
                        break;
                    case '5':
                        iconClass_text = '歡迎導盲犬';
                        break;
                    case '7':
                        iconClass_text = '通達字幕（繁體中文）';
                        break;
                    case '25':
                        iconClass_text = '手語傳譯';
                        break;
                    case '26':
                        iconClass_text = '點字場刊';
                        break;
                    case '27':
                        iconClass_text = '劇場視形傳譯';
                        break;
                    case '28':
                        iconClass_text = '簡易圖文版刊物';
                        break;
                    case '29':
                        iconClass_text = '自在劇場';
                        break;
                    case '30':
                        iconClass_text = '額外輪椅位';
                        break;
                    case '53':
                        iconClass_text = '通達字幕';
                        break;
                    default:
                        return iconClass_text; // Return the value
                }
            } else if (lang === 'zh-hans') {
                switch (icon) {
                    case '3':
                        iconClass_text = '口述影像';
                        break;
                    case '4':
                        iconClass_text = '语音场刊';
                        break;
                    case '5':
                        iconClass_text = '欢迎导盲犬';
                        break;
                    case '7':
                        iconClass_text = '通达字幕（繁体中文）';
                        break;
                    case '25':
                        iconClass_text = '手语传译';
                        break;
                    case '26':
                        iconClass_text = '点字场刊';
                        break;
                    case '27':
                        iconClass_text = '剧场视形传译';
                        break;
                    case '28':
                        iconClass_text = '简易图文版刊物';
                        break;
                    case '29':
                        iconClass_text = '自在剧场';
                        break;
                    case '30':
                        iconClass_text = '额外轮椅位';
                        break;
                    case '53':
                        iconClass_text = '通达字幕';
                        break;
                    default:
                        return iconClass_text; // Return the value
                }
            } else {
                switch (icon) {
                    case '3':
                        iconClass_text = 'Audio Description';
                        break;
                    case '4':
                        iconClass_text = 'Audio Booklet';
                        break;
                    case '5':
                        iconClass_text = 'Guide Dog Friendly';
                        break;
                    case '7':
                        iconClass_text = 'Accessible Captions in English';
                        break;
                    case '25':
                        iconClass_text = 'Hong Kong Sign Language Interpretation';
                        break;
                    case '26':
                        iconClass_text = 'Braille Booklet';
                        break;
                    case '27':
                        iconClass_text = 'Theatrical Interpretation';
                        break;
                    case '28':
                        iconClass_text = 'Easy-to-Read Booklet';
                        break;
                    case '29':
                        iconClass_text = 'Relaxed Performance';
                        break;
                    case '30':
                        iconClass_text = 'Extra Wheelchair seats';
                        break;
                    case '53':
                        iconClass_text = '通達字幕';
                        break;
                    default:
                        return iconClass_text; // Return the value
                }
            }
        }
        // //paragrap 
        $('.paragraph--type--module-1').each(function () {
            var text = $.trim($(this).find('.layout--twocol-section .layout__region--second h2').text());
            if (text) {
                $(this).find('.layout--twocol-section .layout__region--first').prepend('<h2>' + text + '</h2>');
            }
        });
        // header fixed
        $(window).scroll(function () {
            if ($(window).scrollTop() > 0) {
                // 當滾動位置大於 0 時，添加類
                $('body').addClass('scrolled-fixed');
            } else {
                // 當滾動位置等於 0 時，移除類
                $('body').removeClass('scrolled-fixed');
            }
        });
        // page color
        $(function () {
            // 获取元素的值
            var colorValue = $('.page-node-type-page .block-field-blocknodepagefield-page-color .field--name-field-page-color').text();

            // 判断值是否存在
            if (colorValue) {
                // 将值分割为颜色和透明度
                var parts = colorValue.split(' ');
                var color = parts[0]; // 颜色值
                var opacity = parts[1] ? parts[1] : 1; // 透明度，默认为1
                // 添加样式到 <style> 标签
                $('<style>')
                    .prop('type', 'text/css')
                    .html('.page-node-type-page .block-field-blocknodepagefield-banner-paragraphs::before { background-color: ' + color + '; opacity: ' + opacity + '; }')
                    .appendTo('head');
            }
        });
        /////////// newsletter 選Language
        setTimeout(function () {
            if (lang === 'zh-hant') {
                $('#edit-language-').prop('checked', true);  // 選擇繁體
            } else if (lang === 'zh-hans') {
                $('#edit-language---2').prop('checked', true);  // 選擇简体
            } else {
                $('#edit-language-english').prop('checked', true);  // 選擇English
            }
        }, 2000);
        setTimeout(function () {
            if (lang === 'zh-hant') {
                $('#block-i2-theme-branding .site-logo').html('<img class="hc_black" src="/themes/custom/i2_theme/logo-tc.svg" alt="主頁" fetchpriority="high"> <img class="hc_white" src="/themes/custom/i2_theme/logo-white-tc.svg" alt="主頁" fetchpriority="high"> ');
            } else if (lang === 'zh-hans') {
                $('#block-i2-theme-branding .site-logo').html('<img class="hc_black" src="/themes/custom/i2_theme/logo-tc.svg" alt="主页" fetchpriority="high"> <img class="hc_white" src="/themes/custom/i2_theme/logo-white-tc.svg" alt="主页" fetchpriority="high"> ');
            } else {
                $('#block-i2-theme-branding .site-logo').html('<img class="hc_black" src="/themes/custom/i2_theme/logo.svg" alt="Home" fetchpriority="high"> <img class="hc_white" src="/themes/custom/i2_theme/logo-white.svg" alt="Home" fetchpriority="high"> ');
            }
        }, 500);
        setTimeout(function () {
            $('.webform-submission-subscribe-enews-form').addClass('visible-section');
            var text = $.trim($('.webform-submission-subscribe-enews-form .form-item-email>label').text());
            $('.webform-submission-subscribe-enews-form .form-item-email').append('<span class="floating-label">' + text + '</span>');
            $('.webform-submission-subscribe-enews-form .form-item-email input').css('background-color', 'transparent');
        }, 500);
        if ($('.page-node-type-programme .side-right.layout--twocol-section.layout--twocol-section--25-75:nth-child(4)').find('.field--name-field-in-venue-display-time').length === 0) {
            $('.page-node-type-programme .side-right.layout--twocol-section.layout--twocol-section--25-75:nth-child(4)').addClass('d-none');
        }
        ////////////////////////////////paragraph
        $(function () {
            //paragraph Banner
            // 起一個banner的swiper
            var BannerSwiperhtmlContent = `
                <div class="swiper BannerSwiper">
                    <div class="swiper-wrapper"></div>
                    <div class="swiper-button-next BannerSwiper-button-next"></div>
                    <div class="swiper-button-prev BannerSwiper-button-prev"></div>
                    <div class="swiper-button">
                        <div class="swiper-pagination BannerSwiper-pagination"></div>
                        <button class="stop"><img src="/themes/custom/i2_theme/image/icon/stop.svg" alt="stop slide"></button>
                        <button class="play d-none"><img src="/themes/custom/i2_theme/image/icon/play.svg" alt="play slide"></button>
                    </div>
                </div>
            `;
            $('.paragraph--type--banner').prepend(BannerSwiperhtmlContent);
            //將入的內容append入swiper裡面
            var BannerImageContent = '';
            var BannerVideoContent = '';
            $('.paragraph--type--banner>.paragraph__column>div:not(.layout):not(.field--name-field-tags):not(.field--name-field-class)').each(function () {
                var div_class = $(this).find('>div').attr('class');
                var hasImage = div_class.includes('paragraph--type--bp-image');
                var hasVideo = div_class.includes('paragraph--type--video');
                if (hasImage) {
                    var Image_url = $(this).find('.paragraph--type--bp-image .field--name-bp-image-field>img').attr('src');
                    var Image_href = $(this).find('.paragraph--type--bp-image>.paragraph__column>a').attr('href');
                    if (Image_href) {
                        BannerImageContent = `
                        <div class="swiper-slide swiper-img">
                            <a href="${Image_href}" target="_blank">
                               <img class="image img-fluid" loading="lazy" src="${Image_url}" alt="" />
                            </a>
                        </div>
                    `;
                    } else {
                        BannerImageContent = `
                        <div class="swiper-slide swiper-img">
                               <img class="image img-fluid" loading="lazy" src="${Image_url}" alt="" />
                        </div>
                    `;
                    }
                    $('.BannerSwiper .swiper-wrapper').append(BannerImageContent);
                };
                if (hasVideo) {
                    var Video_src = $.trim($(this).find('.field--name-field-video').text());
                    var video_title = $.trim($(this).find('.field--name-field-title').text());
                    var Video_html = '<video tabindex="-1"  autoplay="autoplay" playsinline="" preload="auto" muted="muted" loop="loop" oncontextmenu="return false;"><source src="/sites/default/files/video/' + Video_src + '" type="video/mp4" /></video>';
                    BannerVideoContent = `
                    <div class="swiper-slide swiper-video">
                        <div class="video-content">${Video_html}</div>
                        <div class="title visuallyhidden">${video_title}</div>
                    </div>
                `;
                    $('.BannerSwiper .swiper-wrapper').append(BannerVideoContent);
                }
            });
            $('.paragraph--type--banner .paragraph__column').html('');
            var frontpageBannerSwiper = new Swiper("body.path-frontpage .BannerSwiper", {
                autoplay: {
                    delay: 3000,
                },
                watchOverflow: true,
                navigation: {
                    nextEl: "body.path-frontpage .BannerSwiper-button-next",
                    prevEl: "body.path-frontpage .BannerSwiper-button-prev",
                },
                pagination: {
                    el: "body.path-frontpage .BannerSwiper-pagination",
                    clickable: true,
                },
            });
            //點擊停止Swiper
            $('body.path-frontpage .BannerSwiper .swiper-button .stop').click(function () {
                if (!$(this).hasClass('d-none')) {
                    $(this).addClass('d-none');
                    $('body.path-frontpage .BannerSwiper .swiper-button .play').removeClass('d-none');
                    frontpageBannerSwiper.autoplay.stop();
                }
            });
            $('body.path-frontpage .BannerSwiper .swiper-button .play').click(function () {
                if (!$(this).hasClass('d-none')) {
                    $(this).addClass('d-none');
                    $('body.path-frontpage .BannerSwiper .swiper-button .stop').removeClass('d-none');
                    frontpageBannerSwiper.autoplay.start();
                }
            });
            //單圖的時候去掉botton
            if ($('body.path-frontpage .BannerSwiper .BannerSwiper-pagination').hasClass('swiper-pagination-lock')) {
                $('.path-frontpage .BannerSwiper .swiper-button').remove();
            }
        });
        //////////////////////////////// buy now
        $(function () {
            var text = $.trim($('#block-i2-theme-buynow .field--name-body').text());
            $('#block-i2-theme-buynow .field--name-field-link>a').text(text).addClass('cover-link');
        });
        //////////////////////////////// homepage
        $(function () {
            var div_html = $('.path-frontpage #block-i2-theme-branding .navbar-brand>div').html();
            $('.path-frontpage #block-i2-theme-branding .navbar-brand>div').html('<h1>' + div_html + '</h1>');
            $('.path-frontpage #block-i2-theme-branding .navbar-brand h1 a').text('NoLimits 無限亮');

        });
        //HighLight
        var highlight_left_content = '';
        var highlight_right_content = '';
        $('div[class*="block-views-blockblock-highlight-homepage-list-block-"]').each(function (index) {
            var category_title = $.trim($(this).find('.views-field-field-category-title .field-content').text());
            var title = $.trim($(this).find('.HighLight-list .title').text());
            var img_src = $(this).find('.HighLight-list .img>img').attr('src');
            var link = $.trim($(this).find('.HighLight-list .link').text());

            if ($(this).find('.HighLight-list .link').hasClass('outsider-link')) {
                highlight_left_content = `
                    <a href="${link}" target="_blank" role="link">
                        ${title}
                    </a>
                    `;
                highlight_right_content = `
                    <a href="javascript:void(0);" role="button"><img src="${img_src}" class="img-fluid" alt="${title}" title="${title}"></a>
                    <a href="${link}" target="_blank" role="link">
                    ${title}
                    </a>
                    `;
            } else {
                highlight_left_content = `
                <a href="${link}" role="link">
                ${title}
                </a>
                `;
                highlight_right_content = `
                <a href="javascript:void(0);" role="button"><img src="${img_src}" class="img-fluid" alt="${title}" title="${title}"></a>
                <a href="${link}" role="link">
                    ${title}
                </a>
                `;
            }

            $('.section-HighLight .view-left-content>ul>li').eq(index).find('h3>a').text(category_title);
            $('.paragraph--type--bp-block .section-HighLight .view-left-content>ul>li').eq(index).append(highlight_left_content);
            $('.paragraph--type--bp-block .section-HighLight .view-right-content>ul>li').eq(index).append(highlight_right_content);
        });
        $('.section-HighLight .view-left-content>ul>li').each(function () {
            $(this).find('h3>a').attr('role', 'button');
        });

        // 记录当前激活的元素
        let activeIndex = -1;

        // 判断是否为触摸屏设备
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // 右侧列表的事件绑定
        if (isTouchDevice) {
            // 手机端点击事件
            $('.section-HighLight .view-right-content > ul > li').on('click', function () {
                activeIndex = $(this).index(); // 更新当前激活的索引
                $(this).addClass('active').siblings().removeClass('active');
                $('.section-HighLight .view-left-content > ul > li').eq(activeIndex).addClass('active').siblings().removeClass('active');
            });
        } else {
            // 电脑端 hover 事件
            $('.section-HighLight .view-right-content > ul > li').hover(
                function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    activeIndex = $(this).index(); // 更新当前激活的索引
                    $('.section-HighLight .view-left-content > ul > li').eq(activeIndex).addClass('active').siblings().removeClass('active');
                },
                function () {
                    $(this).removeClass('active');
                    if (activeIndex !== -1) {
                        $('.section-HighLight .view-right-content > ul > li').eq(activeIndex).addClass('active');
                        $('.section-HighLight .view-left-content > ul > li').eq(activeIndex).addClass('active');
                    }
                }
            );
        }

        // 左侧列表的事件绑定
        if (isTouchDevice) {
            // 手机端点击事件
            $('.section-HighLight .view-left-content > ul > li').on('click', function () {
                activeIndex = $(this).index(); // 更新当前激活的索引
                $(this).addClass('active').siblings().removeClass('active');
                $('.section-HighLight .view-right-content > ul > li').eq(activeIndex).addClass('active').siblings().removeClass('active');
            });
        } else {
            // 电脑端 hover 事件
            $('.section-HighLight .view-left-content > ul > li').hover(
                function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    activeIndex = $(this).index(); // 更新当前激活的索引
                    $('.section-HighLight .view-right-content > ul > li').eq(activeIndex).addClass('active').siblings().removeClass('active');
                },
                function () {
                    $(this).removeClass('active');
                    if (activeIndex !== -1) {
                        $('.section-HighLight .view-left-content > ul > li').eq(activeIndex).addClass('active');
                        $('.section-HighLight .view-right-content > ul > li').eq(activeIndex).addClass('active');
                    }
                }
            );
        }
        //////////////Latest News
        window.addEventListener('load', function () {
            var homepageNewsSwiper = new Swiper(".node__content .homepage-newsSwiper", {
                slidesPerView: "auto",
                spaceBetween: 30,
                watchOverflow: true,
                breakpoints: {
                    '1740': {
                        spaceBetween: 50,
                    },
                    '1200': {
                        spaceBetween: 40,
                    },
                },
                navigation: {
                    nextEl: ".node__content .newsSwiper-button-next",
                    prevEl: ".node__content .newsSwiper-button-prev",
                },
            });
            const swiper = new Swiper('.bTZisO .swiper', {
                touchMoveStopPropagation: false, // 不停止事件传播
                touchStartPreventDefault: true, // 阻止默认事件
                allowTouchMove: false, // 禁止触摸滑动
            });
        });

        //////////////////////////////// List Programme Content
        var Programme_kind = getUrlParam('kind');
        if (Programme_kind) {
            switch (Programme_kind) {
                case '54':
                    $('.page-node-type-programme').addClass('tags-Programme');
                    break;
                case '55':
                    $('.page-node-type-programme').addClass('tags-Outreach');
                    break;
                default:
            }
        }
        $(function () {
            // 有沒有screening-content
            if ($('.page-node-type-programme div.screening-content .layout__region--second').length > 0 &&
                $('.page-node-type-programme div.screening-content .layout__region--second').html().trim() !== '') {
                $('.page-node-type-programme div.screening-content').removeClass('d-none');
            } else {
                $('.page-node-type-programme div.screening-content').prev().css('padding-bottom', '90px');
            }

        });
        $('.page-node-type-programme #block-i2-theme-content .node__content').addClass('container-xxl');
        //Programme swiper
        var ListswiperContent = `
            <div class="swiper-button-next ListBannerSwiper-button-next"></div>
            <div class="swiper-button-prev ListBannerSwiper-button-prev"></div>
            <div class="swiper-pagination ListBannerSwiper-pagination"></div>
        `;
        $('.page-node-type-programme .paragraph--type--banner-list').addClass('swiper ListBannerSwiper');
        $('.page-node-type-programme .paragraph--type--banner-list>.paragraph__column').addClass('swiper-wrapper onload-items');
        $('.page-node-type-programme .paragraph--type--banner-list>.paragraph__column').after(ListswiperContent);
        $('.page-node-type-programme .paragraph--type--banner-list>.paragraph__column>div:not(.field--name-field-tags):not(.field--name-field-class)').each(function () {
            $(this).addClass('swiper-slide');
        });
        var ListBannerSwiper = new Swiper(".page-node-type-programme .ListBannerSwiper", {
            watchOverflow: true,
            // loop: true,
            navigation: {
                nextEl: "body:not(.page-node-type-page) .ListBannerSwiper-button-next",
                prevEl: "body:not(.page-node-type-page) .ListBannerSwiper-button-prev",
            },
            pagination: {
                el: ".ListBannerSwiper-pagination",
                clickable: true,
            },
        });
        //判斷header有沒有存在？
        $(function () {
            var title_text = $('.page-node-type-programme .block-field-blocknodeprogrammefield-nohas-performance-details .field--name-field-nohas-performance-details').text();
            var title = $.trim($('.page-node-type-programme  .block-field-blocknodeprogrammefield-performance-details-title .field--name-field-performance-details-title').text());
            if (title_text == 'On') {
                $('.page-node-type-programme .performance-details-title').remove();
            } else {
                if (title) {
                    $('.page-node-type-programme .performance-details-title').text(title);
                }
            }
            $('.page-node-type-programme .block-field-blocknodeprogrammefield-nohas-performance-details').hide();

        });
        // 判斷 In-venue Screening 有沒有存在
        if ($('.page-node-type-page').find('div.block-field-blocknodepagefield-basic-banner').length > 0) {
            $('.page-node-type-page .node__content > .layout--twocol-section--50-50:nth-child(2)').addClass('no-border');
        }
        // 判斷 In-venue Programme
        if (!$('.page-node-type-programme').find('.block-field-blocknodeprogrammefield-in-venue-screening-displa').length > 0) {
            $('.In-venue-screening').parents('.sidebarSection-1').addClass('d-none');
        }
        // 判斷 In-venue Programme
        if (!$('.page-node-type-programme').find('.block-field-blocknodeprogrammefield-in-venue-display-time').length > 0) {
            $('.In-venue-programme').addClass('d-none');
        }
        // icon變成image
        $(function () {
            if ($('.page-node-type-programme').find('.field--name-field-in-venue-display-time').length > 0) {
                $('.page-node-type-programme .field--name-field-in-venue-display-time').before('<img src="/themes/custom/i2_theme/image/icon/icon-date-orange.svg" alt=""  loading="lazy">');
            };
            if ($('.page-node-type-programme').find('.field--name-field-venue').length > 0) {
                $('.page-node-type-programme .field--name-field-venue').before('<img src="/themes/custom/i2_theme/image/icon/icon-location-orange-24px.svg" alt=""  loading="lazy">');
            };
            if ($('.page-node-type-programme').find('.field--name-field-in-venue-screening-displa').length > 0) {
                $('.page-node-type-programme .field--name-field-in-venue-screening-displa').before('<img src="/themes/custom/i2_theme/image/icon/icon-date-orange.svg" alt=""  loading="lazy">');
            };
            if ($('.page-node-type-programme').find('.field--name-field-in-venue-screening-venue').length > 0) {
                $('.page-node-type-programme .field--name-field-in-venue-screening-venue').before('<img src="/themes/custom/i2_theme/image/icon/icon-location-orange-24px.svg" alt=""  loading="lazy">');
            };
            if ($('.page-node-type-programme').find('.block-field-blocknodeprogrammefield-online-screening-display .field--name-field-online-screening-display').length > 0) {
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-display .field--name-field-online-screening-display').before('<img src="/themes/custom/i2_theme/image/icon/icon-date-orange.svg" alt=""  loading="lazy">');
            };
        });
        $(function () {
            if (lang === 'zh-hant') {
                $('.page-node-type-programme .field--name-field-in-venue-display-time').before('<div class="label">日期</div>');
                $('.page-node-type-programme .field--name-field-venue').before('<div class="label">場地</div>');
                $('.page-node-type-programme .field--name-field-in-venue-screening-displa').before('<div class="label">日期</div>');
                $('.page-node-type-programme .field--name-field-in-venue-screening-venue').before('<div class="label">場地</div>');
                $('.page-node-type-programme .field--name-field-online-screening-display').before('<div class="label">日期</div>');
            } else if (lang === 'zh-hans') {
                $('.page-node-type-programme .field--name-field-in-venue-display-time').before('<div class="label">日期</div>');
                $('.page-node-type-programme .field--name-field-venue').before('<div class="label">场地</div>');
                $('.page-node-type-programme .field--name-field-in-venue-screening-displae').before('<div class="label">日期</div>');
                $('.page-node-type-programme .field--name-field-in-venue-screening-venue').before('<div class="label">场地</div>');
                $('.page-node-type-programme .field--name-field-online-screening-display').before('<div class="label">日期</div>');
            } else {
                $('.page-node-type-programme .field--name-field-in-venue-display-time').before('<div class="label">Date</div>');
                $('.page-node-type-programme .field--name-field-venue').before('<div class="label">Venue</div>');
                $('.page-node-type-programme .field--name-field-in-venue-screening-displa').before('<div class="label">Date</div>');
                $('.page-node-type-programme .field--name-field-in-venue-screening-venue').before('<div class="label">Venue</div>');
                $('.page-node-type-programme .field--name-field-online-screening-display').before('<div class="label">Date</div>');
            }
        });
        $(function () {
            // 將online-screening-link變成button
            var programme_onlineLink = $.trim($('.page-node-type-programme .field--name-field-online-screening-detail-l').text());
            if (programme_onlineLink) {
                // 选择目标 div
                var divElement = $('.field.field--name-field-online-screening-link-tex');
                // 获取 div 中的文本
                var text = divElement.text();
                // 创建一个新的 a 元素
                var aElement = $('<a></a>')
                    .attr({
                        'href': programme_onlineLink,
                        'role': 'link',
                        'target': '_blank'
                    })
                    .text(text)
                    .addClass('online-LinkButton') // 添加按钮样式类

                // 用 a 元素替换 div
                divElement.replaceWith(aElement);
            }
            // Back to list swiper
            var programme_a_link = $('.page-node-type-programme .block-system-breadcrumb-block ol.breadcrumb>li:nth-child(2)>a').attr('href');
            var programme_a_title = $.trim($('.page-node-type-programme .block-system-breadcrumb-block ol.breadcrumb>li:nth-child(2)>a').text());
            $('.page-node-type-programme .back-to-list').attr('href', programme_a_link);
            $('.page-node-type-programme .back-to-list span').text(programme_a_title);
            // Performance A link
            if (lang === 'zh-hant') {
                $('.page-node-type-programme .field--name-field-venue-location-link>a').text('場地位置');
                $('.page-node-type-programme .field--name-field-in-venue-screening-venu>a').text('場地位置');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-ticket .label').text('門票');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-ticket .label').text('門票');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-ticket .label').text('門票');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-no-limits-plus .label').text('無限亮加料節目');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-note .label').text('備註');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-tags .label').text('藝術通達服務');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-access .label').text('藝術通達服務');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-accessib .label').text('藝術通達服務');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-note .label').text('備註');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-note .label').text('備註');
                $('.block-addtoany>span>div:first-child').text('分享於');
                $('.paragraph--type--plus-events').each(function () {
                    $(this).find('.field--name-field-location-link>a').text('場地位置');
                });
            } else if (lang === 'zh-hans') {
                $('.page-node-type-programme .field--name-field-venue-location-link>a').text('场地位置');
                $('.page-node-type-programme .field--name-field-in-venue-screening-venu>a').text('场地位置');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-ticket .label').text('门票');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-ticket .label').text('门票');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-ticket .label').text('门票');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-no-limits-plus .label').text('无限亮加料节目');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-note .label').text('备注');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-tags .label').text('艺术通达服务');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-access .label').text('艺术通达服务');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-accessib .label').text('艺术通达服务');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-note .label').text('备注');
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-note .label').text('备注');
                $('.block-addtoany>span>div:first-child').text('分享于');
                $('.paragraph--type--plus-events').each(function () {
                    $(this).find('.field--name-field-location-link>a').text('场地位置');
                });
            } else {
                $('.page-node-type-programme .field--name-field-venue-location-link>a').text('Venue Location');
                $('.page-node-type-programme .field--name-field-in-venue-screening-venu>a').text('Venue Location');
                $('.paragraph--type--plus-events').each(function () {
                    $(this).find('.field--name-field-location-link>a').text('Venue Location');
                });
            }
            var in_venue_urbtix = $.trim($('.page-node-type-programme .field--name-field-in-venue-urbtix-label').text());
            var in_venue_Art_mate = $.trim($('.page-node-type-programme .field--name-field-in-venue-art-mate-label').text());
            var in_venue_screening_urbtix = $.trim($('.page-node-type-programme .field--name-field-in-venue-screening-label').text());
            var in_venue_screening_Art_mate = $.trim($('.page-node-type-programme .field--name-field-screening-art-mate-label').text());
            if (in_venue_urbtix) {
                $('.page-node-type-programme .field--name-field-urbtix>a').text(in_venue_urbtix);
            }
            if (in_venue_Art_mate) {
                $('.page-node-type-programme .field--name-field-art-mate>a').text(in_venue_Art_mate);
            }
            if (in_venue_screening_urbtix) {
                $('.page-node-type-programme .field--name-field-in-venue-screening-urbtix>a').text(in_venue_screening_urbtix);
            }
            if (in_venue_screening_Art_mate) {
                $('.page-node-type-programme .field--name-field-in-venue-screening-art-ma>a').text(in_venue_screening_Art_mate);
            }
            // $('.page-node-type-programme .field--name-field-art-mate>a').text('Art-mate');
            // if ($('.page-node-type-programme').find('div.field--name-field-urbtix').length > 0 ||
            //     $('.page-node-type-programme').find('div.field--name-field-art-mate').length > 0) {
            //     $('div.BuyNowTitle').removeClass('d-none');
            // }
            // $('.page-node-type-programme .field--name-field-in-venue-screening-urbtix>a').text('Urbtix');
            // $('.page-node-type-programme .field--name-field-in-venue-screening-art-ma>a').text('Art-mate');
            // if (!$('.page-node-type-programme').find('div.field--name-field-in-venue-screening-urbtix').length > 0 ||
            //     !$('.page-node-type-programme').find('div.field--name-field-in-venue-screening-art-ma').length > 0) {
            //     $('div.field--name-field-in-venue-screening-displa').parents('.sidebarSection-1').find('div.BuyNowTitle').addClass('d-none');
            // }
            // Arts Accessibility Services
            // Function to create and populate a services list
            function populateServicesList(selector, ulElement) {
                $(selector).each(function () {
                    var iconClass = 'icon-' + $(this).text().trim();
                    AccessibilityServices($(this).text().trim());
                    ulElement.append('<li class="' + iconClass + '" title="' + iconClass_text + '">' + iconClass_text + '</li>');
                });
            }
            // Create unordered lists
            var $ul_1 = $('<ul class="services-ul obs-items"></ul>');
            var $ul_2 = $('<ul class="services-ul obs-items"></ul>');
            var $ul_3 = $('<ul class="services-ul obs-items"></ul>');

            // Populate In-venue Programme
            populateServicesList('.block-field-blocknodeprogrammefield-tags .field--name-field-tags>div.field__item', $ul_1);
            $('.block-field-blocknodeprogrammefield-tags .field--name-field-tags').html($ul_1);

            // Populate Online Screening
            populateServicesList('.block-field-blocknodeprogrammefield-online-screening-accessib .field--name-field-online-screening-accessib>div.field__item', $ul_2);
            $('.block-field-blocknodeprogrammefield-online-screening-accessib .field--name-field-online-screening-accessib').html($ul_2);

            // Populate In-venue Screening
            populateServicesList('.field--name-field-in-venue-screening-access>div.field__item', $ul_3);
            $('.field--name-field-in-venue-screening-access').html($ul_3);

            // Nohas Social Media
            $(function () {
                var social_text = $('.page-node-type-programme .block-field-blocknodeprogrammefield-nohas-social-media .field--name-field-nohas-social-media').text();
                if (social_text == '1') {
                    $('.page-node-type-programme .block-addtoany').hide();
                    $('.page-node-type-programme .block-addtoany').parents('.sidebarSection-1').hide();
                }
                $('.page-node-type-programme .block-field-blocknodeprogrammefield-nohas-social-media').hide();
            });
            // Details Sidebar Section
            $('.details-sidebar-section>.content>a').attr('role', 'button');
            $('.sidebar-back-to-top').click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 200);
                return false;
            });
            $('.side-title:not(.d-none)').each(function (index) {
                if ($(this).text().length > 0) {
                    $(this).attr('data-sorting', index);
                    var li_title = $.trim($(this).text());
                    $('.details-sidebar-section>.content>ul').append('<li data-sorting="' + index + '"><a href="javascript:void(0);" role="button">' + li_title + '</a></li>');
                    // 修改這裡，檢查 index 是否不等於 0
                    if (index !== 0) {
                        $(this).parents('.paragraph').addClass('section-side-content').attr('data-sorting', index);
                    }
                }
            });
            var section = $('.details-sidebar-section');
            var footer = $('footer');
            if (section.length > 0 && footer.length > 0) {
                var offset = section.offset().top;
                var footerOffset = footer.offset().top;
                var footerHeight = $('footer').outerHeight();
                $(window).on('scroll', function () {
                    var scrollTop = $(this).scrollTop();
                    var sectionHeight = section.outerHeight();
                    // 检查滚动位置，确保 section 不会穿过 footer
                    if (scrollTop >= (offset - 200) && (scrollTop + sectionHeight + 200 < footerOffset) && (scrollTop + footerHeight - 200) <= footerOffset) {
                        section.addClass('active'); // 添加 class
                    } else {
                        section.removeClass('active'); // 移除 class
                    }
                    // console.log('scrollTop:', scrollTop, 'sectionHeight:', sectionHeight, 'offset:', offset, 'footerOffset:', footerOffset);
                });
            }
            $('.details-sidebar-section ul li').on('click', function () {
                // 获取 data-sorting 属性
                var sortingIndex = $(this).data('sorting');
                // 找到对应的 .side-title
                var targetTitle = $('.side-title').eq(sortingIndex);
                // 如果找到对应的标题，滚动到该位置
                if (targetTitle.length) {
                    $('html, body').animate({
                        scrollTop: targetTitle.offset().top - 160
                    }, 500);
                }
            });
            var isSection = $('.sidebarSection-1');
            if (isSection) {
                var listItem = $('.details-sidebar-section > .content > ul > li:first-child'); // 獲取第一個 li 元素
                $(window).on('scroll', function () {
                    var scrollTop = $(this).scrollTop(); // 獲取當前滾動距離
                    var isInSection = false; // 用於標記是否在任何 section 中
                    $('.sidebarSection-1').each(function () {
                        var section = $(this);
                        var offset = section.offset().top; // 獲取 section 的 offset
                        // 檢查當前滾動位置是否在該 section 的範圍內
                        if (scrollTop >= (offset - 200) && scrollTop < offset + section.outerHeight()) {
                            isInSection = true; // 設置標記為 true
                        }
                    });
                    // 根據標記添加或移除 active 類別
                    if (isInSection) {
                        listItem.addClass('active'); // 為第一個 li 添加 active 類別
                    } else {
                        listItem.removeClass('active'); // 移除 active 類別
                    }
                });
            };

            $(window).on('scroll', function () {
                var scrollTop = $(this).scrollTop(); // 獲取當前滾動距離
                var foundActive = false; // 標記是否找到活動的 section

                // 遍歷每個 section-side-content
                $('.section-side-content').each(function () {
                    var sectionOffset = $(this).offset().top; // 獲取當前 section 的 offset
                    var sectionHeight = $(this).outerHeight(); // 獲取當前 section 的高度
                    var sortingIndex = $(this).data('sorting'); // 獲取當前 section 的 data-sorting

                    // 檢查當前滾動位置是否在該 section 的範圍內
                    if (scrollTop >= (sectionOffset - 180) && scrollTop < (sectionOffset + sectionHeight - 180)) {
                        // 為對應的 li 添加 active 類別
                        $('.details-sidebar-section .content ul li').removeClass('active'); // 移除其他的 active 類別
                        $('.details-sidebar-section .content ul li[data-sorting="' + sortingIndex + '"]').addClass('active'); // 添加 active 類別
                        foundActive = true; // 找到活動的 section
                    }
                });

                // 如果不在任何 section 中，移除所有 li 的 active 類別
                if (!foundActive) {
                    $('.details-sidebar-section .content ul li:not(:first-child)').removeClass('active');
                }
            });
        });
        ///////// Programme List
        $(function () {
            if (lang === 'zh-hant') {
                // 定义过滤器
                var Programme_Filter = `
                    <section class="ProgrammeFilter">
                        <div class="content">
                            <div class="ProgrammeForm">
                                <div class="ProgrammeForm-header dropdown-toggle" aria-label="已展開" data-bs-toggle="dropdown" aria-expanded="false">
                                        <p>藝術範疇</p>
                                        <div class="filterSelected">全部</div>
                                    </div>
                                    <div class="dropdown-menu">
                                        <ul></ul>
                                    </div>
                            </div>
                            <div class="ProgrammeCategory">
                                <div class="ProgrammeCategory-header dropdown-toggle" aria-label="已展開" data-bs-toggle="dropdown" aria-expanded="false">
                                        <p>現場節目 / 線上節目</p>
                                        <div class="filterSelected">全部</div>
                                    </div>
                                    <div class="dropdown-menu">
                                        <ul></ul>
                                    </div>
                            </div>
                            <div class="ProgrammeDate">
                                <div class="ProgrammeDate-header dropdown-toggle" aria-label="已展開" data-bs-toggle="dropdown" aria-expanded="false">
                                        <p>日期</p>
                                        <div class="filterSelected">全部</div>
                                    </div>
                                    <div class="dropdown-menu">
                                        <ul></ul>
                                    </div>
                            </div>
                        </div>
                    </section>
                    <button class="edit-reset" type="button"><img loading="lazy" src="/themes/custom/i2_theme/image/icon/btn-reset-white.svg" class="img-fluid" alt="">重設</button>
                `;
            } else if (lang === 'zh-hans') {
                // 定义过滤器
                var Programme_Filter = `
                    <section class="ProgrammeFilter">
                        <div class="content">
                            <div class="ProgrammeForm">
                                <div class="ProgrammeForm-header dropdown-toggle" aria-label="已展开" data-bs-toggle="dropdown" aria-expanded="false">
                                        <p>艺术范畴</p>
                                        <div class="filterSelected">全部</div>
                                    </div>
                                    <div class="dropdown-menu">
                                        <ul></ul>
                                    </div>
                            </div>
                            <div class="ProgrammeCategory">
                                <div class="ProgrammeCategory-header dropdown-toggle" aria-label="已展开" data-bs-toggle="dropdown" aria-expanded="false">
                                        <p>现场节目 / 线上节目</p>
                                        <div class="filterSelected">全部</div>
                                    </div>
                                    <div class="dropdown-menu">
                                        <ul></ul>
                                    </div>
                            </div>
                            <div class="ProgrammeDate">
                                <div class="ProgrammeDate-header dropdown-toggle" aria-label="已展开" data-bs-toggle="dropdown" aria-expanded="false">
                                        <p>日期</p>
                                        <div class="filterSelected">全部</div>
                                    </div>
                                    <div class="dropdown-menu">
                                        <ul></ul>
                                    </div>
                            </div>
                        </div>
                    </section>
                    <button class="edit-reset" type="button"><img loading="lazy" src="/themes/custom/i2_theme/image/icon/btn-reset-white.svg" class="img-fluid" alt="">重设</button>
                `;
            } else {
                // 定义过滤器
                var Programme_Filter = `
                    <section class="ProgrammeFilter">
                        <div class="content">
                            <div class="ProgrammeForm">
                                <div class="ProgrammeForm-header dropdown-toggle" aria-label="Expanded" data-bs-toggle="dropdown" aria-expanded="false">
                                        <p>Art Form</p>
                                        <div class="filterSelected">All</div>
                                    </div>
                                    <div class="dropdown-menu">
                                        <ul></ul>
                                    </div>
                            </div>
                            <div class="ProgrammeCategory">
                                <div class="ProgrammeCategory-header dropdown-toggle" aria-label="Expanded" data-bs-toggle="dropdown" aria-expanded="false">
                                        <p>In-venue / Online</p>
                                        <div class="filterSelected">All</div>
                                    </div>
                                    <div class="dropdown-menu">
                                        <ul></ul>
                                    </div>
                            </div>
                            <div class="ProgrammeDate">
                                <div class="ProgrammeDate-header dropdown-toggle" aria-label="Expanded" data-bs-toggle="dropdown" aria-expanded="false">
                                        <p>Date</p>
                                        <div class="filterSelected">All</div>
                                    </div>
                                    <div class="dropdown-menu">
                                        <ul></ul>
                                    </div>
                            </div>
                        </div>
                    </section>
                    <button class="edit-reset" type="button"><img loading="lazy" src="/themes/custom/i2_theme/image/icon/btn-reset-white.svg" class="img-fluid" alt="">Reset</button>
                `;
            }
            // 先檢查並設置默認值（如果不存在）
            if (sessionStorage.getItem('ProgrammeForm') === null) {
                sessionStorage.setItem('ProgrammeForm', 'All');
            }
            if (sessionStorage.getItem('ProgrammeCategory') === null) {
                sessionStorage.setItem('ProgrammeCategory', 'All');
            }
            if (sessionStorage.getItem('ProgrammeDate') === null) {
                sessionStorage.setItem('ProgrammeDate', 'All');
            }
            // 初始化过滤器
            function initializeFilter() {
                if (!$('.ProgrammeFilter').length) {
                    $('.page-node-4 form#views-exposed-form-block-programme-list-block-1 .form--inline').prepend(Programme_Filter);
                    populateDropdowns();
                    bindDropdownEvents();
                }
                $(".block-views-blockblock-programme-list-block-1 .edit-reset").click(function () {
                    $('.form-item-field-programme-tags-id select').val('All');
                    $('.form-item-field-performance-form-tags-target-id select').val('All');
                    $('.form-item-field-date-state-target-id select').val('All');
                    sessionStorage.setItem('ProgrammeForm', 'All');
                    sessionStorage.setItem('ProgrammeCategory', 'All');
                    sessionStorage.setItem('ProgrammeDate', 'All');
                    $('.view-block-programme-list .view-filters .form--inline .form-actions input').trigger('click');
                });
            }
            // 填充下拉菜单
            function populateDropdowns() {
                // Art Form
                $('.form-item-field-programme-tags-id select>option').each(function (index) {
                    if (index !== 0) {
                        var title = $.trim($(this).text());
                        $('.ProgrammeForm .dropdown-menu>ul').append('<li>' + title + '</li>');
                    }
                });
                if (lang === 'zh-hant') {
                    $('.ProgrammeForm .dropdown-menu>ul').prepend('<li class="active">全部</li>');
                } else if (lang === 'zh-hans') {
                    $('.ProgrammeForm .dropdown-menu>ul').prepend('<li class="active">全部</li>');
                } else {
                    $('.ProgrammeForm .dropdown-menu>ul').prepend('<li class="active">All</li>');
                };
                // In-venue / Online
                $('.form-item-field-performance-form-tags-target-id select>option').each(function (index) {
                    if (index !== 0) {
                        var title = $.trim($(this).text());
                        $('.ProgrammeCategory .dropdown-menu>ul').append('<li>' + title + '</li>');
                    }
                });
                if (lang === 'zh-hant') {
                    $('.ProgrammeCategory .dropdown-menu>ul').prepend('<li class="active">全部</li>');
                } else if (lang === 'zh-hans') {
                    $('.ProgrammeCategory .dropdown-menu>ul').prepend('<li class="active">全部</li>');
                } else {
                    $('.ProgrammeCategory .dropdown-menu>ul').prepend('<li class="active">All</li>');
                };
                // Date
                $('.form-item-field-date-state-target-id select>option').each(function (index) {
                    if (index !== 0) {
                        var title = $.trim($(this).text());
                        $('.ProgrammeDate .dropdown-menu>ul').append('<li>' + title + '</li>');
                    }
                });
                if (lang === 'zh-hant') {
                    $('.ProgrammeDate .dropdown-menu>ul').prepend('<li class="active">全部</li>');
                } else if (lang === 'zh-hans') {
                    $('.ProgrammeDate .dropdown-menu>ul').prepend('<li class="active">全部</li>');
                } else {
                    $('.ProgrammeDate .dropdown-menu>ul').prepend('<li class="active">All</li>');
                };
            };
            // 绑定下拉菜单事件
            function bindDropdownEvents() {
                // Art Form
                $(".ProgrammeForm .ProgrammeForm-header").click(function () {
                    // $(".ProgrammeForm .dropdown-menu").slideToggle("500");
                    var $header = $(this);
                    // 根據當前語言設置 aria-label
                    if ($header.attr("aria-label") === "已展开" || $header.attr("aria-label") === "已展開" || $header.attr("aria-label") === "Expanded") {
                        // 收起狀態
                        if (lang === 'zh-hant') {
                            $header.attr("aria-label", "已收起"); // 繁體中文
                        } else if (lang === 'zh-hans') {
                            $header.attr("aria-label", "已收起"); // 簡體中文
                        } else {
                            $header.attr("aria-label", "Collapsed"); // 英文
                        }
                    } else {
                        // 展開狀態
                        if (lang === 'zh-hant') {
                            $header.attr("aria-label", "已展開"); // 繁體中文
                        } else if (lang === 'zh-hans') {
                            $header.attr("aria-label", "已展开"); // 簡體中文
                        } else {
                            $header.attr("aria-label", "Expanded"); // 英文
                        }
                    }

                });
                $(document).click(function (event) {
                    if (!$(event.target).closest('.ProgrammeForm').length) {
                        $(".ProgrammeForm .dropdown-menu").slideUp("500");
                        // 根據當前語言設置 aria-label
                        $(".ProgrammeForm .ProgrammeForm-header").attr("aria-label", lang === 'zh-hant' ? "已展開" : (lang === 'zh-hans' ? "已展开" : "Expanded"));
                    }
                });

                // In-venue / Online
                $(".ProgrammeCategory .ProgrammeCategory-header").click(function () {
                    // $(".ProgrammeCategory .dropdown-menu").slideToggle("500");
                    var $header = $(this);
                    // 根據當前語言設置 aria-label
                    if ($header.attr("aria-label") === "已展开" || $header.attr("aria-label") === "已展開" || $header.attr("aria-label") === "Expanded") {
                        // 收起狀態
                        if (lang === 'zh-hant') {
                            $header.attr("aria-label", "已收起"); // 繁體中文
                        } else if (lang === 'zh-hans') {
                            $header.attr("aria-label", "已收起"); // 簡體中文
                        } else {
                            $header.attr("aria-label", "Collapsed"); // 英文
                        }
                    } else {
                        // 展開狀態
                        if (lang === 'zh-hant') {
                            $header.attr("aria-label", "已展開"); // 繁體中文
                        } else if (lang === 'zh-hans') {
                            $header.attr("aria-label", "已展开"); // 簡體中文
                        } else {
                            $header.attr("aria-label", "Expanded"); // 英文
                        }
                    }
                });

                $(document).click(function (event) {
                    if (!$(event.target).closest('.ProgrammeCategory').length) {
                        $(".ProgrammeCategory .dropdown-menu").slideUp("500");
                        // 根據當前語言設置 aria-label
                        $(".ProgrammeCategory .ProgrammeCategory-header").attr("aria-label", lang === 'zh-hant' ? "已展開" : (lang === 'zh-hans' ? "已展开" : "Expanded"));
                    }
                });
                // Date
                $(".ProgrammeDate .ProgrammeDate-header").click(function () {
                    // $(".ProgrammeDate .dropdown-menu").slideToggle("500");
                    var $header = $(this);
                    // 根據當前語言設置 aria-label
                    if ($header.attr("aria-label") === "已展开" || $header.attr("aria-label") === "已展開" || $header.attr("aria-label") === "Expanded") {
                        // 收起狀態
                        if (lang === 'zh-hant') {
                            $header.attr("aria-label", "已收起"); // 繁體中文
                        } else if (lang === 'zh-hans') {
                            $header.attr("aria-label", "已收起"); // 簡體中文
                        } else {
                            $header.attr("aria-label", "Collapsed"); // 英文
                        }
                    } else {
                        // 展開狀態
                        if (lang === 'zh-hant') {
                            $header.attr("aria-label", "已展開"); // 繁體中文
                        } else if (lang === 'zh-hans') {
                            $header.attr("aria-label", "已展开"); // 簡體中文
                        } else {
                            $header.attr("aria-label", "Expanded"); // 英文
                        }
                    }
                });

                $(document).click(function (event) {
                    if (!$(event.target).closest('.ProgrammeDate').length) {
                        // $(".ProgrammeDate .dropdown-menu").slideUp("500");
                        // 根據當前語言設置 aria-label
                        $(".ProgrammeDate .ProgrammeDate-header").attr("aria-label", lang === 'zh-hant' ? "已展開" : (lang === 'zh-hans' ? "已展开" : "Expanded"));
                    }
                });
                // Art Form
                $('.ProgrammeForm .dropdown-menu>ul li').on('click', function () {
                    var li_title = $.trim($(this).text());
                    $('.ProgrammeForm .filterSelected').text(li_title);
                    $(this).addClass('active').siblings().removeClass('active');
                    var index = $(".ProgrammeForm .dropdown-menu>ul li").index(this);
                    $('.form-item-field-programme-tags-id select>option').eq(index).prop("selected", true);
                    // $(".ProgrammeForm .dropdown-menu").slideUp("500");
                    sessionStorage.setItem('ProgrammeForm', index);
                    $('.view-block-programme-list .view-filters .form--inline .form-actions input').trigger('click');
                });
                // In-venue / Online
                $('.ProgrammeCategory .dropdown-menu>ul li').on('click', function () {
                    var li_title = $.trim($(this).text());
                    $('.ProgrammeCategory .filterSelected').text(li_title);
                    $(this).addClass('active').siblings().removeClass('active');
                    var index = $(".ProgrammeCategory .dropdown-menu>ul li").index(this);
                    $('.form-item-field-performance-form-tags-target-id select>option').eq(index).prop("selected", true);
                    // $(".ProgrammeCategory .dropdown-menu").slideUp("500");
                    sessionStorage.setItem('ProgrammeCategory', index);
                    $('.view-block-programme-list .view-filters .form--inline .form-actions input').trigger('click');
                });
                // Date
                $('.ProgrammeDate .dropdown-menu>ul li').on('click', function () {
                    var li_title = $.trim($(this).text());
                    $('.ProgrammeDate .filterSelected').text(li_title);
                    $(this).addClass('active').siblings().removeClass('active');
                    var index = $(".ProgrammeDate .dropdown-menu>ul li").index(this);
                    $('.form-item-field-date-state-target-id select>option').eq(index).prop("selected", true);
                    // $(".ProgrammeDate .dropdown-menu").slideUp("500");
                    sessionStorage.setItem('ProgrammeDate', index);
                    $('.view-block-programme-list .view-filters .form--inline .form-actions input').trigger('click');
                });
            }
            // 初始加载
            initializeFilter();
            // 每次 AJAX 完成时检查
            $(document).ajaxComplete(function () {
                initializeFilter();
                // Art Form
                $('.form-item-field-programme-tags-id select>option').each(function (index) {
                    if (index !== 0) {
                        // 检查当前选项是否被选中
                        if ($(this).is(':selected')) {
                            var selected_title = $.trim($(this).text());
                            $('.ProgrammeForm .filterSelected').text(selected_title);
                            $('.ProgrammeForm .dropdown-menu>ul li').eq(index).addClass('active').siblings().removeClass('active');
                        }
                    }
                });
                // In-venue / Online
                $('.form-item-field-performance-form-tags-target-id select>option').each(function (index) {
                    if (index !== 0) {
                        // 检查当前选项是否被选中
                        if ($(this).is(':selected')) {
                            var selected_title = $.trim($(this).text());
                            $('.ProgrammeCategory .filterSelected').text(selected_title);
                            $('.ProgrammeCategory .dropdown-menu>ul li').eq(index).addClass('active').siblings().removeClass('active');
                        }
                    }
                });
                // Date
                $('.form-item-field-date-state-target-id select>option').each(function (index) {
                    if (index !== 0) {
                        // 检查当前选项是否被选中
                        if ($(this).is(':selected')) {
                            var selected_title = $.trim($(this).text());
                            $('.ProgrammeDate .filterSelected').text(selected_title);
                            $('.ProgrammeDate .dropdown-menu>ul li').eq(index).addClass('active').siblings().removeClass('active');
                        }
                    }
                });
                // Performance A link
                if (lang === 'zh-hant') {
                    $('.page-node-type-programme .field--name-field-venue-location-link>a').text('場地位置');
                    $('.page-node-type-programme .field--name-field-in-venue-screening-venu>a').text('場地位置');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-ticket .label').text('門票');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-ticket .label').text('門票');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-ticket .label').text('門票');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-no-limits-plus .label').text('無限亮加料節目');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-note .label').text('備註');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-tags .label').text('藝術通達服務');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-access .label').text('藝術通達服務');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-accessib .label').text('藝術通達服務');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-note .label').text('備註');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-note .label').text('備註');
                    $('.block-addtoany>span>div:first-child').text('分享於');
                    $('.paragraph--type--plus-events').each(function () {
                        $(this).find('.field--name-field-location-link>a').text('場地位置');
                    });
                } else if (lang === 'zh-hans') {
                    $('.page-node-type-programme .field--name-field-venue-location-link>a').text('场地位置');
                    $('.page-node-type-programme .field--name-field-in-venue-screening-venu>a').text('场地位置');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-ticket .label').text('门票');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-ticket .label').text('门票');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-ticket .label').text('门票');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-no-limits-plus .label').text('无限亮加料节目');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-note .label').text('备注');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-tags .label').text('艺术通达服务');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-access .label').text('艺术通达服务');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-accessib .label').text('艺术通达服务');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-in-venue-screening-note .label').text('备注');
                    $('.page-node-type-programme .block-field-blocknodeprogrammefield-online-screening-note .label').text('备注');
                    $('.block-addtoany>span>div:first-child').text('分享于');
                    $('.paragraph--type--plus-events').each(function () {
                        $(this).find('.field--name-field-location-link>a').text('场地位置');
                    });
                } else {
                    $('.page-node-type-programme .field--name-field-venue-location-link>a').text('Venue Location');
                    $('.page-node-type-programme .field--name-field-in-venue-screening-venu>a').text('Venue Location');
                    $('.paragraph--type--plus-events').each(function () {
                        $(this).find('.field--name-field-location-link>a').text('Venue Location');
                    });
                }
            });
        });
        if (sessionStorage.getItem('ProgrammeForm') !== 'All') {
            $('.ProgrammeForm .dropdown-menu>ul li').each(function () {
                $(this).removeClass('active');
            });
            // console.log(sessionStorage.getItem('ProgrammeForm'));
            $('.ProgrammeForm .dropdown-menu>ul li').eq(sessionStorage.getItem('ProgrammeForm')).addClass('active');
            $('.form-item-field-programme-tags-id select>option').eq(sessionStorage.getItem('ProgrammeForm')).prop("selected", true);
            var active_text = $('.ProgrammeForm .dropdown-menu>ul li').eq(sessionStorage.getItem('ProgrammeForm')).text();
            $('.ProgrammeForm .dropdown-toggle .filterSelected').text(active_text);
        };
        if (sessionStorage.getItem('ProgrammeCategory') !== 'All') {
            $('.ProgrammeCategory .dropdown-menu>ul li').each(function () {
                $(this).removeClass('active');
            });
            $('.ProgrammeCategory .dropdown-menu>ul li').eq(sessionStorage.getItem('ProgrammeCategory')).addClass('active');
            $('.form-item-field-performance-form-tags-target-id select>option').eq(sessionStorage.getItem('ProgrammeCategory')).prop("selected", true);
            var active_text = $('.ProgrammeCategory .dropdown-menu>ul li').eq(sessionStorage.getItem('ProgrammeCategory')).text();
            $('.ProgrammeCategory .dropdown-toggle .filterSelected').text(active_text);
        };
        if (sessionStorage.getItem('ProgrammeDate') !== 'All') {
            $('.ProgrammeDate .dropdown-menu>ul li').each(function () {
                $(this).removeClass('active');
            });
            $('.ProgrammeDate .dropdown-menu>ul li').eq(sessionStorage.getItem('ProgrammeDate')).addClass('active');
            $('.form-item-field-date-state-target-id select>option').eq(sessionStorage.getItem('ProgrammeDate')).prop("selected", true);
            var active_text = $('.ProgrammeDate .dropdown-menu>ul li').eq(sessionStorage.getItem('ProgrammeDate')).text();
            $('.ProgrammeDate .dropdown-toggle .filterSelected').text(active_text);
        }
        if (sessionStorage.getItem('ProgrammeForm') !== 'All' || sessionStorage.getItem('ProgrammeCategory') !== 'All' || sessionStorage.getItem('ProgrammeDate') !== 'All') {
            setTimeout(function () {
                $('.view-block-programme-list .view-filters .form--inline .form-actions input').trigger('click');
            }, 200);
        }
        // console.log('ProgrammeForm:'+sessionStorage.getItem('ProgrammeForm'),'ProgrammeCategory:'+sessionStorage.getItem('ProgrammeCategory'),'ProgrammeDate:'+sessionStorage.getItem('ProgrammeDate'),);
        ///////// 每個swiper去掉role
        setTimeout(function () {
            $('.swiper-wrapper .swiper-slide').each(function () {
                $(this).removeAttr("role");
            });
        }, 2000);
        ///////// video page
        $(function () {
            // 加class
            $('.page-node-type-video .node__content .video-section-3>div').addClass('row justify-content-center');
            // breadcrumb
            var breadcrumb3_text = $.trim($('.page-node-type-video .node__content .video-section-2 .views-field-field-programme-tags .field-content').text());
            var breadcrumb_link = $('.page-node-type-video .block-system-breadcrumb-block  ol.breadcrumb>li:nth-child(2)>a').attr('href');
            var breadcrumb_text = $.trim($('.page-node-type-video .block-system-breadcrumb-block  ol.breadcrumb>li:nth-child(2)>a').text());
            var video_text = $.trim($('.page-node-type-video .view-id-playlist .views-field-nothing>a').text());
            $('.page-node-type-video .back-to-list').attr('href', breadcrumb_link);
            $('.page-node-type-video .back-to-list>span').text(breadcrumb_text);
            // $('.page-node-type-video .block-system-breadcrumb-block  ol.breadcrumb>li:nth-child(2)').after('<li class="breadcrumb-item">' + breadcrumb3_text + '</li>');
            if (video_text !== '') {
                $('.page-node-type-video .view-id-playlist').show();
            }
        });
        ///////// Contact Us Form
        setTimeout(function () {
            // 设置 placeholder
            $('form.webform-details-toggle').each(function () {
                var $form = $(this);
                $form.find('>div').each(function () {
                    var $div = $(this);
                    var Text = $.trim($div.find('label').text());

                    // Check the last child of $div
                    var lastChild = $div.children().last();

                    // Check if input or div has required class
                    var isRequired = lastChild.is('input.required, div:has(input.required)');
                    var spanClass = isRequired ? 'floating-label required' : 'floating-label';

                    if (lastChild.is('input')) {
                        // If the last child is an input
                        $div.append('<span class="' + spanClass + '">' + Text + '</span>');
                    } else if (lastChild.is('div')) {
                        // If the last child is a div 
                        lastChild.append('<span class="' + spanClass + '">' + Text + '</span>');
                    }
                });
            });
            $('form.webform-details-toggle input:not(.form-email)').on('input', function () {
                const value = $(this).val().trim(); // 去掉空白字符
                if (value === '') {
                    $(this).removeClass('filled').addClass('empty'); // 沒有輸入內容
                } else {
                    $(this).removeClass('empty').addClass('filled'); // 已輸入內容
                }
            });

            $('.path-webform form.webform-submission-form').each(function () {
                var $form = $(this);
                $form.find('.js-form-item:not(fieldset,.declaration-section)').each(function () {
                    var $div = $(this);
                    var Text = $.trim($div.find('label').text());

                    // Check the last child of $div
                    var lastChild = $div.children().last();

                    // Check if input or div has required class
                    var isRequired = lastChild.is('input.required, div:has(input.required)');
                    var spanClass = isRequired ? 'floating-label required' : 'floating-label';

                    if (lastChild.is('input')) {
                        // If the last child is an input
                        $div.append('<span class="' + spanClass + '">' + Text + '</span>');
                    } else if (lastChild.is('div')) {
                        // If the last child is a div 
                        lastChild.append('<span class="' + spanClass + '">' + Text + '</span>');
                    }
                });
            });
            $('form.webform-details-toggle .js-form-item-mobile-number').each(function () {
                // 选择 .form-type-number 的 input 元素
                var inputField = $('.js-form-item-mobile-number input');

                // 检查 input 是否是 required
                if (inputField.is('[required]')) {
                    // 如果是 required，给 .floating-label 添加 required 类
                    var Text = $(this).find('.floating-label').text();
                    $(this).append('<span class="floating-label required">' + Text + '</span>');
                    $(this).find('div>.floating-label').remove();
                } else {
                    var Text = $(this).find('.floating-label').text();
                    $(this).append('<span class="floating-label">' + Text + '</span>');
                    $(this).find('div>.floating-label').remove();
                }
            });
            $('.path-webform form.webform-submission-form input:not(.form-email,.form-radio)').on('input', function () {
                const value = $(this).val().trim(); // 去掉空白字符
                if (value === '') {
                    $(this).removeClass('filled').addClass('empty'); // 沒有輸入內容
                } else {
                    $(this).removeClass('empty').addClass('filled'); // 已輸入內容
                }
            });
            $('.path-webform form.webform-submission-form input:not(.form-email,.form-radio)').each(function () {
                const this_value = $(this).val().trim(); // 去除前後空白
                if (this_value) {
                    $(this).removeClass('empty').addClass('filled'); // 已輸入內容
                }
            });
            $('.path-webform form.webform-submission-form input:not(.form-email,.form-radio)').each(function () {
                const this_value = $(this).val().trim(); // 去除前後空白
                if (this_value) {
                    $(this).removeClass('empty').addClass('filled'); // 已輸入內容
                }
            });
            $('.path-webform form.webform-submission-form .form-type-email').each(function () {
                const email_value = $(this).find('input').val().trim(); // 去除前後空白
                if (email_value) {
                    $(this).addClass('email-filled'); // 已輸入內容
                } else {
                    $(this).removeClass('email-filled');
                }
            });
            $('.path-webform form.webform-submission-form input:not(.required,.form-radio)').each(function () {
                const no_required_value = $(this).val().trim(); // 去除前後空白
                if (no_required_value) {
                    $(this).parent().addClass('no_required_filled');
                } else {
                    $(this).removeClass('no_required_filled');
                }
            });
            $('.path-webform input.form-email').on('input', function () {
                const value = $(this).val().trim(); // 去掉空白字符
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email 格式正則表達式
                if (value === '') {
                    $(this).removeClass('filled').addClass('empty'); // 沒有輸入內容
                } else {
                    // 檢查 email 格式
                    if (emailPattern.test(value)) {
                        $(this).removeClass('invalid filled valid').addClass('valid filled'); // 格式正確
                    } else {
                        $(this).removeClass('valid filled invalid').addClass('invalid'); // 格式不正確
                    }
                }
            });
            $('.path-webform .form-wrapper').each(function () {
                const lastElement = $(this).children().last(); // 获取最后一个子元素
                if (lastElement.is('span.floating-label')) { // 检查是否为指定的 span
                    lastElement.remove(); // 移除该元素
                }
            });
            $('.path-webform .js-form-type-checkbox').each(function () {
                const lastElement = $(this).children().last(); // 获取最后一个子元素
                if (lastElement.is('span.floating-label')) { // 检查是否为指定的 span
                    lastElement.remove(); // 移除该元素
                }
            });
            $('.path-webform .declaration-section>div.container-xxl.js-form-wrapper>span.floating-label').remove();
            $('.path-webform .js-form-type-radio').each(function () {
                var $div = $(this);
                var Text = $.trim($div.find('label').text());
                // $div.find('input').after('<span class="radiobtn">' + Text + '</span>');
            });
            $('.visible-section .js-form-item').each(function () {
                $(this).find('input').focus(function () {
                    $(this).parents('.visible-section .js-form-item').addClass('focused');
                }).blur(function () {
                    $(this).parents('.visible-section .js-form-item').removeClass('focused');
                    if ($(this).val()) {
                        $(this).parents('.visible-section .js-form-item').addClass('has-value');
                    } else {
                        $(this).parents('.visible-section .js-form-item').removeClass('has-value');
                    }
                });
            });
        }, 500);
        // $('.path-webform .form-type-radio').on('click', function () {
        //     console.log(213);
        //     // if ($(this).find('input.form-radio').is(':checked')) {
        //     //     $(this).find('input.form-radio').prop('checked', false);
        //     //     $(this).find('input.form-radio').parent().removeClass('checked')
        //     // }
        // });
        // 绑定 iCheck-helper 的点击事件
        $('.path-webform fieldset[id^="edit-agree-"][id$="--wrapper"]:not(.required) .form-type-radio label').on('click', function (e) {
            e.preventDefault(); // 阻止默認行為
            var prevElement = $(this).prev(':not([disabled])'); // 排除 disabled 的元素
            if (prevElement.length > 0) { // 確保選取的元素存在
                if (prevElement.prop('checked')) {
                    prevElement.prop('checked', false); // 取消選中
                    prevElement.removeClass('checked'); // 移除 checked 類別
                    console.log('取消選擇');
                } else {
                    prevElement.prop('checked', true); // 被選中
                    prevElement.addClass('checked'); // 添加 checked 類別
                    console.log('被選中');
                }
            } else {
                console.log('無法操作 disabled 的元素');
            }
        });
        $(function () {
            var text = $('.webform-confirmation__back a').text();
            $('.webform-confirmation__back a').html(text);
        });
        ///////// No Limits PLUS List
        $('.card-no-limits-plus .item-list>ul>li').each(function () {
            $(this).addClass('obs-items');
            var link_text = $.trim($(this).find('.field--name-field-links-text').text());
            if (link_text) {
                $(this).find('.field--name-bp-link a').text(link_text);
                $(this).find('.field--name-field-links-text').remove();
            }
        });
        $(document).ajaxComplete(function () {
            $('.card-no-limits-plus .item-list>ul>li').each(function () {
                $(this).addClass('obs-items');
            });
            $('.card-no-limits-plus .item-list>ul>li').each(function () {
                $(this).addClass('obs-items');
                var link_text = $.trim($(this).find('.field--name-field-links-text').text());
                if (link_text) {
                    $(this).find('.field--name-bp-link a').text(link_text);
                    $(this).find('.field--name-field-links-text').remove();
                }
            });
            $(function () {
                var text = $('.webform-confirmation__back a').text();
                $('.webform-confirmation__back a').html(text);
            });
        });
        $(function () {
            // 获取链接中的哈希值
            if ($('body').hasClass('page-node-type-programme')) {
                $('.page-node-type-programme .node__content>.layout--twocol-section--50-50:nth-child(2) .layout__region--second').append('<div class="download-div"></div>');
                var $targetDocumentDiv = $('div.block-field-blocknodeprogrammefield-document-leaflet-link');
                var $targetHouseDiv = $('div.block-field-blocknodeprogrammefield-audio-house-programme-link');
                var $targetDescriptionDiv = $('div.block-field-blocknodeprogrammefield-audio-description-trailer');
                var $targetSignLanguageDiv = $('div.block-field-blocknodeprogrammefield-sign-language-trailer-link');
                var $targetDescriptiveDiv = $('div.block-field-blocknodeprogrammefield-descriptive-transcript-lin');
                var $targetOnlineScreeningDiv = $('div.block-field-blocknodeprogrammefield-online-screening');
                if ($targetOnlineScreeningDiv.length > 0) {
                    // 如果存在，提取整个 Document div 的 HTML
                    var OnlineScreeningDivHtml = $targetOnlineScreeningDiv.prop('outerHTML');
                    $('.page-node-type-programme .node__content>.layout--twocol-section--50-50:nth-child(2) .layout__region--second .download-div').append(OnlineScreeningDivHtml);
                    $targetOnlineScreeningDiv.remove();
                    if (lang === 'zh-hant') {
                        $('.block-field-blocknodeprogrammefield-online-screening .label').text('立即觀看網上放映');
                        $('.block-field-blocknodeprogrammefield-online-screening .field--name-field-online-screening a').attr({
                            "aria-label": "立即觀看網上放映",
                            "title": "立即觀看網上放映"
                        });
                    } else if (lang === 'zh-hans') {
                        $('.block-field-blocknodeprogrammefield-online-screening .label').text('立即观看网上放映');
                        $('.block-field-blocknodeprogrammefield-online-screening .field--name-field-online-screening a').attr({
                            "aria-label": "立即观看网上放映",
                            "title": "立即观看网上放映"
                        });
                    } else {
                        $('.block-field-blocknodeprogrammefield-online-screening .label').text('Watch Online Screening Now');
                        $('.block-field-blocknodeprogrammefield-online-screening .field--name-field-online-screening a').attr({
                            "aria-label": "Watch Online Screening Now",
                            "title": "Watch Online Screening Now"
                        });
                    }
                }
                if ($targetDocumentDiv.length > 0) {
                    // 如果存在，提取整个 Document div 的 HTML
                    var DocumentDivHtml = $targetDocumentDiv.prop('outerHTML');
                    $('.page-node-type-programme .node__content>.layout--twocol-section--50-50:nth-child(2) .layout__region--second .download-div').append(DocumentDivHtml);
                    $targetDocumentDiv.remove();
                    if (lang === 'zh-hant') {
                        $('.block-field-blocknodeprogrammefield-document-leaflet-link .label').text('下載場刊');
                    } else if (lang === 'zh-hans') {
                        $('.block-field-blocknodeprogrammefield-document-leaflet-link .label').text('下载场刊');
                    } else { }
                }
                if ($targetHouseDiv.length > 0) {
                    // 如果存在，提取整个 Document div 的 HTML
                    var HouseDivHtml = $targetHouseDiv.prop('outerHTML');
                    $('.page-node-type-programme .node__content>.layout--twocol-section--50-50:nth-child(2) .layout__region--second .download-div').append(HouseDivHtml);
                    $targetHouseDiv.remove();
                    if (lang === 'zh-hant') {
                        $('.block-field-blocknodeprogrammefield-audio-house-programme-link .label').text('語音場刊');
                    } else if (lang === 'zh-hans') {
                        $('.block-field-blocknodeprogrammefield-audio-house-programme-link .label').text('语音场刊');
                    } else { }
                }
                if ($targetDescriptionDiv.length > 0) {
                    // 如果存在，提取整个 Document div 的 HTML
                    var DescriptionDivHtml = $targetDescriptionDiv.prop('outerHTML');
                    $('.page-node-type-programme .node__content>.layout--twocol-section--50-50:nth-child(2) .layout__region--second .download-div').append(DescriptionDivHtml);
                    $targetDescriptionDiv.remove();
                    setTimeout(function () {
                        if (lang === 'zh-hant') {
                            $('.field--name-field-audio-description-trailer button').text('口述影像預告');
                        } else if (lang === 'zh-hans') {
                            $('.field--name-field-audio-description-trailer button').text('口述影像预告');
                        } else { }
                    }, 200);
                }
                if ($targetSignLanguageDiv.length > 0) {
                    // 如果存在，提取整个 Document div 的 HTML
                    var SignLanguageDivHtml = $targetSignLanguageDiv.prop('outerHTML');
                    $('.page-node-type-programme .node__content>.layout--twocol-section--50-50:nth-child(2) .layout__region--second .download-div').append(SignLanguageDivHtml);
                    $targetSignLanguageDiv.remove();
                    setTimeout(function () {
                        if (lang === 'zh-hant') {
                            $('.field--name-field-sign-language-trailer-link button').text('手語預告片');
                        } else if (lang === 'zh-hans') {
                            $('.field--name-field-sign-language-trailer-link button').text('手语预告片');
                        } else { }
                    }, 200);
                }
                if ($targetDescriptiveDiv.length > 0) {
                    // 如果存在，提取整个 Document div 的 HTML
                    var DescriptiveDivHtml = $targetDescriptiveDiv.prop('outerHTML');
                    $('.page-node-type-programme .node__content>.layout--twocol-section--50-50:nth-child(2) .layout__region--second .download-div').append(DescriptiveDivHtml);
                    $targetDescriptiveDiv.remove();
                    setTimeout(function () {
                        if (lang === 'zh-hant') {
                            $('.block-field-blocknodeprogrammefield-descriptive-transcript-lin>div.label').text('影片文字描述');
                            $('.field--name-field-descriptive-transcript-lin a').text('影片文字描述');
                        } else if (lang === 'zh-hans') {
                            $('.block-field-blocknodeprogrammefield-descriptive-transcript-lin>div.label').text('影片文字描述');
                            $('.field--name-field-descriptive-transcript-lin a').text('影片文字描述');
                        } else { }
                    }, 200);
                }
                // Audio Description Trailer button
                $('.page-node-type-programme .field--name-field-descriptive-transcript-lin > a').attr('target', '_blank');
            }

            // 获取当前哈希值
            function getHashNumber() {
                const hash = window.location.hash;
                return hash ? parseInt(hash.substring(1), 10) : null; // 去掉 # 并转换为数字
            }

            // 滚动到目标标题
            function scrollToTarget(number) {
                const $targetTitle = $('.side-title').eq(number - 1);
                if ($targetTitle.length) {
                    $('html, body').animate({
                        scrollTop: $targetTitle.offset().top - 90
                    }, 500);
                }
            }

            // 页面加载时处理
            const initialNumber = getHashNumber();
            if (initialNumber) {
                scrollToTarget(initialNumber);
            }
        });

        // back to top
        $(window).scroll(function () {
            if ($(this).scrollTop() > 1000) {
                $('#block-i2-theme-backtotop').css('opacity', '1');
            } else {
                $('#block-i2-theme-backtotop').css('opacity', '0');
            }
        });
        $('.sidebar-back-to-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 200);
            return false;
        });

        // index - Highlighted Programme
        $('.block-field-blockparagraphindex-highlighted-programmefield-right-content>div:nth-child(1)').addClass('active');
        $('.block-field-blockparagraphindex-highlighted-programmefield-left-content>div:nth-child(1)').addClass('active');
        $('.block-field-blockparagraphindex-highlighted-programmefield-right-content').addClass('obs-items');
        $('.block-field-blockparagraphindex-highlighted-programmefield-left-content').addClass('obs-items');
        $('.paragraph--type--highlighted-left-content').each(function () {
            var title = $.trim($(this).find('.field--name-field-highlighted-left-title').text());
            var content = $.trim($(this).find('.field--name-field-content').text());
            var url = $(this).find('.field--name-bp-link a').attr('href');
            var content = `
                           <a href="${url}" target="_blank" role="link"  class="highlighted-left-content-item">
                              <h3>${title}</h3>
                              <p>${content}</p>
                           </a>
                        `;
            $(this).html(content);
        });
        $('.paragraph--type--highlighted-right-content').each(function () {
            var link = $.trim($(this).find('.link-url a').text());
            var title = $.trim($(this).find('.block-field-blockparagraphhighlighted-right-contentbp-header .field--name-bp-header').text());
            var img = $(this).find('.block-field-blockparagraphhighlighted-right-contentfield-image').html();
            var category = $.trim($(this).find('.block-field-blockparagraphhighlighted-right-contentfield-category .field--name-field-category').text());
            var artiest = $.trim($(this).find('.block-field-blockparagraphhighlighted-right-contentfield-artiest .field--name-field-artiest').text());
            var content = `
                    <a href="${link}" target="_blank" role="link"  class="highlighted-right-content-item">
                        <div class="item-img">${img}</div>
                        <div class="item-category">${category}</div>
                        <h3 class="item-title">${title}</h3>
                        <div class="item-artiest">${artiest}</div>
                    </a>
                `;
            $(this).html(content);
        });
        // 鼠标悬停事件
        $('.block-field-blockparagraphindex-highlighted-programmefield-left-content > div').hover(
            function () {
                // 当鼠标进入时，添加 active 类并移除兄弟元素的 active 类
                $(this).addClass('active').siblings().removeClass('active');
            },
            function () {
                // 当鼠标离开时，保持当前元素的 active 类
                // 这里可以选择不做任何操作
            }
        );
        $('.block-field-blockparagraphindex-highlighted-programmefield-right-content > div').hover(
            function () {
                // 当鼠标进入时，添加 active 类并移除兄弟元素的 active 类
                $(this).addClass('active').siblings().removeClass('active');
            },
            function () {
                // 当鼠标离开时，保持当前元素的 active 类
                // 这里可以选择不做任何操作
            }
        );
        // 点击事件
        $('.block-field-blockparagraphindex-highlighted-programmefield-left-content > div').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
        $('.block-field-blockparagraphindex-highlighted-programmefield-right-content > div').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
        });
        // Contact Us
        setTimeout(function () {
            var jump_kind = getUrlParam('jump');
            if (jump_kind == 'subscribe-form') {
                $('html, body').animate({
                    scrollTop: $('.webform-submission-section').offset().top - 90
                }, 500);
            }
        }, 200);
        // 區分是不是outreach
        if ($('body').hasClass('page-node-type-programme')) {
            // 獲取當前 URL
            var currentUrl = window.location.href;
            var lastSegment = currentUrl.split('/').pop(); // 分割 URL 並獲取最後一部分
            if (lastSegment == 'outreach') {
                $('body').addClass('page-type-outreach');
                if (lang === 'zh-hant') {
                    setTimeout(function () {
                        $('.back-to-list').attr('href', '/zh-hant/outreach');
                        $('.back-to-list span').text('外展節目');
                    }, 500);
                } else if (lang === 'zh-hans') {
                    setTimeout(function () {
                        $('.back-to-list').attr('href', '/zh-hans/outreach');
                        $('.back-to-list span').text('外展节目');
                    }, 500);
                } else {
                    setTimeout(function () {
                        $('.back-to-list').attr('href', '/outreach');
                        $('.back-to-list span').text('Outreach');
                    }, 500);
                }
            };
        }
        // image 加alt
        $('.field--name-field-image').each(function () {
            $(this).find('img').attr('alt', '');
        });
        $('.paragraph--type--image').each(function () {
            var link_text = $.trim($(this).find('.field--name-field-image-link-text').text());
            if (link_text) {
                $(this).find('.link-url>a').text(link_text);
                $(this).find('.field--name-field-image-link-text').remove();
            }
        });
        // tab Calendar
        $(document).keydown(function (event) {
            // Check if the active element is within the specific div
            if ($('.calendarhtml').has(event.target).length) {
                if (event.key === "Enter" || event.key === ' ') {
                    event.preventDefault(); // Prevent default action
                    // Get the currently focused element
                    var activeElement = document.activeElement;
                    // Check if the active element is an anchor tag inside a calendar cell
                    if ($(activeElement).is('a.calendar-card')) {
                        window.location.href = $(activeElement).attr('href'); // Follow the link
                    } else if ($(activeElement).is('.calendar-cell')) {
                        // Handle the calendar cell as before
                        $('.calendar-cell').removeClass('enter-class');
                        $(activeElement).addClass('enter-class');
                        var date = $('.day-wrapper .calendar-cell.enter-class.has-event').attr('data-date');
                        const formattedDate = formatDate(date);
                        var html = $('.day-wrapper .calendar-cell.enter-class.has-event').html();
                        $('.calendar-card-section .content').html(html);
                        $('.calendar-card-section .date').html(formattedDate);
                    }
                }
            }
        });

        // menu 跳轉到Calendar
        $(function () {
            var url = window.location.href; // 獲取當前 URL
            var hash = url.split('#')[1]; // 獲取 hash 部分
            if (hash) {
                var calendar = hash.split('/')[0]; // 獲取 calendar
                if (calendar == 'calendar') {
                    $('html, body').animate({
                        scrollTop: $('.home-calendar').offset().top
                    }, 500);
                }
            }
        });
        $(window).on('hashchange', function () {
            if (window.location.hash === '#calendar') {
                // 當前 URL 加上 #calendar 時執行的代碼
                $('html, body').animate({
                    scrollTop: $('.home-calendar').offset().top
                }, 500);
            }
        });
        $(function () {
            // 滚动到目标标题
            function scrollToTarget1(number) {
                const $targetTitle = $('.side-title').eq(number - 1);
                if ($targetTitle.length) {
                    $('html, body').animate({
                        scrollTop: $targetTitle.offset().top - 90
                    }, 500);
                }
            }
            const $audioDescriptionLink = $('.page-node-type-programme .field--name-field-audio-description-trailer > a');
            const $SignLanguageLink = $('.page-node-type-programme .field--name-field-sign-language-trailer-link > a');
            // Check if the link exists and has an href attribute
            if ($audioDescriptionLink.length > 0 && $audioDescriptionLink.attr('href')) {
                const href = $audioDescriptionLink.attr('href');
                const sortingValue = href.split('#')[1]; // 获取 # 后面的值

                // 将链接转换为按钮并添加 data-sorting 属性
                const $audioDescriptionDiv = $('.page-node-type-programme .field--name-field-audio-description-trailer');
                const $audioDescriptionButton = $('<button type="button" data-sorting="' + sortingValue + '">Audio Description Trailer</button>');

                // 替换原有的链接
                $audioDescriptionDiv.empty().append($audioDescriptionButton);

                // 点击按钮时处理
                $audioDescriptionButton.click(function () {
                    const sortingNumber = $(this).data('sorting'); // 获取 data-sorting 值
                    scrollToTarget1(sortingNumber); // 使用 sortingNumber 进行滚动
                });
            }
            // Check if the link exists and has an href attribute
            if ($SignLanguageLink.length > 0 && $SignLanguageLink.attr('href')) {
                const href = $SignLanguageLink.attr('href');
                // 获取 # 前面的部分
                const baseUrl = href.split('#')[0]; // 获取 # 前面的部分
                const urlParams = new URLSearchParams(baseUrl.split('?')[1]); // 获取 ? 后面的部分
                const idValue = urlParams.get('id'); // 获取 id 的值
                const sortingValue = href.split('#')[1]; // 获取 # 后面的值

                // 将链接转换为按钮并添加 data-sorting 属性
                const $SignLanguageLinkDiv = $('.page-node-type-programme .field--name-field-sign-language-trailer-link');
                if (idValue) {
                    var $SignLanguageLinkButton = $('<button type="button" data-id="' + idValue + '" data-sorting="' + sortingValue + '">Sign Language Trailer</button>');

                } else {
                    var $SignLanguageLinkButton = $('<button type="button" data-sorting="' + sortingValue + '">Sign Language Trailer</button>');
                }
                // 替换原有的链接
                $SignLanguageLinkDiv.empty().append($SignLanguageLinkButton);

                // 点击按钮时处理
                // setTimeout(function () {
                //     $SignLanguageLinkButton.click(function () {
                //         const sortingNumber = $(this).data('sorting'); // 获取 data-sorting 值
                //         var idNumber = $(this).data('id'); // 获取 data-id 值
                //         scrollToTarget(sortingNumber); // 使用 sortingNumber 进行滚动
                //         // 假設你的 idNumber 和 sortingNumber 已經定義
                //         if (idNumber) {
                //             // 獲取對應的 Swiper 實例
                //             var GallerySwiper = $('.block-field-blocknodeprogrammefield-body-paragraphs>div')
                //                 .eq(sortingNumber - 1) // 獲取對應的 div
                //                 .find('.paragraphGallerySwiper')[0].swiper; // 獲取 Swiper 實例
                //             // 使用 slideTo 方法切換到指定的滑塊
                //             GallerySwiper.slideTo(idNumber + 1);
                //         }
                //     });
                // }, 200);
                var $paragraphGallerySwiper;

                $SignLanguageLinkButton.click(function () {
                    var sortingNumber = $(this).data('sorting');
                    var idNumber = $(this).data('id');

                    scrollToTarget1(sortingNumber);

                    if (!$paragraphGallerySwiper) {
                        $paragraphGallerySwiper = $('.block-field-blocknodeprogrammefield-body-paragraphs > div .paragraph--type--module-5');
                    }

                    // console.log('$paragraphGallerySwiper:', $paragraphGallerySwiper);

                    if ($paragraphGallerySwiper.length > 0) {
                        var GallerySwiper = $paragraphGallerySwiper[0].swiper;
                        if (typeof GallerySwiper !== 'undefined' && GallerySwiper !== null) {
                            GallerySwiper.slideTo(idNumber + 1);
                        } else {
                            console.log('GallerySwiper is not defined or null');
                        }
                    } else {
                        console.log('No .paragraphGallerySwiper element found');
                    }
                });
            }
        });
        //////ajax
        $('.paragraph--type--plus-events').each(function () {
            if ($(this).find('.block-field-blockparagraphplus-eventsfield-plus-display-time>img').length === 0) {
                if (lang === 'zh-hant') {
                    $(this).find('.field--name-field-plus-display-time').before('<img src="/themes/custom/i2_theme/image/icon/icon-date-orange.svg" alt="" loading="lazy"><div class="label">日期</div>');
                } else if (lang === 'zh-hans') {
                    $(this).find('.field--name-field-plus-display-time').before('<img src="/themes/custom/i2_theme/image/icon/icon-date-orange.svg" alt="" loading="lazy"><div class="label">日期</div>');
                } else {
                    $(this).find('.field--name-field-plus-display-time').before('<img src="/themes/custom/i2_theme/image/icon/icon-date-orange.svg" alt="" loading="lazy"><div class="label">Date</div>');
                }
            }
            if ($(this).find('.block-field-blockparagraphplus-eventsfield-venue>img').length === 0) {
                if (lang === 'zh-hant') {
                    $(this).find('.field--name-field-venue').before('<img src="/themes/custom/i2_theme/image/icon/icon-location-orange-24px.svg" alt="" loading="lazy"><div class="label">場地</div>');
                } else if (lang === 'zh-hans') {
                    $(this).find('.field--name-field-venue').before('<img src="/themes/custom/i2_theme/image/icon/icon-location-orange-24px.svg" alt="" loading="lazy"><div class="label">场地</div>');
                } else {
                    $(this).find('.field--name-field-venue').before('<img src="/themes/custom/i2_theme/image/icon/icon-location-orange-24px.svg" alt="" loading="lazy"><div class="label">Venue</div>');
                }
            }
        });

        $(document).ajaxComplete(function () {
            $('.paragraph--type--plus-events').each(function () {
                if ($(this).find('.block-field-blockparagraphplus-eventsfield-plus-display-time>img').length === 0) {
                    if (lang === 'zh-hant') {
                        $(this).find('.field--name-field-plus-display-time').before('<img src="/themes/custom/i2_theme/image/icon/icon-date-orange.svg" alt="" loading="lazy"><div class="label">日期</div>');
                    } else if (lang === 'zh-hans') {
                        $(this).find('.field--name-field-plus-display-time').before('<img src="/themes/custom/i2_theme/image/icon/icon-date-orange.svg" alt="" loading="lazy"><div class="label">日期</div>');
                    } else {
                        $(this).find('.field--name-field-plus-display-time').before('<img src="/themes/custom/i2_theme/image/icon/icon-date-orange.svg" alt="" loading="lazy"><div class="label">Date</div>');
                    }
                }
                if ($(this).find('.block-field-blockparagraphplus-eventsfield-venue>img').length === 0) {
                    if (lang === 'zh-hant') {
                        $(this).find('.field--name-field-venue').before('<img src="/themes/custom/i2_theme/image/icon/icon-location-orange-24px.svg" alt="" loading="lazy"><div class="label">場地</div>');
                    } else if (lang === 'zh-hans') {
                        $(this).find('.field--name-field-venue').before('<img src="/themes/custom/i2_theme/image/icon/icon-location-orange-24px.svg" alt="" loading="lazy"><div class="label">场地</div>');
                    } else {
                        $(this).find('.field--name-field-venue').before('<img src="/themes/custom/i2_theme/image/icon/icon-location-orange-24px.svg" alt="" loading="lazy"><div class="label">Venue</div>');
                    }
                }
                if (lang === 'zh-hant') {
                    $('.paragraph--type--plus-events').each(function () {
                        $(this).find('.block-field-blockparagraphplus-eventsfield-language .label').text('語言:');
                        $(this).find('.block-field-blockparagraphplus-eventsfield-admission .label').text('報名:');
                        $(this).find('.block-field-blockparagraphplus-eventsfield-note .label').text('備註:');
                    });
                } else if (lang === 'zh-hans') {
                    $('.paragraph--type--plus-events').each(function () {
                        $(this).find('.block-field-blockparagraphplus-eventsfield-language .label').text('语言:');
                        $(this).find('.block-field-blockparagraphplus-eventsfield-admission .label').text('报名:');
                        $(this).find('.block-field-blockparagraphplus-eventsfield-note .label').text('备注:');
                    });
                } else {
                }
            });
        });
        ////// language
        $('#language-toolbar div.dropdown-menu>ul>li').each(function () {
            const lang = $(this).attr('hreflang');
            if (lang === 'zh-hant') {
                $(this).find('>a').attr('aria-label', 'Traditional Chinese/繁體');
            } else if (lang === 'zh-hans') {
                $(this).find('>a').attr('aria-label', 'Simplified Chinese/簡體');
            } else {
                $(this).find('>a').attr('aria-label', 'English/英文');
            }
        });

        /////// 翻譯
        $(function () {
            // 獲取 lang 屬性
            const lang = document.documentElement.getAttribute('lang');
            if (lang === 'zh-hant') {
                // logo
                $('#block-i2-theme-branding .navbar-brand>a').html('<img src="/themes/custom/i2_theme/logo-tc.svg" alt="首頁" fetchpriority="high">');
                //no-limits-plus
                $('.paragraph--type--plus-events').each(function () {
                    $(this).find('.block-field-blockparagraphplus-eventsfield-language .label').text('語言:');
                    $(this).find('.block-field-blockparagraphplus-eventsfield-admission .label').text('報名:');
                    $(this).find('.block-field-blockparagraphplus-eventsfield-note .label').text('備註:');
                });
                // navigation menu
                $('#block-i2-theme-navbutton .btn').attr('aria-label', '主目錄');
                $('#i2-offcanvasRight .offcanvas-header .btn-close').attr('aria-label', '關閉主目錄');
                // navigation-right
                $('#language-toolbar').attr('title', '語言');
            } else if (lang === 'zh-hans') {
                // logo
                $('#block-i2-theme-branding .navbar-brand>a').html('<img src="/themes/custom/i2_theme/logo-tc.svg" alt="首页" fetchpriority="high">');
                // navigation menu
                $('#block-i2-theme-navbutton .btn').attr('aria-label', '主目录');
                $('#i2-offcanvasRight .offcanvas-header .btn-close').attr('aria-label', '关闭主目录');
                // no-limits-plus
                $('.paragraph--type--plus-events').each(function () {
                    $(this).find('.block-field-blockparagraphplus-eventsfield-language .label').text('语言:');
                    $(this).find('.block-field-blockparagraphplus-eventsfield-admission .label').text('报名:');
                    $(this).find('.block-field-blockparagraphplus-eventsfield-note .label').text('备注:');
                });
                // navigation-right
                $('#language-toolbar').attr('title', '语言');
            } else { }
        });
        ////// skip to content
        $(function () {
            const pageConfigs = {
                'page-node-4': '.block-views-blockblock-programme-list-block-1',
                'page-node-5': '.block-views-blockblock-programme-list-block-2',
                'page-node-32': '.block-views-blockblock-no-limits-plus-block-1'
            };

            // 將 skipLinks 宣告移到外部
            let skipLinks = '';

            if (lang === 'zh-hant') {
                skipLinks = `<a href="#pe-main-filter-section">跳過橫幅輪播</a>`;
            } else if (lang === 'zh-hans') {
                skipLinks = `<a href="#pe-main-filter-section">跳过横幅轮播</a>`;
            } else {
                skipLinks = `<a href="#pe-main-filter-section">Skip Banner Carousell</a>`;
            }

            Object.entries(pageConfigs).forEach(([pageClass, filterSelector]) => {
                const $page = $(`.${pageClass}`);
                if ($page.length) {
                    $page.find('.BasicBannerSwiper').attr('id', 'pe-main-banner');
                    $page.find(filterSelector)
                        .parents('.layout.layout--onecol')
                        .attr('id', 'pe-main-filter-section');
                    $page.find('.visually-hidden-focusable.skip-link')
                        .prepend(skipLinks);
                }
            });
        });
        //點擊我跳轉到輸入輸入框
        $('.subscription-container div').click(function () {
            // 滾動到輸入框的位置
            $('html, body').animate({
                scrollTop: $('.webform-submission-section').offset().top - 280
            }, 500, function () {
                // 設置焦點到輸入框
                $('.webform-submission-subscribe-enews-form .form-item-email input').focus();
            });
        });
        //清空conent-none的東西
        $('.i2-content-none').html('');
    });
    // breadcrumb add aria-hidden="true"
    $(function () {
        $('.page-node-type-programme .breadcrumb li:last-child,.page-node-type-video .breadcrumb li:last-child').attr('aria-hidden', 'true');
        $('.page-node-type-programme nav ol.breadcrumb>li').each(function () {
            var url_href = $(this).find('>a').attr('href');
            if (url_href && url_href.includes('/online_screening/')) {
                $(this).attr('aria-hidden', 'true').hide();
            }
        });

    });
    // Basic swiper
    $(function () {
        function waitForContent() {
            return new Promise((resolve) => {
                let loadedItems = 0;
                const totalItems = $('.page-node-type-page .paragraph--type--banner-list>.paragraph__column>div:not(.field--name-field-class):not(.field--name-field-tags)').length;

                // 處理圖片
                $('.paragraph--type--banner-list img').each(function () {
                    const img = $(this)[0];
                    if (img.complete) {
                        loadedItems++;
                    } else {
                        img.onload = () => {
                            loadedItems++;
                            checkIfComplete();
                        };
                        img.onerror = () => {
                            loadedItems++;
                            checkIfComplete();
                        };
                    }
                });

                // 處理影片
                $('.field--name-field-media-video-file video').each(function () {
                    const video = $(this)[0];
                    video.addEventListener('loadeddata', () => {
                        loadedItems++;
                        checkIfComplete();
                    });
                    video.addEventListener('error', () => {
                        loadedItems++;
                        checkIfComplete();
                    });
                });

                // 處理 YouTube iframe
                $('.player').each(function () {
                    const iframe = $(this)[0];
                    iframe.onload = () => {
                        loadedItems++;
                        checkIfComplete();
                    };
                    iframe.onerror = () => {
                        loadedItems++;
                        checkIfComplete();
                    };
                });

                function checkIfComplete() {
                    if (loadedItems >= totalItems) {
                        setTimeout(resolve, 500);
                    }
                }

                checkIfComplete();
            });
        }

        var BasicListswiperContent = `
            <div class="swiper-button-next BasicBannerSwiper-button-next" aria-label="Next slide"></div>
            <div class="swiper-button-prev BasicBannerSwiper-button-prev" aria-label="Previous slide"></div>
            <div class="swiper-pagination BasicBannerSwiper-pagination" role="tablist"></div>
        `;

        $('.page-node-type-page .paragraph--type--banner-list').addClass('swiper BasicBannerSwiper');
        $('.page-node-type-page .paragraph--type--banner-list>.paragraph__column').addClass('swiper-wrapper');

        $('.page-node-type-page .paragraph--type--banner-list>.paragraph__column>div:not(.field--name-field-class):not(.field--name-field-tags)').each(function (index) {
            $(this)
                .addClass('swiper-slide')
                .attr({
                    'role': 'tabpanel',
                    'aria-label': `幻燈片 ${index + 1}`,
                    'tabindex': '0'
                });
        });

        $('.page-node-type-page .paragraph--type--banner-list>.paragraph__column').after(BasicListswiperContent);
        var players = {};

        function stopAllVideos() {
            Object.keys(players).forEach(playerClass => {
                if (players[playerClass] && typeof players[playerClass].pauseVideo === 'function') {
                    try {
                        players[playerClass].pauseVideo();
                    } catch (e) {
                        console.log('無法暫停視頻:', e);
                    }
                }
            });

            const allVideos = document.querySelectorAll('.BasicBannerSwiper .field--name-field-media-video-file video');
            allVideos.forEach(video => {
                video.pause();
                video.currentTime = 0;
            });
        }

        function initializePlayers() {
            const iframes = document.querySelectorAll('.player');
            iframes.forEach((iframe, index) => {
                const playerClass = `player${index + 1}`;
                try {
                    players[playerClass] = new YT.Player(iframe, {
                        videoId: iframe.getAttribute('data-video-id'),
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                } catch (e) {
                    console.log('播放器初始化錯誤:', e);
                }
            });
        }

        function onPlayerReady(event) {
            // console.log('Player is ready:', event.target);
        }

        function onPlayerStateChange(event) {
            // console.log('Player state changed:', event.data);
        }

        function handlePlayerInitialization() {
            if (typeof YT !== 'undefined' && YT.Player) {
                initializePlayers();
            } else {
                window.onYouTubeIframeAPIReady = initializePlayers;
            }
        }

        function detectLanguageChange() {
            const currentUrl = window.location.href;
            const previousUrl = sessionStorage.getItem('previousUrl');

            if (previousUrl && previousUrl !== currentUrl) {
                sessionStorage.removeItem('hasLoaded');
            }
            sessionStorage.setItem('previousUrl', currentUrl);
        }

        detectLanguageChange();
        handlePlayerInitialization();

        window.onpopstate = function () {
            detectLanguageChange();
            handlePlayerInitialization();
        };

        // 等待所有內容載入後再初始化 Swiper
        waitForContent().then(() => {
            $('.page-node-type-page .paragraph--type--banner-list>.paragraph__column>div:not(.swiper-slide)').each(function () {
                $(this).remove();
            });

            var BasicBannerSwiper = new Swiper(".BasicBannerSwiper", {
                slidesPerView: 1, // Default for mobile
                spaceBetween: 30,
                loopedSlides: 3,
                loop: true,
                watchOverflow: true,
                breakpoints: {
                    '768': { // Tablet and above
                        slidesPerView: 'auto',
                        spaceBetween: 30
                    },
                    '1200': {
                        slidesPerView: 'auto',
                        spaceBetween: 40
                    },
                    '1500': {
                        slidesPerView: 'auto',
                        spaceBetween: 45
                    },
                    '1740': {
                        slidesPerView: 'auto',
                        spaceBetween: 50
                    }
                },
                navigation: {
                    nextEl: ".BasicBannerSwiper-button-next",
                    prevEl: ".BasicBannerSwiper-button-prev",
                },
                pagination: {
                    el: ".BasicBannerSwiper-pagination",
                    clickable: true,
                },
                a11y: {
                    enabled: true,
                    prevSlideMessage: 'Previous slide',
                    nextSlideMessage: 'Next slide',
                    firstSlideMessage: 'This is the first slide',
                    lastSlideMessage: 'This is the last slide',
                    paginationBulletMessage: 'Jump to slide {{index}}'
                },
                on: {
                    slideChange: function () {
                        stopAllVideos();
                        $('.swiper-slide').attr('aria-hidden', 'true').attr('tabindex', '-1');
                        $('.swiper-slide-active').attr('aria-hidden', 'false').attr('tabindex', '0');

                        if (window.innerWidth >= 768) {
                            this.slides.forEach((slide, index) => {
                                if (index === this.activeIndex) {
                                    $(slide).css('width', '58%');
                                } else {
                                    $(slide).css('width', '32.35%');
                                }
                            });
                        }
                    },
                    transitionStart: stopAllVideos,
                    init: function () {
                        $('.swiper-slide-active').attr('aria-hidden', 'false').attr('tabindex', '0');
                        $('.swiper-slide:not(.swiper-slide-active)').attr('aria-hidden', 'true').attr('tabindex', '-1');

                        if (window.innerWidth >= 768) {
                            this.slides.forEach((slide, index) => {
                                if (index === this.activeIndex) {
                                    $(slide).css('width', '58%');
                                } else {
                                    $(slide).css('width', '32.35%');
                                }
                            });
                        }
                    }
                }
            });

            $('.BasicBannerSwiper').on('keydown', function (e) {
                switch (e.key) {
                    case 'ArrowLeft':
                        BasicBannerSwiper.slidePrev();
                        break;
                    case 'ArrowRight':
                        BasicBannerSwiper.slideNext();
                        break;
                }
            });

            $('.BasicBannerSwiper .swiper-slide').each(function () {
                var href = $(this).find('.paragraph__column>a').attr('href');
                if (href === undefined || href.length === 0) {
                    $(this).find('.paragraph__column>a').attr('href', 'javascript:void(0);');
                }
            });
        });
    });
    // Basic Banner
    if ($('.page-node-type-page').find('div.block-field-blocknodepagefield-basic-banner').length > 0) {
        $('.page-node-type-page .node__content > .layout--twocol-section--50-50:nth-child(2)').addClass('no-border');
    }
    //////去掉padding
    $(document).ready(function () {
        function isScreenSmall() {
            return window.matchMedia("(max-width: 991.98px)").matches;
        }

        if (isScreenSmall()) {
            var html_h1 = $('.page-node-type-programme .block-field-blocknodeprogrammetitle').html();
            var html_tag = $('.page-node-type-programme .block-field-blocknodeprogrammefield-programme-tags').html();
            var content = '<div class="mobileContent">';
            if (html_tag) {
                content += html_tag + ' ';
            }
            content += html_h1 + '</div>';
            $('.page-node-type-programme .node__content>.layout--twocol-section--50-50:nth-child(2)').prepend(content);
            $('.page-node-type-programme .block-field-blocknodeprogrammetitle').remove();
            $('.page-node-type-programme .block-field-blocknodeprogrammefield-programme-tags').remove();
        }
    });
    //替換search card內容
    $('.search-card').each(function () {
        // 選擇search-card下的content區域
        var $content = $(this).find('.content');

        // 儲存純文字內容
        var textContent = '';

        // 提取所有文字內容，忽略圖片和空白行
        $content.find('*').each(function () {
            var $this = $(this);

            // 如果是文字節點且有內容
            if ($this.contents().filter(function () {
                return this.nodeType === 3 && $.trim(this.nodeValue).length > 0;
            }).length > 0) {
                let text = $this.clone()    // 克隆元素
                    .children()             // 選擇所有子元素
                    .remove()              // 移除所有子元素
                    .end()                 // 回到原始元素
                    .text()                // 獲取文字內容
                    .trim();               // 移除前後空格

                if (text) {
                    textContent += text + '\n\n';
                }
            }
        });

        // 移除多餘的空行
        textContent = textContent.replace(/\n{3,}/g, '\n\n').trim();

        // 替換原有內容
        $content.html(textContent);
    });
    // video content type
    $(function () {
        var lang = document.documentElement.getAttribute('lang');
        var notes_document = $('.page-node-type-video .field--name-field-document-description');
        var notes_audio = $('.page-node-type-video .field--name-field-audio-description');
        if (notes_audio.length > 0) {
            var notes_audio_html = notes_audio.find('.field__item').html();
            var notes_audio_text = $.trim(notes_audio.find('.field__item>a').text());
            $('.page-node-type-video .notes_btns').prepend('<li class="audio-html">' + notes_audio_html + '</li>');
            $('.page-node-type-video .vtool_btns .audio-html a').attr({
                'aria-label': notes_audio_text,
                'title': notes_audio_text
            });
        }
        if (notes_document.length > 0) {
            var notes_document_html = notes_document.find('.field__item').html();
            var notes_document_text = $.trim(notes_document.find('.field__item>a').text());
            $('.page-node-type-video .notes_btns').prepend('<li class="document-html">' + notes_document_html + '</li>');
            $('.page-node-type-video .vtool_btns .document-html a').attr({
                'aria-label': notes_document_text,
                'title': notes_document_text
            });
        }
        if (notes_document.length === 0 && notes_audio.length === 0) {
            $(".page-node-type-video").find(".nl_videoTools .col-12>div:nth-child(2)").hide();
        }
        if (lang === 'zh-hant') {
            $('.page-node-type-video  .notes_title').text('演前簡介選擇：');
            $('.page-node-type-video  .videoTools-motif').text('如使用NVDA等讀屏軟件瀏覽此頁面，可使用「Tab」鍵移動至影片播放器。');
            $('.page-node-type-video .node__content .nl_videoTools>div>div>div:nth-child(3)>h3').text('聲道選擇：');
            $('.page-node-type-video .node__content .nl_videoTools>div>div>div:nth-child(4)>h3').text('字幕選擇：');

        } else if (lang === 'zh-hans') {
            $('.page-node-type-video  .notes_title').text('演前简介选择：');
            $('.page-node-type-video  .videoTools-motif').text('如使用NVDA等读屏软件浏览此页面，可使用「Tab」键移动至影片播放器。');
            $('.page-node-type-video .node__content .nl_videoTools>div>div>div:nth-child(3)>h3').text('声道选择：');
            $('.page-node-type-video .node__content .nl_videoTools>div>div>div:nth-child(4)>h3').text('字幕选择：');
        } else {
            $('.page-node-type-video  .notes_title').text('Select pre-show note：');
            $('.page-node-type-video  .videoTools-motif').text('If you use NVDA or some other screen reading software to browse this webpage, please use the "Tab" key to navigate to the video player.');
        }
    });
});
////////////////////////////////////////////////// AJAX
(function ($, Drupal) {
    // AJAX programme Filter
    var hasSwitchedAndInserted = false; // 全局变量，确保切换和插入逻辑只执行一次
    Drupal.behaviors.switchToUpcoming = {
        attach: function (context, settings) {
            // 監聽 "Filter" 按钮点击事件，重置標志
            $('.block-views-blockblock-programme-list-block-1 .form-submit').off('click.switchToUpcoming').on('click.switchToUpcoming', function () {
                // 调试信息：确认按钮点击事件绑定
                hasSwitchedAndInserted = false; // 每次点击过滤器时，重置标志
            });

            // 監聽 AJAX 完成事件
            $(document).ajaxComplete(function (event, xhr, settings) {
                // 只在没有切换过的情况下执行
                if (!hasSwitchedAndInserted) {
                    var selectedValue = $('.block-views-blockblock-programme-list-block-1 .form-item-field-date-state-target-id select').val();
                    // 檢查是否選中了 "Today's programme" (value="56")
                    if (selectedValue == '56') {
                        // 檢查結果是否為空 (是否出現 .view-empty)
                        if ($('.block-views-blockblock-programme-list-block-1 .view-empty').length > 0) {
                            // 切換到 "Upcoming" (value="57")
                            $('.block-views-blockblock-programme-list-block-1 .form-item-field-date-state-target-id select').val('57');
                            // 重新提交表單以觸發 AJAX 請求
                            $('.block-views-blockblock-programme-list-block-1 .form-submit').trigger('click');
                            // 記錄這次切換操作，並等待下一次 AJAX 完成後插入消息
                            hasSwitchedAndInserted = 'pending';
                            return; // 結束這次的 ajaxComplete，等待新的 AJAX 完成
                        }
                    }
                };
                // 已经切换过并且还没有插入消息
                if (hasSwitchedAndInserted === 'pending') {
                    var $viewContent = $('.block-views-blockblock-programme-list-block-1 .view-content');
                    // 插入自定義內容，如果內容區存在
                    if ($viewContent.length > 0) {
                        const lang = document.documentElement.getAttribute('lang');
                        if (lang === 'zh-hant') {
                            $viewContent.prepend('<div class="programme-content text-center"><p>請查看以下即將推出節目。</p></div>');
                        } else if (lang === 'zh-hans') {
                            $viewContent.prepend('<div class="programme-content text-center"><p>请查看以下即将推出节目。</p></div>');
                        } else {
                            $viewContent.prepend('<div class="programme-content text-center"><p>Please check out the upcoming programmes below.</p></div>');
                        }
                        // 标记操作完成，确保只插入一次
                        hasSwitchedAndInserted = true;
                    }
                };
            });
        }
    }
})(jQuery, Drupal);
