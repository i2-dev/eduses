jQuery(function ($) {
  $(document).ready(function () {

    ////////////////////////////////////////////// header fixed
    $(window).scroll(function () {
      if ($(window).scrollTop() > 110) { // 增加偏移量
        // 當滾動位置大於目標高度時，添加類
        $('body').addClass('scroll-fixed');
      } else {
        // 當滾動位置小於等於目標高度時，移除類
        $('body').removeClass('scroll-fixed');
      }
    });

    ////////////////////////////////////////////// 獲取當前年份
    $('#year_time').text(new Date().getFullYear());
    ////////////////////////////////////////////// homepage image carousel paragraphs
    $('.paragraph--type--image-carousel').each(function (i) {
      var outerElement = $(this);

      // 檢查是否已經處理過，避免重複執行
      if (outerElement.hasClass('carousel-processed')) {
        return;
      }
      var swiperContainer = $(`
                <div class="swiper imageCarouselSwiper">
                    <div class="swiper-wrapper">

                    </div>
                    <div class="swiper-button">
                      <div class="swiper-button-next imageCarouselSwiper-button-next-${i}"></div>
                      <div class="swiper-button-prev imageCarouselSwiper-button-prev-${i}"></div>
                      <div class="swiper-pagination imageCarouselSwiper-pagination-${i}"></div>
                    </div>
                </div>
            `);

      // Insert the container into DOM first
      outerElement.find('>.paragraph__column').after(swiperContainer);

      // 標記為已處理
      outerElement.addClass('carousel-processed');

      // Extract images from field__items and create swiper slides
      var desktopImages = outerElement.find('.field--name-field-image img');
      var mobileImages = outerElement.find('.field--name-field-moblie-image img');

      // 获取最大数量，确保所有图片都被处理
      var maxCount = Math.max(desktopImages.length, mobileImages.length);

      for (var j = 0; j < maxCount; j++) {
        var slide = $('<div class="swiper-slide"></div>');

        // 添加桌面图片（如果存在）
        if (j < desktopImages.length) {
          var desktopImg = $(desktopImages[j]);
          var desktopImgSrc = desktopImg.attr('src');
          var desktopImgAlt = desktopImg.attr('alt');
          var desktopImgWidth = desktopImg.attr('width');
          var desktopImgHeight = desktopImg.attr('height');

          var desktopImgElement = $(`
            <img src="${desktopImgSrc}" alt="${desktopImgAlt}" width="${desktopImgWidth}" height="${desktopImgHeight}" class="img-fluid desktop-image">
          `);
          slide.append(desktopImgElement);
        }

        // 添加手机图片（如果存在）
        if (j < mobileImages.length) {
          var mobileImg = $(mobileImages[j]);
          var mobileImgSrc = mobileImg.attr('src');
          var mobileImgAlt = mobileImg.attr('alt');
          var mobileImgWidth = mobileImg.attr('width');
          var mobileImgHeight = mobileImg.attr('height');

          var mobileImgElement = $(`
            <img src="${mobileImgSrc}" alt="${mobileImgAlt}" width="${mobileImgWidth}" height="${mobileImgHeight}" class="img-fluid mobile-image">
          `);
          slide.append(mobileImgElement);
        }

        // 将 slide 添加到 wrapper
        var wrapper = swiperContainer.find('.swiper-wrapper');
        wrapper.append(slide);
      }

      // Initialize Swiper
      var swiper = new Swiper(swiperContainer[0], {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: `.imageCarouselSwiper-pagination-${i}`,
          clickable: true,
        },
        navigation: {
          nextEl: `.imageCarouselSwiper-button-next-${i}`,
          prevEl: `.imageCarouselSwiper-button-prev-${i}`,
        },
      });
    });
    ////////////////////////////////////////////// homepage highlights paragraphs
    $('.paragraph--type--highlights').each(function (i) {
      var outerElement = $(this);

      // 檢查是否已經處理過，避免重複執行
      if (outerElement.hasClass('highlights-processed')) {
        return;
      }

      var highlightsContainer = $(`
              <section class="highlights-section">
                <div class="content">
                  <div class="left-content">
                    <h2>SES Highlights</h2>
                    <div class="swiper highlightsLeftSwiper">
                        <div class="swiper-wrapper">

                        </div>
                        <div class="swiper-button">
                          <div class="swiper-button-next highlightsLeftSwiper-button-next-${i}"></div>
                          <div class="swiper-button-prev highlightsLeftSwiper-button-prev-${i}"></div>
                          <div class="swiper-pagination highlightsLeftSwiper-pagination-${i}"></div>
                        </div>
                    </div>
                  </div>
                  <div class="right-content">
                    <div class="swiper highlightsRightSwiper">
                        <div class="swiper-wrapper">

                        </div>
                    </div>
                  </div>
                </div>
              </section>
            `);
      // Insert the container into DOM first
      outerElement.find('>.paragraph__column').after(highlightsContainer);

      // 標記為已處理
      outerElement.addClass('highlights-processed');
      outerElement.find('.paragraph--type--highlights-section').each(function () {
        var title = $(this).find('.field--name-field-title').text().trim();
        var content = $(this).find('.field--name-bp-text').html();
        var media = $(this).find('.field--name-field-media').html();
        // 如果 media 沒有值，就取 youtube 的內容
        if (!media || media.trim() === '') {
          media = $(this).find('.field--name-field-youtube').html();
        }
        // Create swiper slide with the image
        var Leftslide = $(`
                <div class="swiper-slide">
                  <h3>${title}</h3>
                  ${content}
                </div>
            `);
        var Rightslide = $(`
                <div class="swiper-slide">
                  ${media}
                </div>
            `);

        // Now we can find the swiper-wrapper since it's in the DOM
        var wrapperLeft = highlightsContainer.find('.highlightsLeftSwiper .swiper-wrapper');
        wrapperLeft.append(Leftslide);
        var wrapperRight = highlightsContainer.find('.highlightsRightSwiper .swiper-wrapper');
        wrapperRight.append(Rightslide);
      });
      // 先聲明變量
      var highlightsLeftswiper, highlightsRightSwiper;

      // Initialize left swiper
      highlightsLeftswiper = new Swiper(highlightsContainer.find('.highlightsLeftSwiper')[0], {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: `.highlightsLeftSwiper-pagination-${i}`,
          clickable: true,
        },
        navigation: {
          nextEl: `.highlightsLeftSwiper-button-next-${i}`,
          prevEl: `.highlightsLeftSwiper-button-prev-${i}`,
        },
        on: {
          slideChange: function () {
            if (highlightsRightSwiper) {
              highlightsRightSwiper.slideTo(this.activeIndex);
            }
          }
        }
      });

      // Initialize right swiper
      highlightsRightSwiper = new Swiper(highlightsContainer.find('.highlightsRightSwiper')[0], {
        loop: true,
        on: {
          slideChange: function () {
            if (highlightsLeftswiper) {
              highlightsLeftswiper.slideTo(this.activeIndex);
            }
          }
        }
      });
    });
    ////////////////////////////////////////////// homepage news events swiper
    var swiper = new Swiper(".HomepageNews-Swiper", {
      slidesPerView: 'auto',
      loop: true,
      spaceBetween: 30,
      pagination: {
        el: ".HomepageNewsSwiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".HomepageNews-button-next",
        prevEl: ".HomepageNews-button-prev",
      },
    });
    ////////////////////////////////////////////// homepage Admission Information
    $('.paragraph--type--button-text').each(function () {
      var url = $(this).find('.field--name-field-url').text().trim();
      var title = $(this).find('.field--name-field-title').text().trim();
      var time = $(this).find('.field--name-field-date time').text().trim();
      if (url) {
        $(this).html(`
          <a href="${url}" class="button-text">
            <span class="title">${title}</span>
            <span class="time">${time}</span>
          </a>
        `);
      } else {
        $(this).find('>.paragraph__column').addClass('button-text');
      }
    });
    ////////////////////////////////////////////// News && Events list
    $('.view-block-news-events-list.view-display-id-block_1 .js-form-item-field-tags-target-id select option:nth-child(1)').text('All Categories');

    // 提取年份數據，去重並排序
    function extractAndSortYears() {
      // 獲取所有 .field-content 元素中的文本內容
      var yearTexts = [];
      $('.view-data-news-events-year .field-content').each(function () {
        var text = $(this).text().trim();
        if (text && !isNaN(text)) {
          yearTexts.push(parseInt(text));
        }
      });
      // 去重並轉換為 Set
      var uniqueYears = [...new Set(yearTexts)];
      // 從大到小排序
      var sortedYears = uniqueYears.sort(function (a, b) {
        return b - a;
      });
      return sortedYears;
    };
    // 調用函數
    var yearArray = extractAndSortYears();
    $('.view-block-news-events-list.view-display-id-block_1 .js-form-item-field-years-value').before(`
        <div class="years-select js-form-item form-item js-form-type-select form-type-select js-form-item-field-years-target-id form-item-field-years-value" >
          <label for="edit-field-years-value">Year</label>
          <select data-drupal-selector="edit-field-years-value" name="field_years_value" class="form-select form-control" id="edit-field-years-value">

          </select>
        </div>
    `).html('');
    $('.years-select select').append(yearArray.map(function (year) {
      return `<option value="${year}">${year}</option>`;
    }));

    // 從URL參數中獲取初始年份值
    function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // 設置初始選中的年份
    var initialYear = getUrlParameter('field_years_value');
    if (initialYear && yearArray.includes(parseInt(initialYear))) {
      $('.years-select select').val(initialYear);
      console.log('Initial year set to:', initialYear);
      // 應用初始過濾
      filterNewsByYear(initialYear);
    } else {
      // 如果沒有URL參數，設置為第一個年份（最新的）
      $('.years-select select').val(yearArray[0]);
      // 應用初始過濾
      filterNewsByYear(yearArray[0]);
    }

    // 添加年份選擇事件處理器
    $('.years-select select').on('change', function () {
      var selectedYear = $(this).val();
      console.log('Selected year:', selectedYear);

      // 更新視覺上的活躍狀態
      $('.years-select select option').removeClass('active');
      $('.years-select select option[value="' + selectedYear + '"]').addClass('active');

      // 觸發過濾邏輯（如果需要）
      if (selectedYear) {
        // 這裡可以添加過濾新聞/事件的邏輯
        filterNewsByYear(selectedYear);
      }
    });

    // 過濾新聞/事件的函數
    function filterNewsByYear(year) {
      // 隱藏所有新聞項目
      $('.view-data-news-events-year .field-content').each(function () {
        var itemYear = $(this).text().trim();
        var newsItem = $(this).closest('.views-row, .node, .item');

        if (itemYear === year) {
          newsItem.show();
        } else {
          newsItem.hide();
        }
      });
    }

    // 全局變量保存用戶選擇
    var userSelectedYear = null;
    var userSelectedTag = null;

    ////////////////////////////////////////////// 自動提交表單功能
    function bindAutoSubmitEvents() {
      // Tags 過濾器自動提交
      $('.js-form-item-field-tags-target-id select').off('change.autoSubmit').on('change.autoSubmit', function() {
        console.log('Tags filter changed, triggering submit button');
        userSelectedTag = $(this).val(); // 保存用戶選擇
        var $form = $(this).closest('form');
        var $submitButton = $form.find('input[type="submit"], button[type="submit"]');
        if ($submitButton.length) {
          $submitButton.trigger('click');
        }
      });

      // Year 過濾器自動提交
      $('.js-form-item-field-years-target-id select, .years-select select').off('change.autoSubmit').on('change.autoSubmit', function() {
        console.log('Year filter changed, triggering submit button');
        userSelectedYear = $(this).val(); // 保存用戶選擇
        var $form = $(this).closest('form');
        var $submitButton = $form.find('input[type="submit"], button[type="submit"]');
        if ($submitButton.length) {
          $submitButton.trigger('click');
        }
      });
    }

    // 初始綁定事件
    bindAutoSubmitEvents();
    ////////////////////////////////////////////// Newsletter list
    $('.view-block-newsletter-list .newsletter-card').each(function () {
      $(this).find('.card-download .file--application-pdf a').text('Download').attr('target', '_blank');
    });







    $(document).ajaxComplete(function () {
      $('.view-block-newsletter-list.view-display-id-block_1 .js-form-item-field-tags-target-id select option:nth-child(1)').text('All Categories');
    });
    ////////////////////////////////////////////// 監聽 AJAX 完成事件
    $(document).ajaxComplete(function () {
      // News && Events list
      $('.view-block-news-events-list.view-display-id-block_1 .js-form-item-field-tags-target-id select option:nth-child(1)').text('All Categories');

      // 重新創建年份選擇器（如果被AJAX覆蓋了）
      if ($('.years-select').length === 0) {
        // 重新提取年份數據
        var yearArray = extractAndSortYears();
        $('.view-block-news-events-list.view-display-id-block_1 .js-form-item-field-years-value').before(`
            <div class="years-select js-form-item form-item js-form-type-select form-type-select js-form-item-field-years-target-id form-item-field-years-value" >
              <label for="edit-field-years-value">Year</label>
              <select data-drupal-selector="edit-field-years-value" name="field_years_value" class="form-select form-control" id="edit-field-years-value">

              </select>
            </div>
        `).html('');
        $('.years-select select').append(yearArray.map(function (year) {
          return `<option value="${year}">${year}</option>`;
        }));
      }

      // 設置選中的值 - 優先使用用戶選擇，然後是URL參數
      if (userSelectedYear && $('.years-select select option[value="' + userSelectedYear + '"]').length > 0) {
        $('.years-select select').val(userSelectedYear);
        // console.log('Restored user selected year:', userSelectedYear);
      } else if (userSelectedTag && $('.js-form-item-field-tags-target-id select option[value="' + userSelectedTag + '"]').length > 0) {
        $('.js-form-item-field-tags-target-id select').val(userSelectedTag);
        // console.log('Restored user selected tag:', userSelectedTag);
      } else {
        // 使用URL參數
        var initialYear = getUrlParameter('field_years_value');
        var initialTag = getUrlParameter('field_tags_target_id');

        if (initialYear && $('.years-select select option[value="' + initialYear + '"]').length > 0) {
          $('.years-select select').val(initialYear);
        }
        if (initialTag && $('.js-form-item-field-tags-target-id select option[value="' + initialTag + '"]').length > 0) {
          $('.js-form-item-field-tags-target-id select').val(initialTag);
        }
      }

      // 重新綁定自動提交事件（AJAX更新後）
      bindAutoSubmitEvents();
    });


  });
});
