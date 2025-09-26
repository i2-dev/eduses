jQuery(function ($) {
    $(document).ready(function () {
        var lang = document.documentElement.getAttribute('lang');
        // view-admin-webform-view-page.view-display-id-page_1
        $('.view-admin-webform-view-page.view-display-id-page_1 table tbody>tr').each(function () {
            var link = $(this).find('.views-field-webform-id a').attr('href');
            var applicantInfo = link.split('/').pop();
            var modifiedString = applicantInfo.replace(/-/g, '_');
            $(this).find('.views-field-operations ul.dropbutton>li:first-child>a').text('Download').attr('href', '/admin/structure/webform/manage/' + modifiedString + '/results/download');
            $(this).find('.views-field-operations ul.dropbutton>li:nth-child(3)>a').text('Submissions').attr('href', '/admin/structure/webform/manage/' + modifiedString + '/results/submissions');
            $(this).find('.views-field-operations ul.dropbutton>li:nth-child(4)>a').text('View').attr('href', '/form/' + applicantInfo);
        });
        // [Admin] No Limits PLUS View Page
        $('.view-id-admin_no_limits_plus_view_page.view-display-id-page_1 table tbody tr').each(function () {
            var id = $.trim($(this).find('.views-field-nid').text());
            if (lang === 'zh-hant') {
                $(this).find('.views-field-title a').attr('href', '/zh-hant/outreach/no-limits-plus?nid=' + id);
            } else if (lang === 'zh-hans') {
                $(this).find('.views-field-title a').attr('href', '/zh-hans/outreach/no-limits-plus?nid=' + id);
            } else {
                $(this).find('.views-field-title a').attr('href', '/outreach/no-limits-plus?nid=' + id);
            }
        });
        // [Admin] webform
        $('.path-admin-formReviewer form#webform-bulk-form table.webform-forms tbody tr').each(function () {
            var link = $(this).find('.dropbutton>li:nth-child(3) a').attr('href');
            var link_text = $.trim($(this).find('.dropbutton>li:nth-child(3) a').text());
            $(this).find('.dropbutton>li:nth-child(1) a').attr('href', link).text(link_text);
        });
        $('.path-admin-formReviewer #block-claro-secondary-local-tasks ul.tabs>li').each(function () {
            var text = $.trim($(this).find('a').text());
            console.log(text);
            if (text == 'Submissions' || text == 'Download') {
                $(this).show();
            }
        });
        //是否是電話
        $(".webform-submission-form .form-type-number input").on("input", function () {
            // Replace the current value with only digits
            let phone = $(this).val().replace(/\D/g, '');
            $(this).val(phone); // Update the input with the cleaned value
        });
        
    });
});