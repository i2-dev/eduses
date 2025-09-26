jQuery(function ($) {
    $(document).ready(function () {
        // Loader
        $(document).on('readystatechange', function () {
            if (document.readyState !== 'complete') {
                $('body').css('visibility', 'hidden');
                $('#loader').css('visibility', 'visible');
            } else {
                $('#loader').css('display', 'none');
                $('body').css('visibility', 'visible');
            }
        });

        // Ensure loader is hidden after 2 seconds
        setTimeout(function () {
            if ($('#loader').is(':visible')) {
                $('#loader').css('display', 'none');
                $('body').css('visibility', 'visible');
            }
        }, 2000);
    });
});
