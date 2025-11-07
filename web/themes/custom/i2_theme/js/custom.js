// 全局 Google Maps 初始化函數
function initGoogleMap() {
  // 檢查是否存在地圖容器
  var mapElement = document.getElementById("googleMap");
  if (!mapElement) {
    // console.log("Google Map container not found");
    return;
  }

  // 檢查 Google Maps API 是否已載入
  if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
    // console.log("Google Maps API not loaded");
    return;
  }

  const myLatLng = { lat: 22.4694561, lng: 114.1893823 };
  var mapProp = {
    center: myLatLng,
    zoom: 16,
  };

  try {
    var map = new google.maps.Map(mapElement, mapProp);
    new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: "General Office",
    });
    // console.log("Google Map initialized successfully");
  } catch (error) {
    console.error("Error initializing Google Map:", error);
  }
}

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
    ////////////////////////////////////////////// back to top
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
    ////////////////////////////////////////////// menu url add target="_blank"
    function isExternalUrl(href) {
      try {
        var url = new URL(href, window.location.origin);
        return url.origin !== window.location.origin;
      } catch (e) {
        return false;
      }
    }

    function setExternalLinkTargets() {
      $('#block-i2-theme-main-navigation, #block-i2-theme-mainnavigation, footer')
        .find('a.nav-link, a.dropdown-item, a.nav-mega-title-link')
        .each(function () {
          var $a = $(this);
          var href = $a.attr('href');
          if (href && isExternalUrl(href)) {
            $a.attr('target', '_blank');
            // 安全性：為新開視窗的外部連結添加 rel
            if (!$a.attr('rel')) {
              $a.attr('rel', 'noopener');
            }
          }
        });
    }

    // 初始設置（在 mega 菜單構建之前先執行一次）
    setExternalLinkTargets();
    ////////////////////////////////////////////// header special menu
    $('footer .navbar-nav.nav-level-0>li.nav-item').each(function () {
      var $li = $(this);
      if ($li.find('>a.nav-link').text().trim() === $('.about-ses-dropdown>button.dropdown-toggle').text().trim()) {
        var ul_menu = $li.find('>ul.dropdown-menu').html();
        $('.about-ses-dropdown .dropdown-menu ul').html(ul_menu);
      } else if ($li.find('>a.nav-link').text().trim() === $('.people-dropdown>button.dropdown-toggle').text().trim()) {
        var ul_menu = $li.find('>ul.dropdown-menu').html();
        $('.people-dropdown .dropdown-menu ul').html(ul_menu);
      } else if ($li.find('>a.nav-link').text().trim() === $('.news-dropdown>button.dropdown-toggle').text().trim()) {
        var ul_menu = $li.find('>ul.dropdown-menu').html();
        $('.news-dropdown .dropdown-menu ul').html(ul_menu);
      } else { }
    });
    ////////////////////////////////////////////// header menu
    $('#block-i2-theme-main-navigation > ul.navbar-nav > li.nav-item.dropdown').each(function () {
      var $li = $(this);
      if ($li.hasClass('nav-item-processed')) {
        return;
      }
      var $toggle = $li.children('a.nav-link.dropdown-toggle');
      var $ul = $li.children('ul.dropdown-menu.nav-level-1');
      if ($toggle.length === 0 || $ul.length === 0) {
        $li.addClass('nav-item-processed');
        return;
      }

      // 構建新的包裹結構：
      var titleText = $toggle.text().trim();
      var $wrapper = $('<div class="nav-mega"></div>');
      var $titleDiv = $('<div class="nav-mega-title"></div>');
      var $titleLink = $('<a class="nav-mega-title-link"></a>')
        .attr('href', $toggle.attr('href') || '#')
        .attr('title', $toggle.attr('title') || titleText)
        .text(titleText);
      if ($toggle.attr('target')) { $titleLink.attr('target', $toggle.attr('target')); }
      if ($toggle.attr('rel')) { $titleLink.attr('rel', $toggle.attr('rel')); }
      $titleDiv.append($titleLink);
      var $bodyDiv = $('<div class="nav-mega-body"></div>');

      // 克隆原有的 ul 內容到新容器內，原結構保持不變
      var $ulClone = $ul.clone(true, true);
      $bodyDiv.append($ulClone);
      $wrapper.append($titleDiv).append($bodyDiv);

      // 將新的 dropdown-menu 插入到原 ul 之前，讓 Bootstrap 使用新的容器
      $ul.before($wrapper);

      $li.addClass('nav-item-processed');
      // 構建完成後，確保克隆出的連結也正確設置 target
      setExternalLinkTargets();
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
                    <div class="swiper-wrapper"></div>
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
                      <div class="left-sub-content">
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

      // Function to pause all videos in a container
      function pauseAllVideos(container) {
        // Pause HTML5 videos
        container.find('video').each(function () {
          this.pause();
        });

        // Force stop YouTube videos by reloading iframe
        container.find('iframe[src*="youtube.com"], iframe[src*="youtu.be"]').each(function () {
          var iframe = this;
          var src = iframe.src;

          // First try postMessage
          try {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
          } catch (e) {
            // If postMessage fails, force reload iframe
            iframe.src = '';
            setTimeout(function () {
              iframe.src = src;
            }, 50);
          }

          // Force reload iframe to completely stop YouTube video
          setTimeout(function () {
            iframe.src = '';
            setTimeout(function () {
              iframe.src = src;
            }, 100);
          }, 100);
        });
      }

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
            // Pause all videos when left swiper changes
            pauseAllVideos(highlightsContainer.find('.highlightsRightSwiper'));
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
            // Pause all videos when right swiper changes
            pauseAllVideos(highlightsContainer.find('.highlightsRightSwiper'));
          }
        }
      });

      // 添加狀態變量來追蹤輪播狀態
      var isAutoplayPaused = false;

      // 添加點擊事件來切換輪播狀態
      highlightsContainer.find('.highlightsRightSwiper').on('click', function () {
        if (isAutoplayPaused) {
          // 如果已暫停，則恢復輪播
          if (highlightsLeftswiper && highlightsLeftswiper.autoplay) {
            highlightsLeftswiper.autoplay.start();
          }
          isAutoplayPaused = false;
        } else {
          // 如果正在輪播，則停止
          if (highlightsLeftswiper && highlightsLeftswiper.autoplay) {
            highlightsLeftswiper.autoplay.stop();
          }
          isAutoplayPaused = true;
        }
      });

      // 添加手動操作後恢復輪播的事件監聽器
      // 觸摸/滑動事件
      highlightsContainer.find('.highlightsLeftSwiper').on('touchstart touchmove touchend', function () {
        if (isAutoplayPaused && highlightsLeftswiper && highlightsLeftswiper.autoplay) {
          highlightsLeftswiper.autoplay.start();
          isAutoplayPaused = false;
        }
      });

      // 按鈕點擊事件
      highlightsContainer.find('.highlightsLeftSwiper .swiper-button-next, .highlightsLeftSwiper .swiper-button-prev').on('click', function () {
        if (isAutoplayPaused && highlightsLeftswiper && highlightsLeftswiper.autoplay) {
          highlightsLeftswiper.autoplay.start();
          isAutoplayPaused = false;
        }
      });

      // 分頁點擊事件
      highlightsContainer.find('.highlightsLeftSwiper .swiper-pagination-bullet').on('click', function () {
        if (isAutoplayPaused && highlightsLeftswiper && highlightsLeftswiper.autoplay) {
          highlightsLeftswiper.autoplay.start();
          isAutoplayPaused = false;
        }
      });

    });
    ////////////////////////////////////////////// homepage news events swiper
    var swiper = new Swiper(".HomepageNews-Swiper", {
      slidesPerView: 'auto',
      loop: true,
      spaceBetween: 27,
      // pagination: {
      //   el: ".HomepageNewsSwiper-pagination",
      //   clickable: true,
      // },
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
    $('.new-list-card').each(function () {
      var $cardDate = $(this).find('.card-date');
      var dateText = $cardDate.text().trim();

      // 处理日期字符串，拆分成span元素
      if (dateText) {
        // 检查是否包含 "-" 分隔符
        if (dateText.includes(' - ')) {
          // 如果有两个日期，拆分成两个span
          var dates = dateText.split(' - ');
          var date1 = dates[0].trim();
          var date2 = dates[1].trim();

          // 检查两个日期是否相同
          if (date1 === date2) {
            // 如果两个日期相同，只显示一个日期
            $cardDate.html('<span class="date-item">' + date1 + '</span>');
          } else {
            // 如果两个日期不同，显示两个日期
            var newHtml = '';
            dates.forEach(function (date, index) {
              newHtml += '<span class="date-item">' + date.trim() + '</span>';
              if (index < dates.length - 1) {
                newHtml += ' <span class="date-separator">-</span> ';
              }
            });
            $cardDate.html(newHtml);
          }
        } else {
          // 如果只有一个日期，包装在一个span中
          $cardDate.html('<span class="date-item">' + dateText + '</span>');
        }
      }
    });

    // 处理 .page-node-type-news-events .field--name-field-date 的日期格式
    $('.page-node-type-news-events .field--name-field-date').each(function () {
      var $fieldDate = $(this);
      var dateText = $fieldDate.text().trim();

      // 处理日期字符串，拆分成span元素
      if (dateText) {
        // 检查是否包含 "-" 分隔符
        if (dateText.includes(' - ')) {
          // 如果有两个日期，拆分成两个span
          var dates = dateText.split(' - ');
          var date1 = dates[0].trim();
          var date2 = dates[1].trim();

          // 检查两个日期是否相同
          if (date1 === date2) {
            // 如果两个日期相同，只显示一个日期
            $fieldDate.html('<span class="date-item">' + date1 + '</span>');
          } else {
            // 如果两个日期不同，显示两个日期
            var newHtml = '';
            dates.forEach(function (date, index) {
              newHtml += '<span class="date-item">' + date.trim() + '</span>';
              if (index < dates.length - 1) {
                newHtml += ' <span class="date-separator">-</span> ';
              }
            });
            $fieldDate.html(newHtml);
          }
        } else {
          // 如果只有一个日期，包装在一个span中
          $fieldDate.html('<span class="date-item">' + dateText + '</span>');
        }
      }
    });

    // 提取年份數據，去重並排序
    function extractAndSortYears() {
      // 獲取所有 .field-content 元素中的文本內容
      var yearTexts = [];
      $('.block-views-blockdata-news-events-year-block-1 .view-data-news-events-year .field-content').each(function () {
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
    $('.block-views-blockblock-news-events-list-block-1 .js-form-item-field-date-value').before(`
        <div class="years-select js-form-item form-item js-form-type-select form-type-select js-form-item-field-date-target-id form-item-field-date-value" >
          <select data-drupal-selector="edit-field-date-value" name="field_date_value" class="form-select form-control" id="edit-field-date-value">

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
      // console.log('Initial year set to:', initialYear);
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
      // console.log('Selected year:', selectedYear);

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
      $('.js-form-item-field-tags-target-id select').off('change.autoSubmit').on('change.autoSubmit', function () {
        userSelectedTag = $(this).val(); // 保存用戶選擇
        var $form = $(this).closest('form');
        var $submitButton = $form.find('input[type="submit"], button[type="submit"]');
        if ($submitButton.length) {
          $submitButton.trigger('click');
        }
      });

      // Year 過濾器自動提交
      $('.js-form-item-field-years-target-id select, .years-select select').off('change.autoSubmit').on('change.autoSubmit', function () {
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
    // news-events image url
    $('.page-node-type-news-events').each(function () {
      if ($(this).find('.block-field-blocknodenews-eventsfield-image-url').length > 0) {
        var imageUrl = $(this).find('.block-field-blocknodenews-eventsfield-image-url .field--name-field-image-url').text().trim();
        if (imageUrl) {
          $(this).find('.block-field-blocknodenews-eventsfield-image-url').html(`
            <div class="block block-layout-builder block-field-blocknodenews-eventsfield-images" >
              <div class="field field--name-field-images field--type-entity-reference field--label-hidden field__items">
                  <div class="field__item" >
                    <img loading="lazy" src="${imageUrl}"  class="img-fluid">
                  </div>
              </div>
            </div>
          `);
        }
      }
    });
    ////////////////////////////////////////////// Newsletter list
    $('.view-block-newsletter-list .newsletter-card').each(function () {
      $(this).find('.card-download .file--application-pdf a').text('Download').attr('target', '_blank');
    });
    ////////////////////////////////////////////// People list
    $('.people-detail-right .people-detail-sdgs-icon').each(function () {
      var $sdgsIcon = $(this);
      var sdgsNumbers = $sdgsIcon.text().trim();

      // 如果沒有數字，直接返回
      if (!sdgsNumbers) {
        return;
      }

      // 將數字字符串分割成數組，並去除空格
      var numbers = sdgsNumbers.split(',').map(function (num) {
        return num.trim();
      });

      // 創建 ul 容器
      var $ul = $('<ul class="sdgs-icons-list"></ul>');

      // 遍歷每個數字
      numbers.forEach(function (number) {
        // 在 SDGs 視圖中查找對應的 tid
        var $matchingRow = $('.view-data-taxonomy-sdgs .views-row').filter(function () {
          var tid = $(this).find('.views-field-tid .field-content').text().trim();
          return tid === number;
        });

        // 如果找到匹配的行，獲取對應的圖片
        if ($matchingRow.length > 0) {
          var $img = $matchingRow.find('.views-field-field-icon img').clone();
          if ($img.length > 0) {
            // 創建 li 元素並添加圖片
            var $li = $('<li class="sdgs-icon-item"></li>');
            $li.append($img);
            $ul.append($li);
          }
        }
      });

      // 如果創建了圖標列表，替換原來的文本內容
      if ($ul.find('li').length > 0) {
        $sdgsIcon.html($ul);
      }
    });
    $('.cardModal').click(function () {
      $('#edusesModal').find('.modal-body').html($(this).find('.card-data').html());
      $('#edusesModal').modal('show');
    });

    // 關閉 modal 時清空 modal-body 內容
    $('#edusesModal').on('hidden.bs.modal', function () {
      $(this).find('.modal-body').empty();
    });

    // 檢查 URL hash 並自動顯示對應的 modal
    function checkUrlHashAndShowModal() {
      var hash = window.location.hash;
      if (hash && hash.startsWith('#')) {
        var id = hash.substring(1); // 移除 # 符號
        var $matchingCard = $('.cardModal[data-id="' + id + '"]');

        if ($matchingCard.length > 0) {
          // 找到匹配的卡片，顯示 modal
          $('#edusesModal').find('.modal-body').html($matchingCard.find('.card-data').html());
          $('#edusesModal').modal('show');
        }
      }
    }

    // 頁面載入時檢查 URL hash
    checkUrlHashAndShowModal();

    // 監聽 hash 變化
    $(window).on('hashchange', function () {
      checkUrlHashAndShowModal();
    });

    // People page: clicking .people-staff-section items expands corresponding section
    (function bindPeopleStaffSectionNavigation() {
      var $nav = $('.people-staff-section');
      if ($nav.length === 0) return;

      $nav.off('click.peopleNav', 'a').on('click.peopleNav', 'a', function (e) {
        var $a = $(this);
        var title = $a.text().trim();
        if (!title) return;

        // Find the matching view header by heading text (more reliable than id, avoids duplicate ids)
        var $header = $('.view.view-block-people-list .view-header h2').filter(function () {
          return $(this).text().trim() === title;
        }).first().closest('.view-header');

        if ($header.length === 0) return;

        // Expand the associated collapse
        var targetSelector = $header.attr('data-bs-target');
        if (!targetSelector) return;
        var $collapse = $(targetSelector);
        if ($collapse.length === 0) return;

        try {
          if (typeof bootstrap !== 'undefined' && bootstrap.Collapse && typeof bootstrap.Collapse.getOrCreateInstance === 'function') {
            var instance = bootstrap.Collapse.getOrCreateInstance($collapse[0], { toggle: false });
            instance.show();
          } else if (typeof $collapse.collapse === 'function') {
            $collapse.collapse('show');
          } else {
            $collapse.addClass('show');
            $header.attr('aria-expanded', 'true');
          }
        } catch (err) {
          // Fallback to adding classes if Bootstrap API call fails
          $collapse.addClass('show');
          $header.attr('aria-expanded', 'true');
        }

        // Smooth scroll to the header
        $('html, body').animate({ scrollTop: Math.max(0, $header.offset().top - 180) }, 300);

        // Prevent default to avoid jumping to duplicate/incorrect anchors
        e.preventDefault();
      });
    })();

    // Auto-open and scroll to people section when arriving with a hash (e.g. #Advisor)
    (function autoOpenPeopleSectionFromHash() {
      var $nav = $('.people-staff-section');
      var $peopleHeaders = $('.view.view-block-people-list .view-header');
      if ($peopleHeaders.length === 0) return;

      function openByHeader($header) {
        if ($header.length === 0) return;
        var targetSelector = $header.attr('data-bs-target');
        if (!targetSelector) return;
        var $collapse = $(targetSelector);
        if ($collapse.length === 0) return;
        try {
          if (typeof bootstrap !== 'undefined' && bootstrap.Collapse && typeof bootstrap.Collapse.getOrCreateInstance === 'function') {
            var instance = bootstrap.Collapse.getOrCreateInstance($collapse[0], { toggle: false });
            instance.show();
          } else if (typeof $collapse.collapse === 'function') {
            $collapse.collapse('show');
          } else {
            $collapse.addClass('show');
            $header.attr('aria-expanded', 'true');
          }
        } catch (err) {
          $collapse.addClass('show');
          $header.attr('aria-expanded', 'true');
        }
        $('html, body').animate({ scrollTop: Math.max(0, $header.offset().top - 100) }, 300);
      }

      function handleHash(rawHash) {
        if (!rawHash) return;
        var id = decodeURIComponent(rawHash.replace(/^#/, ''));
        if (!id) return;

        // 1) Try: find matching nav link by hash and reuse click logic
        if ($nav.length) {
          var $link = $nav.find('a').filter(function () {
            var href = (this.getAttribute('href') || '').trim();
            return href.endsWith('#' + id) || this.hash === ('#' + id);
          }).first();
          if ($link.length) {
            $link.trigger('click');
            return;
          }
        }

        // 2) Try: match header h2 id directly
        var $headerById = $peopleHeaders.find('h2#' + CSS.escape(id)).first().closest('.view-header');
        if ($headerById.length) {
          openByHeader($headerById);
          return;
        }

        // 3) Fallback: match header text (handles cases where hash equals title)
        var $headerByText = $peopleHeaders.find('h2').filter(function () {
          return $(this).text().trim() === id;
        }).first().closest('.view-header');
        if ($headerByText.length) {
          openByHeader($headerByText);
        }
      }

      // Initial on page load
      handleHash(window.location.hash || '');

      // Respond to in-page hash changes
      $(window).on('hashchange', function () {
        handleHash(window.location.hash || '');
      });
    })();

    ////////////////////////////////////////////// Introduction page
    //Learning and Teaching
    setTimeout(function () {
      $('.IntroductionProgrammes').each(function () {
        var title = $(this).find('>.paragraph>.paragraph__column>h2').text().trim();
        $(this).find('>.paragraph>.paragraph__column>h2').hide();
        if (title) {
          $(this).find('>.paragraph>.paragraph__column>nav').prepend('<h2>' + title + '</h2>');
        }
      });
    }, 200);
    //About SES
    $('.paragraph--type--ranked-item').each(function () {
      var number = $(this).find('.field--name-field-number').text().trim();
      var unit = $(this).find('.field--name-field-unit').text().trim();
      var ranking_text = $(this).find('.field--name-field-about-ranking').html();
      var new_content = `
        <div class="stat-item">
            <div class="counter" data-count="${number}">0</div>
            <div class="counter-plus">${unit}</div>
            <div class="stat-description">${ranking_text}</div>
        </div>
      `;
      $(this).html(new_content);
    });
    // 純 JavaScript 動畫函數
    function animateCounter(element, start, end, duration) {
      const range = end - start;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 使用 easeOutCubic 緩動函數
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(start + (range * easeOutCubic));

        element.textContent = currentValue.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
    }

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.counter');

          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            if (!isNaN(target)) {
              animateCounter(counter, 0, target, 2500);
            }
          });

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    });

    // 延遲執行以確保 DOM 元素已創建
    setTimeout(function () {
      // 觀察所有包含計數器的容器
      const counterContainers = document.querySelectorAll('.paragraph--type--ranked-item');
      counterContainers.forEach(container => {
        observer.observe(container);
      });
    }, 100);

    ////////////////////////////////////////////// contact-us page
    // 載入 Google Maps API
    function loadGoogleMapsAPI() {
      // 檢查是否已經載入
      if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        initGoogleMap();
        return;
      }

      // 檢查是否已經有腳本標籤
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        return;
      }

      var script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDFb7pxsOp-yrPwdr973Ezo3RWlqNimX4M&callback=initGoogleMap";
      script.async = true;
      script.defer = true;
      script.onerror = function () {
        console.error("Failed to load Google Maps API");
      };

      document.head.appendChild(script);
    }

    // 當頁面載入完成後載入地圖
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadGoogleMapsAPI);
    } else {
      loadGoogleMapsAPI();
    }
    ////////////////////////////////////////////// Knowledge Transfer page
    $('.paragraph--type--common-button').each(function () {
      var color_type = $(this).find('.field--name-field-common-button-type').text().trim();
      if (color_type) {
        $(this).addClass('button-' + color_type);
      }
    });

    ////////////////////////////////////////////// News & Events page
    $('.page-node-type-news-events').each(function () {
      // 判斷圖片元素不存在的情況
      if ($(this).find('.block-field-blocknodenews-eventsfield-images img').length === 0 && $(this).find('.block-field-blocknodenews-eventsfield-default-images').length > 0) {
        var default_image = $(this).find('.block-field-blocknodenews-eventsfield-default-images .field--name-field-default-images').text().trim();
        $(this).find('.block-field-blocknodenews-eventsfield-default-images').html(`
            <img src="${'/themes/custom/i2_theme/image/default/' + default_image + '.jpg'}" alt="">
          `).show();
      }
    });
    ////////////////////////////////////////////// laboratories page
    // VR Image Viewer
    function initVRViewer() {
      // 檢查 PhotoSphereViewer 是否可用
      if (typeof PhotoSphereViewer === 'undefined') {
        console.warn('PhotoSphereViewer is not loaded');
        return;
      }

      // 查找所有包含 VR 圖片的容器
      $('.field--name-field-vr-image').each(function () {
        var $container = $(this);
        var $img = $container.find('img');

        if ($img.length === 0) return;

        var imgSrc = $img.attr('src');
        var imgAlt = $img.attr('alt') || 'VR Image';

        // 檢查是否已經處理過
        if ($container.hasClass('vr-processed')) return;
        $container.addClass('vr-processed');

        // 創建 VR 查看器容器
        var viewerId = 'vr-viewer-' + Math.random().toString(36).substr(2, 9);
        var $viewerContainer = $(`
          <div class="vr-viewer-container">
            <div id="${viewerId}" class="vr-viewer" style="width: 100%; height: 450px;"></div>
          </div>
        `);

        // 替換原圖片
        $container.html($viewerContainer);

        var viewer = null;
        var isViewerInitialized = false;

        // 直接初始化 PhotoSphereViewer
        function initializeViewer() {
          if (isViewerInitialized) return;

          try {
            // 檢查插件是否可用
            var plugins = [];
            if (typeof PhotoSphereViewer.GalleryPlugin !== 'undefined') {
              plugins.push(PhotoSphereViewer.GalleryPlugin);
            }
            if (typeof PhotoSphereViewer.MarkersPlugin !== 'undefined') {
              plugins.push(PhotoSphereViewer.MarkersPlugin);
            }

            var viewerConfig = {
              container: document.getElementById(viewerId),
              panorama: imgSrc,
              navbar: ['autorotate', 'zoom', 'move', 'fullscreen'],
              defaultZoomLvl: 0,
              minFov: 30,
              maxFov: 90,
              sphereCorrection: { pan: 0, tilt: 0, roll: 0 },
              caption: imgAlt
            };

            // 只有在插件可用時才添加
            if (plugins.length > 0) {
              viewerConfig.plugins = plugins;
            }

            viewer = new PhotoSphereViewer.Viewer(viewerConfig);
            isViewerInitialized = true;

            // 使用 v5 的事件監聽器
            viewer.addEventListener('ready', function () {
              console.log('VR Viewer ready');
              // 延遲啟動自動旋轉
              setTimeout(function () {
                if (viewer && typeof viewer.toggleAutorotate === 'function') {
                  console.log('Starting autorotate...');
                  viewer.toggleAutorotate();
                  console.log('Autorotate toggled');
                } else {
                  console.log('toggleAutorotate method not available');
                }
              }, 2000);
            });

            // 強制調整查看器大小
            setTimeout(function () {
              if (viewer) {
                viewer.autoSize();
                // 確保容器有正確的高度
                var $container = $('#' + viewerId);
                $container.css('height', '450px');
                viewer.autoSize();

                // 監聽窗口大小變化
                $(window).on('resize.vr-viewer-' + viewerId, function () {
                  if (viewer) {
                    setTimeout(function () {
                      viewer.autoSize();
                    }, 100);
                  }
                });
              }
            }, 200);
          } catch (error) {
            console.error('Failed to initialize VR Viewer:', error);
            $viewerContainer.find('.vr-close-btn').text('初始化失敗').prop('disabled', true);
          }
        }

        // 延遲初始化查看器，確保容器已正確渲染
        setTimeout(function () {
          initializeViewer();
        }, 100);
      });
    }

    // 初始化 VR 查看器
    if ($('body').hasClass('page-node-56')) {
      initVRViewer();
    }
    ////////////////////////////////////////////// Research page
    const researchPageMapping = {
      'page-node-39': 1,
      'page-node-40': 2,
      'page-node-41': 3,
      'page-node-43': 4,
      'page-node-44': 5,
      'page-node-45': 6,
      'page-node-46': 7
    };

    // 查找匹配的頁面類別並設置對應的選項為活動狀態
    for (const pageClass in researchPageMapping) {
      if ($('body').hasClass(pageClass)) {
        $('.research-choose>li:nth-child(' + researchPageMapping[pageClass] + ')').addClass('active');
        break; // 找到匹配項後跳出循環
      }
    }
    // Research Projects Search Functionality
    function performResearchSearch(searchValue) {
      console.log('Search function called with:', searchValue);

      if (!searchValue || searchValue.trim() === '') {
        // If search is empty, show all rows and all paragraphs
        $('.view-block-research-project-list .views-row').show();
        $('.view-block-research-project-list .paragraph--type--research-project-section').show();
        // console.log('Empty search - showing all content');
        return;
      }

      var searchTerm = searchValue.toLowerCase().trim();
      var hasResults = false;

      console.log('Searching for term:', searchTerm);
      console.log('Found rows:', $('.view-block-research-project-list .views-row').length);

      $('.view-block-research-project-list .views-row').each(function () {
        var $row = $(this);
        var rowHasMatch = false;


        // Search in Chief Investigator name (views-field-title) - CORRECT SELECTOR
        var chiefInvestigator = $row.find('.views-field-title span.field-content').text().toLowerCase();
        // console.log('Chief Investigator:', chiefInvestigator);

        // Check if Chief Investigator matches
        if (chiefInvestigator.includes(searchTerm)) {
          rowHasMatch = true;
          // console.log('Chief Investigator match found');
          // If Chief Investigator matches, show ALL paragraphs in this row
          $row.find('.paragraph--type--research-project-section').show();
          // console.log('All paragraphs shown for Chief Investigator match');
        } else {
          // If Chief Investigator doesn't match, check each paragraph individually
          $row.find('.paragraph--type--research-project-section').each(function () {
            var $paragraph = $(this);
            var paragraphMatches = false;

            // Search in Project Title - DIRECT SELECTOR
            var projectTitle = $paragraph.find('.field--name-field-project-title').text().toLowerCase();
            console.log('Project Title:', projectTitle);
            if (projectTitle.includes(searchTerm)) {
              paragraphMatches = true;
              rowHasMatch = true;
              // console.log('Project Title match found');
            }

            // Search in Description - DIRECT SELECTOR
            var description = $paragraph.find('.field--name-field-description').text().toLowerCase();
            // console.log('Description:', description);
            if (description.includes(searchTerm)) {
              paragraphMatches = true;
              rowHasMatch = true;
              // console.log('Description match found');
            }

            // Show or hide this specific paragraph
            if (paragraphMatches) {
              $paragraph.show();
              // console.log('Paragraph shown');
            } else {
              $paragraph.hide();
              // console.log('Paragraph hidden');
            }
          });
        }

        // Show or hide the entire row based on whether any content matches
        if (rowHasMatch) {
          $row.show();
          hasResults = true;
          // console.log('Row shown');
        } else {
          $row.hide();
          // console.log('Row hidden');
        }
      });

      // Optional: Show "No results found" message if needed
      if (!hasResults) {
        // console.log('No research projects found matching: ' + searchValue);
      } else {
        // console.log('Search completed with results');
      }
    }

    // Research Projects Search Event Handlers
    $('#research-searching').on('input keyup', function () {
      var searchValue = $(this).val();
      performResearchSearch(searchValue);
    });

    $('#research-searching').on('keypress', function (e) {
      // Check if Enter key is pressed
      if (e.which === 13 || e.keyCode === 13) {
        e.preventDefault(); // Prevent default form submission
        var searchValue = $(this).val();
        performResearchSearch(searchValue);
      }
    });

    // Also listen for form submission (in case there's a search button)
    $('#research-searching').closest('form').on('submit', function (e) {
      e.preventDefault(); // Prevent default form submission
      var searchValue = $('#research-searching').val();
      performResearchSearch(searchValue);
    });

    ////////////////////////////////////////////// programmes
    // 優化後的 programmes 處理邏輯
    function initializeProgrammes() {
      // 選擇器配置
      const SELECTORS = {
        admissionTel: '.field--name-field-admissions-tel',
        admissionEnquiry: '.field--name-field-admissions-enquriy',
        programmeTel: '.field--name-field-programme-tel',
        programmeEmail: '.field--name-field-programme-email',
        programmeLeader: '.field--name-field-programme-leader',
        leaflet: '.field--name-field-leafet',
        programmeCodeAims: '.block-field-blocknodeprogrammesfield-programme-code-aims-body>div',
        programmeStructure: '.block-field-blocknodeprogrammesfield-programme-structure-curric>div',
        programmeMedium: '.block-field-blocknodeprogrammesfield-medium-of-instructions-bod>div',
        programmeTuition: '.block-field-blocknodeprogrammesfield-tuition-fee-scholarship-bo>div',
        programmeOutlines: '.block-field-blocknodeprogrammesfield-course-outlines-body>div',
        programmeCareer: '.block-field-blocknodeprogrammesfield-student-corner-body>div',
        programmeEnquiries: '.block-field-blocknodeprogrammesfield-programme-enquiries-body>div',
        admissionsBlock: '.block-field-blocknodeprogrammesfield-admissions-tel',
        programmeBlock: '.block-field-blocknodeprogrammesfield-programme-tel'
      };

      // 標籤頁配置
      const TAB_BODIES = [
        '#programme-tab-body-1',
        '#programme-tab-body-2',
        '#programme-tab-body-3',
        '#programme-tab-body-4',
        '#programme-tab-body-5',
        '#programme-tab-body-6',
        '#programme-tab-body-7'
      ];

      $('.page-node-type-programmes').each(function () {
        const $container = $(this);

        // 批量獲取所有需要的數據，減少 DOM 查詢
        const data = extractProgrammeData($container, SELECTORS);

        // 生成 HTML 模板
        const admissionsHtml = generateAdmissionsHtml(data.admissionTel, data.admissionEnquiry);
        const programmeHtml = generateProgrammeHtml(data.programmeTel, data.programmeEmail, data.programmeLeader);

        // 處理 leaflet 下載鏈接
        if (data.leaflet) {
          $container.find(SELECTORS.leaflet).html(`<a href="${data.leaflet}" target="_blank">Download Leaflet</a>`);
        }

        // 插入新的 HTML 並移除舊元素
        insertAndCleanup($container, admissionsHtml, programmeHtml, SELECTORS);

        // 更新標籤頁內容
        updateTabContents($container, data.tabContents, TAB_BODIES);
      });
    }

    // 提取程式數據的輔助函數
    function extractProgrammeData($container, selectors) {
      const getText = (selector) => $container.find(selector).text().trim();
      const getHtml = (selector) => $container.find(selector).html() || '';

      return {
        admissionTel: getText(selectors.admissionTel),
        admissionEnquiry: getHtml(selectors.admissionEnquiry),
        programmeTel: getText(selectors.programmeTel),
        programmeEmail: getHtml(selectors.programmeEmail),
        programmeLeader: getText(selectors.programmeLeader),
        leaflet: getText(selectors.leaflet),
        tabContents: [
          getHtml(selectors.programmeCodeAims),
          getHtml(selectors.programmeStructure),
          getHtml(selectors.programmeMedium),
          getHtml(selectors.programmeTuition),
          getHtml(selectors.programmeOutlines),
          getHtml(selectors.programmeCareer),
          getHtml(selectors.programmeEnquiries)
        ]
      };
    }

    // 生成招生 HTML
    function generateAdmissionsHtml(tel, enquiry) {
      return `
        <div class="admission-html">
          <div class="admission-tel">${tel}</div>
          <div class="admission-enquriy">${enquiry}</div>
        </div>
      `;
    }

    // 生成課程 HTML
    function generateProgrammeHtml(tel, email, leader) {
      var leaderHtml = leader ? `<div class="programme-leader">${leader}</div>` : '';
      return `
        <div class="programme-html">
          ${leaderHtml}
          <div class="programme-tel">${tel}</div>
          <div class="programme-email">${email}</div>
        </div>
      `;
    }

    // 插入新 HTML 並清理舊元素
    function insertAndCleanup($container, admissionsHtml, programmeHtml, selectors) {
      // 插入新內容
      $container.find(selectors.admissionsBlock).before(admissionsHtml);
      $container.find(selectors.programmeBlock).before(programmeHtml);

      // 移除舊元素
      const elementsToRemove = [
        selectors.admissionsBlock,
        '.block-field-blocknodeprogrammesfield-admissions-enquriy',
        selectors.programmeBlock,
        '.block-field-blocknodeprogrammesfield-programme-email'
      ];

      elementsToRemove.forEach(selector => {
        $container.find(selector).remove();
      });
    }

    // 更新標籤頁內容
    function updateTabContents($container, tabContents, tabBodies) {
      tabContents.forEach((content, index) => {
        if (content && tabBodies[index]) {
          $container.find(tabBodies[index]).html(content);
        }
      });
    }
    ////////////////////////////////////////////// Laboratories
    $('.file--mime-application-pdf a,.file--mime-application-vnd-openxmlformats-officedocument-wordprocessingml-document a,.paragraph--type--laboratory-document-section .field--name-field-link a').each(function () {
      var $a = $(this);
      var href = $a.attr('href');
      if (href) {
        $a.attr('target', '_blank');
      }
    });
    (function setupLaboratoriesDropdown() {
      // 支援 page-node-56, page-node-57 或任何包含 field-class="node-laboratories" 的 tab 容器
      // 查找所有包含 field-class 為 node-laboratories 的段落，然後找到其內的 nav 元素
      var $navs = $();

      // 方法1: 查找 page-node-56 和 page-node-57 中所有包含 .nav-tabs 的 nav
      $('.page-node-56, .page-node-57').find('.paragraph--type--bp-tabs').each(function() {
        var $tabContainer = $(this);
        // 檢查是否包含 field-class 為 node-laboratories
        var $fieldClass = $tabContainer.find('.field--name-field-class');
        if ($fieldClass.length > 0 && $fieldClass.text().trim() === 'node-laboratories') {
          var $nav = $tabContainer.find('>.paragraph__column>nav');
          if ($nav.length > 0) {
            $navs = $navs.add($nav);
          }
        }
      });

      // 方法2: 兼容舊的 #tab-85 選擇器
      $navs = $navs.add($('#tab-85>.paragraph__column>nav'));

      if ($navs.length === 0) return;

      $navs.each(function () {
        var $nav = $(this);
        // 若尚未插入 dropdown，先插入
        if ($nav.find('.dropdown-section').length === 0) {
          $nav.prepend(`
            <div class="dropdown-section">
              <div class="laboratories-dropdown">
                <div class="dropdown-button"></div>
              </div>
              <ul class="laboratories-dropdown-menu"></ul>
            </div>
          `);
        }

        // 初始化 Labs 手機下拉（與 .nav-tabs 同步）
        if ($nav.hasClass('labs-dropdown-processed')) return;
        $nav.addClass('labs-dropdown-processed');

        var $tabs = $nav.find('.nav.nav-tabs .nav-link');
        var $dropdown = $nav.find('.laboratories-dropdown');
        var $dropdownBtn = $dropdown.find('.dropdown-button');
        var $menu = $nav.find('.laboratories-dropdown-menu');

        // 兼容性：若 nav 內找不到，嘗試在同一容器下全域尋找一次
        if ($tabs.length === 0) {
          $tabs = $('.nav.nav-tabs .nav-link');
        }

        // 生成下拉項目，與 tab 一一對應
        $menu.empty();
        $tabs.each(function (idx) {
          var $btn = $(this);
          var label = $btn.text().trim();
          var id = $btn.attr('href') || $btn.attr('data-bs-target') || ('#tab-' + (idx + 1));
          var $li = $('<li class="laboratory-dropdown-item"></li>');
          var $a = $('<a href="#" role="button"></a>').text(label).attr('data-target', id);
          $li.append($a);
          $menu.append($li);

          // 點擊下拉 -> 觸發對應 tab
          $a.on('click', function (e) {
            e.preventDefault();
            // 嘗試以 href 匹配到對應 nav-link
            var target = $(this).attr('data-target');
            var $targetBtn = $tabs.filter('[href="' + target + '"]');
            if ($targetBtn.length === 0) {
              $targetBtn = $tabs.filter('[data-bs-target="' + target + '"]');
            }
            if ($targetBtn.length) {
              $targetBtn.trigger('click');
            }
            $dropdownBtn.text($(this).text().trim());
          });
        });

        // 初始化按鈕文字（當前 active 或第一個）
        var $activeTab = $tabs.filter('.active').first();
        if ($activeTab.length === 0) $activeTab = $tabs.first();
        $dropdownBtn.text($activeTab.text().trim());

        // 監聽 tab 顯示事件，更新按鈕文字
        document.addEventListener('shown.bs.tab', function (event) {
          var label = $(event.target).text().trim();
          $dropdownBtn.text(label);
          $dropdown.removeClass('open');
        });

        // 點擊按鈕展開/收起清單
        $dropdownBtn.on('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var isOpen = $dropdown.toggleClass('open').hasClass('open');
          $dropdownBtn.attr('aria-expanded', isOpen ? 'true' : 'false');
        });

        // 點擊選項後關閉
        $menu.on('click', 'a', function () {
          $dropdown.removeClass('open');
        });

        // 點擊外部關閉
        $(document).on('click', function (e) {
          var $target = $(e.target);
          if ($target.closest('.laboratories-dropdown').length === 0) {
            $dropdown.removeClass('open');
          }
        });
      });
    })();
    // 初始化程式頁面
    initializeProgrammes();
    ////////////////////////////////////////////// 監聽 AJAX 完成事件
    $(document).ajaxComplete(function () {
      // News && Events list
      $('.view-block-news-events-list.view-display-id-block_1 .js-form-item-field-tags-target-id select option:nth-child(1)').text('All Categories');

      // 重新处理日期字符串（AJAX更新后）
      $('.new-list-card').each(function () {
        var $cardDate = $(this).find('.card-date');
        var dateText = $cardDate.text().trim();

        // 处理日期字符串，拆分成span元素
        if (dateText) {
          // 检查是否包含 "-" 分隔符
          if (dateText.includes(' - ')) {
            // 如果有两个日期，拆分成两个span
            var dates = dateText.split(' - ');
            var date1 = dates[0].trim();
            var date2 = dates[1].trim();

            // 检查两个日期是否相同
            if (date1 === date2) {
              // 如果两个日期相同，只显示一个日期
              $cardDate.html('<span class="date-item">' + date1 + '</span>');
            } else {
              // 如果两个日期不同，显示两个日期
              var newHtml = '';
              dates.forEach(function (date, index) {
                newHtml += '<span class="date-item">' + date.trim() + '</span>';
                if (index < dates.length - 1) {
                  newHtml += ' <span class="date-separator">-</span> ';
                }
              });
              $cardDate.html(newHtml);
            }
          } else {
            // 如果只有一个日期，包装在一个span中
            $cardDate.html('<span class="date-item">' + dateText + '</span>');
          }
        }
      });

      // 重新創建年份選擇器（如果被AJAX覆蓋了）
      if ($('.years-select').length === 0) {
        // 重新提取年份數據
        var yearArray = extractAndSortYears();
        $('.block-views-blockblock-news-events-list-block-1 .js-form-item-field-date-value').before(`
          <div class="years-select js-form-item form-item js-form-type-select form-type-select js-form-item-field-date-target-id form-item-field-date-value" >
            <select data-drupal-selector="edit-field-date-value" name="field_date_value" class="form-select form-control" id="edit-field-date-value">

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

      // 重新初始化研究項目搜索功能（AJAX更新後）
      if ($('#research-searching').length > 0) {
        // 重新綁定搜索事件
        $('#research-searching').off('input keyup').on('input keyup', function () {
          var searchValue = $(this).val();
          performResearchSearch(searchValue);
        });

        $('#research-searching').off('keypress').on('keypress', function (e) {
          if (e.which === 13 || e.keyCode === 13) {
            e.preventDefault();
            var searchValue = $(this).val();
            performResearchSearch(searchValue);
          }
        });
      }

    });
    ///////////////////////////////// AOS
    setTimeout(function () {
      AOS.init({
        duration: 1000,
        delay: 200,
        once: true,
      });
    }, 200);
  });
});
