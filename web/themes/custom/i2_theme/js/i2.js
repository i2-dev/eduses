jQuery(function ($) {
    $(document).ajaxComplete(function () {
        requestAnimationFrame(() => {
            // /* all items Intersection */            
            const allitems = document.querySelectorAll('.obs-items');

            const revealItems = function (entry, observer) {                
                if (!entry.isIntersecting) return;        
                entry.target.classList.add('obs-active');
                observer.unobserve(entry.target);        
                
                // console.log(entry);
            };

            const observerOptions = {
                root: null,
                // 設置多個閾值，可以更精確地監控相交比例
                threshold: [0.3],
                // 可選：添加 rootMargin 來調整觀察區域
                rootMargin: "0px 0px 0px 0px",
            };

            const itemsObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => revealItems(entry, observer));
            }, observerOptions);

            allitems.forEach(item => itemsObserver.observe(item));
            
        });
    });
});

(function ($) {
    $(document).ready(function () {
        // 監聽 AJAX 請求開始
        $(document).ajaxStart(function () {
            // 確保只在特定頁面上運行
            if ($('body').hasClass('page-node-4')) {
                // 獲取當前 URL
                var currentUrl = window.location.href;

                // 清空查詢參數
                var newUrl = currentUrl.split('?')[0];

                // 更新 URL
                window.history.replaceState(null, '', newUrl);
            }
        });
    });
})(jQuery);