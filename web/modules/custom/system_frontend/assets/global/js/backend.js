jQuery(function ($) {
    $(document).ready(function () {
        var lang = document.documentElement.getAttribute('lang');

        // 檢查是否為homepage edit page (node ID 3)
        // 方法1: 使用URL檢查 (最可靠)
        if (window.location.pathname === '/node/3/edit') {
            $('body').addClass('homepage-edit-page');
            // 在這裡添加您想要的功能
        }

    });
});
