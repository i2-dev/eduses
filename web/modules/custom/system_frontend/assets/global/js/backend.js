jQuery(function ($) {
  $(document).ready(function () {
    // 獲取HTML的lang屬性值 - 多種方法
    var lang = document.documentElement.getAttribute('lang');
    switch (lang) {
      case 'en-gb':
        lang = 'en';
        break;
      case 'tc':
        lang = 'tc';
        break;
      case 'sc':
        lang = 'sc';
        break;
    }

    // 獲取URL倒數第二個的ID
    function getSecondToLastIdFromUrl() {
      var pathSegments = window.location.pathname.split('/').filter(function (segment) {
        return segment !== '';
      });

      if (pathSegments.length >= 2) {
        return pathSegments[pathSegments.length - 2];
      }
      return null;
    }

    // 檢查是否為homepage edit page (node ID 3)
    if (window.location.pathname === '/en/node/3/edit' ||
        window.location.pathname === '/sc/node/3/edit' ||
        window.location.pathname === '/tc/node/3/edit') {
      $('body').addClass('homepage-edit-page');
      // 在這裡添加您想要的功能
    }
    // people 的profile_link 自動生成
    if ($('body').hasClass('user-logged-in page-node-type-people')) {
      var profile_link = $('#edit-field-profile-links-0-value').val();
      var Id = getSecondToLastIdFromUrl();
      if (!profile_link) {
        $('#edit-field-profile-links-0-value').val(lang + '/people#' + Id);
      }
    }
    // Research Students profile_link 自動生成
    if ($('body').hasClass('user-logged-in page-node-type-research-students')) {
      var profile_link = $('#edit-field-profile-links-0-value').val();
      var Id = getSecondToLastIdFromUrl();
      if (!profile_link) {
        $('#edit-field-profile-links-0-value').val(lang + '/research/research-students#' + Id);
      }
    }
  });
});
