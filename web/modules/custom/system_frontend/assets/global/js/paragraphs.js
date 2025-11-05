jQuery(function ($) {
  $(document).ready(function () {
    $('.paragraph:not(.paragraph--type--section):not(form.node-form .paragraph)').each(function () {
      var animation_name = $(this).find('>.paragraph__column .field--name-field-animation-style').text().trim();
      var show_name = $(this).find('.paragraph__column .field--name-field-state').text().trim();
      var class_name = $(this).find('>.paragraph__column .field--name-field-class').text().trim();
      var class_width = $(this).find('>.paragraph__column .field--name-field-width').text().trim();
      var background_image = $(this).find('>.paragraph__column .field--name-field-background img').attr('src');
      var column_text = $(this).find('>.paragraph__column .field--name-field-column-widths').text().trim();
      if (class_name) {
        $(this).parent().addClass(class_name);
      };
      if (show_name) {
        $(this).parent().addClass(show_name);
      };
      if (animation_name) {
        $(this).parent().attr('data-aos', animation_name);
    };
      if (class_width) {
        // Clean up any existing container classes before adding new ones
        var currentClasses = $(this).attr('class') || '';
        var cleanClasses = currentClasses.replace(/container+/g, '');
        $(this).attr('class', cleanClasses.trim());
        $(this).addClass(class_width);
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
      if (column_text) {
        switch (column_text) {
          case '25%/75%':
            $(this).find('.layout--twocol-section .layout__region--first').addClass('column-25');
            $(this).find('.layout--twocol-section .layout__region--second').addClass('column-75');
            break;
          case '33%/67%':
            $(this).find('.layout--twocol-section .layout__region--first').addClass('column-33');
            $(this).find('.layout--twocol-section .layout__region--second').addClass('column-67');
            break;
          case '50%/50%':
            $(this).find('.layout--twocol-section .layout__region--first').addClass('column-50');
            $(this).find('.layout--twocol-section .layout__region--second').addClass('column-50');
            break;
          case '67%/33%':
            $(this).find('.layout--twocol-section .layout__region--first').addClass('column-67');
            $(this).find('.layout--twocol-section .layout__region--second').addClass('column-33');
            break;
          case '75%/25%':
            $(this).find('.layout--twocol-section .layout__region--first').addClass('column-75');
            $(this).find('.layout--twocol-section .layout__region--second').addClass('column-25');
            break;
        }
        $(this).find('>.paragraph__column>.layout--twocol-section--50-50').removeClass("layout--twocol-section--50-50");
      };
    });
    //////////////////////////// Paragraphs Header
    $('.paragraph--type--header').each(function () {
      var header_text = $(this).find('.field--name-field-header-type').text().trim();
      var header_type = $(this).find('.field--name-field-type-text').text().trim();
      if (header_text && header_type) {
        var wrapped_header = '<' + header_type + '>' + header_text + '</' + header_type + '>';
        $(this).find('>.paragraph__column').html(wrapped_header);
        $(this).show();
      }
    });
    //////////////////////////// Paragraphs Button
    $('.paragraph--type--button').each(function () {
      var button_color = $(this).find('.field--name-field-color').text().trim();
      var button_size = $(this).find('.field--name-field-size').text().trim();
      var button_type = $(this).find('.field--name-field-type').text().trim();
      if (button_color) {
        $(this).addClass(button_color);
      };
      if (button_size) {
        $(this).parents('.paragraph--type--button-paragraphs').addClass(button_size);
      };
      if (button_type) {
        $(this).parents('.paragraph--type--button-paragraphs').addClass(button_type);
        if (button_type == 'button') {
          $(this).find('.field--name-field-link>a').text('Apply Now');
        }
      };
    });
    //////////////////////////// Paragraphs quote
    $('.paragraph--type--bp-simple').each(function () {
      var quote_text = $(this).find('.field--name-field-has-quote').text().trim();
      if (quote_text == 'On') {
        $(this).addClass('hasQuote');
      }
    });
    //////////////////////////// Paragraphs Cards Section
    $('.paragraph--type--cards-section').each(function () {
      var cards_section_color = $(this).find('.field--name-field-section-color').text().trim();
      var cards_section_type = $(this).find('.field--name-field-section-type').text().trim();
      if (cards_section_color) {
        $(this).addClass(cards_section_color);
      }
      if (cards_section_type) {
        $(this).addClass(cards_section_type);
      }
    });
    //////////////////////////// Paragraphs Image with Caption Section
    $('.paragraph--type--image-with-caption').each(function () {
      var caption_column = $(this).find('.field--name-field-columns-type').text().trim();
      if (caption_column) {
        $(this).addClass(caption_column);
      }
    });
    //////////////////////////// Paragraphs Carousel Section
    $('.paragraph--type--carousel-section').each(function (i) {
      var carouselContainer = $(this);
      var carouselItems = carouselContainer.find('.paragraph--type--carousel-section-item');

      if (carouselItems.length > 0) {
        // Create Swiper container
        var swiperContainer = $(`
          <div class="swiper carouselSectionSwiper carouselSectionSwiper-${i}">
            <div class="swiper-wrapper"></div>
          </div>
           <div class="swiper-button container">
              <div class="swiper-button-next carouselSectionSwiper-button-next-${i}"></div>
              <div class="swiper-button-prev carouselSectionSwiper-button-prev-${i}"></div>
            </div>
        `);

        // Insert swiper container after the paragraph column
        carouselContainer.find('>.paragraph__column').append(swiperContainer);

        // Hide the original content
        carouselContainer.find('.field--name-field-paragraphs-section').hide();

        // Extract carousel items and create swiper slides
        carouselItems.each(function () {
          var item = $(this);
          var imageField = item.find('.field--name-field-image img');
          var linkField = item.find('.field--name-field-link a');
          var imageSrc = imageField.attr('src');
          var imageAlt = imageField.attr('alt');
          var linkUrl = linkField.attr('href');
          var linkText = linkField.text().trim();

          if (imageSrc) {
            var slide = $('<div class="swiper-slide"></div>');
            var imageElement = $(`<img src="${imageSrc}" alt="${imageAlt || ''}" class="img-fluid">`);

            // Check if there's a valid link URL (not just "#123" or empty)
            if (linkUrl && linkUrl.trim() !== '') {
              var linkElement = $(`<a href="${linkUrl}" class="carousel-link">`);
              linkElement.append(imageElement);
              slide.append(linkElement);
            } else {
              slide.append(imageElement);
            }

            swiperContainer.find('.swiper-wrapper').append(slide);
          }
        });

        // Initialize Swiper
        var swiper = new Swiper(swiperContainer[0], {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: carouselItems.length > 1,
          centeredSlides: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: `.carouselSectionSwiper-pagination-${i}`,
            clickable: true,
          },
          navigation: {
            nextEl: `.carouselSectionSwiper-button-next-${i}`,
            prevEl: `.carouselSectionSwiper-button-prev-${i}`,
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 'auto',
              spaceBetween: 30,
            }
          }
        });
      }
    });
    //////////////////////////// Paragraphs Video Section
    $('.paragraph--type--video-section').each(function () {
      $(this).find('>.paragraph__column>div:nth-child(2)>div.layout__region').addClass('video-section-content');
    });
    //////////////////////////// Paragraphs Table section
    var i2_table = `
    <div class="i2-table container table-responsive">
        <table class="table table-striped table-hover">
            <thead>
                <tr></tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    `;

    $('.paragraph--type--table').each(function () {
      var color = $(this).find('.field--name-field-table-color').text().trim();
      if (color) {
        $(this).addClass(color);
      }
      var outerElement = $(this);
      outerElement.find('>.paragraph__column').after(i2_table);
      outerElement.find('.paragraph--type--table-thead').parent().addClass('table-thead');
      outerElement.find('.paragraph--type--table-tbodys').parent().addClass('table-tbodys');

      // 获取当前表格的选择器
      var currentTable = outerElement.find('.i2-table table');

      // 调试：检查表头
      outerElement.find('.paragraph--type--table-thead').each(function () {
        var innerTheadElement = $(this);
        var Thead_title = innerTheadElement.find('.field--name-field-thead').text().trim();
        currentTable.find('thead>tr').append('<th scope="col">' + Thead_title + '</th>');
      });

      // 调试：检查表体
      outerElement.find('.paragraph--type--table-tbodys').each(function (index) {
        var innerTbodysElement = $(this);
        var innerTbodys_link = innerTbodysElement.find('.field--name-bp-link a').attr('href');
        var innerTbodys_link_text = innerTbodysElement.find('.field--name-field-link-text').text().trim();

        // 为每个表格创建新的行
        currentTable.find('tbody').append('<tr></tr>');

        // 获取所有 tbody 数据字段 - 根据HTML结构修复选择器
        innerTbodysElement.find('.paragraph--type--table-tbody').each(function () {
          var tbodyElement = $(this);
          var tbody_title = tbodyElement.find('.field--name-field-tbody').html();
          currentTable.find('tbody>tr').eq(index).append('<td>' + tbody_title + '</td>');
        });

        // 判断 innerTbodys_link 是否存在
        if (innerTbodys_link && innerTbodys_link.trim() !== '') {
          currentTable.find('tbody>tr').eq(index).append('<td><a class="button_link" href="' + innerTbodys_link + '" target="_blank" role="link">' + innerTbodys_link_text + '</a></td>');
        } else {
          currentTable.find('tbody>tr').eq(index).append('<td class="p-0"></td>');
        }
      });

      outerElement.find('>.paragraph__column .block-field-blockparagraphtablefield-table-color').html('');
      outerElement.find('>.paragraph__column .block-field-blockparagraphtablefield-paragraph').html('');
      outerElement.find('>.paragraph__column .block-field-blockparagraphtablefield-table-tbody').html('');
    });
    $('.paragraph--type--table .i2-table>table>tbody tr').each(function () {
      var outerElement = $(this);
      outerElement.find('>td:not(:first)').each(function () {
        var innerTbodysElement = $(this);
        if (innerTbodysElement.text().trim() == '') {
          innerTbodysElement.hide();
        }
      });
    });
    //////////////////////////// Paragraphs Tab - Final cleanup
    $('.paragraph--type--bp-tabs').each(function () {
      var $this = $(this);
      var classList = $this.attr('class');
      $(this).find('.nav-tabs>.nav-link').each(function () {
        var $this = $(this);
        var text = $this.text();
        if (text) {
          $this.html(text);
        }
      });
      if (classList) {
        // Remove any duplicated container classes and ensure only one container class
        var cleanClasses = classList.replace(/container+/g, 'container');
        $this.attr('class', cleanClasses);
      }
    });

    // Remove container classes from all nested elements in tab content
    $('.paragraph--type--bp-tabs .tab-content>div').each(function () {
      $(this).find('div').each(function () {
        var $div = $(this);
        var classList = $div.attr('class');
        if (classList) {
          // Remove any duplicated container classes
          var cleanClasses = classList.replace(/container+/g, '');
          $div.attr('class', cleanClasses.trim());
        }
      });
    });

    // Additional cleanup with timeout to ensure it runs after all other scripts
    setTimeout(function () {
      $('.paragraph--type--bp-tabs').each(function () {
        var $this = $(this);
        var classList = $this.attr('class');
        if (classList && classList.includes('containercontainer')) {
          // console.log('Found duplicated containers, cleaning...');
          var cleanClasses = classList.replace(/container+/g, 'container');
          $this.attr('class', cleanClasses);
          // console.log('Cleaned classes:', cleanClasses);
        }
      });
    }, 100);
  });
});
