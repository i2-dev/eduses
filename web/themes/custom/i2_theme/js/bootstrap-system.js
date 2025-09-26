jQuery(function ($) {
    //tabs
    $('.paragraph--type--bp-tabs>.paragraph__column>ul.nav-tabs>li').click(function () {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        var tab_id = $(this).children('.paragraph-tab-title').data('href');
        $(tab_id).siblings().removeClass('active');
        $(tab_id).addClass('active');
    });
    //accordion
    $(".paragraph--bp-accordion-container .paragraph--type--bp-accordion .paragraph__column>.accordion .card-header").click(function () {
        var expandedval = $(this).find('.accordion-title>div').attr("aria-expanded");
        var accordion_id = $(this).find('.accordion-title>div').data("href");
        $(this).siblings().removeClass('show');
        $(this).siblings().find('div.normal').attr("aria-expanded", "false");
        if (expandedval == "true") {
            $(this).removeClass('show');
            $(this).find('div.normal').attr("aria-expanded", "false");
            $(accordion_id).removeClass('show');
            $(accordion_id).find('div.normal').attr("aria-expanded", "false");
        } else {
            $(this).addClass('show');
            $(this).find('div.normal').attr("aria-expanded", "true");
            $(accordion_id).addClass('show');
        };
    });
    $(".paragraph--bp-accordion-container .paragraph--type--bp-accordion .paragraph__column>.accordion .card-header").each(function () {
        var expandedval = $(this).find('.accordion-title>div').attr("aria-expanded");
        var accordion_id = $(this).find('.accordion-title>div').data("href");
        if (expandedval == "true") {
            $(this).addClass('show');
            $(accordion_id).addClass('show');
        }
    });
    $(document).ajaxComplete(function () {
        //tabs
        $('.paragraph--type--bp-tabs>.paragraph__column>ul.nav-tabs>li').click(function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            var tab_id = $(this).children('.paragraph-tab-title').data('href');
            $(tab_id).siblings().removeClass('active');
            $(tab_id).addClass('active');
        });
        //accordion
        $(".paragraph--bp-accordion-container .paragraph--type--bp-accordion .paragraph__column>.accordion .card-header").click(function () {
            var expandedval = $(this).find('.accordion-title>div').attr("aria-expanded");
            var accordion_id = $(this).find('.accordion-title>div').data("href");
            $(this).siblings().removeClass('show');
            $(this).siblings().find('div.normal').attr("aria-expanded", "false");
            if (expandedval == "true") {
                $(this).removeClass('show');
                $(this).find('div.normal').attr("aria-expanded", "false");
                $(accordion_id).removeClass('show');
                $(accordion_id).find('div.normal').attr("aria-expanded", "false");
            } else {
                $(this).addClass('show');
                $(this).find('div.normal').attr("aria-expanded", "true");
                $(accordion_id).addClass('show');
            };
        });
        $(".paragraph--bp-accordion-container .paragraph--type--bp-accordion .paragraph__column>.accordion .card-header").each(function () {
            var expandedval = $(this).find('.accordion-title>div').attr("aria-expanded");
            var accordion_id = $(this).find('.accordion-title>div').data("href");
            if (expandedval == "true") {
                $(this).addClass('show');
                $(accordion_id).addClass('show');
            }
        });
    });
});
