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
        container.find('video').each(function() {
          this.pause();
        });

        // Force stop YouTube videos by reloading iframe
        container.find('iframe[src*="youtube.com"], iframe[src*="youtu.be"]').each(function() {
          var iframe = this;
          var src = iframe.src;

          // First try postMessage
          try {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
          } catch (e) {
            // If postMessage fails, force reload iframe
            iframe.src = '';
            setTimeout(function() {
              iframe.src = src;
            }, 50);
          }

          // Force reload iframe to completely stop YouTube video
          setTimeout(function() {
            iframe.src = '';
            setTimeout(function() {
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
