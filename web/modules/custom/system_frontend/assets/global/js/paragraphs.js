jQuery(function ($) {
  $(document).ready(function () {
    $('.paragraph:not(.paragraph--type--section):not(form.node-form .paragraph)').each(function () {
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
      if (class_width) {
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
  });
});
