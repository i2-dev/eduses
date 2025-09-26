jQuery(function ($) {
    //Var
    var old_fontsize_val = 0;
    var new_fontsize_val = 0;
    var fontsize_val = 0;
    var affectedElements_array = ["input", "label", "p", "div", "b", "h1", "h2", "li", "span", "a", ".text"];

    var min_fontsize_val = -3;
    var max_fontsize_val = 3;

    var small3 = 0.6;
    var small2 = 0.7;
    var small = 0.8;
    var normal = 1;
    var big = 1.2;
    var big2 = 1.3;
    var big3 = 1.4;

    //On click Functions
    //Zoom In
    $('.font-size-switch.zoom-in').click(function (event) {
        old_fontsize_val = 0;
        if ((localStorage.getItem("js_fontSize") != null)) {
            old_fontsize_val = localStorage.getItem("js_fontSize");
        }

        console.log(old_fontsize_val);

        if (old_fontsize_val != max_fontsize_val) {
            localStorage.setItem("js_fontSize", (parseInt(old_fontsize_val) + 1));
        }

        new_fontsize_val = localStorage.getItem("js_fontSize");
        console.log(new_fontsize_val);

        if (old_fontsize_val != new_fontsize_val) changeFontSize(new_fontsize_val);
        return false;
    });

    //Zoom Out
    $('.font-size-switch.zoom-out').click(function (event) {
        old_fontsize_val = 0;
        if ((localStorage.getItem("js_fontSize") != null)) {
            old_fontsize_val = localStorage.getItem("js_fontSize");
        }

        console.log(old_fontsize_val);

        if (old_fontsize_val != min_fontsize_val) {
            localStorage.setItem("js_fontSize", (parseInt(old_fontsize_val) - 1));
        }

        new_fontsize_val = localStorage.getItem("js_fontSize");
        console.log(new_fontsize_val);

        if (old_fontsize_val != new_fontsize_val) changeFontSize(new_fontsize_val);
        return false;
    });

    //Changing to small3-size
    $('.font-size-switch.small3-size').click(function (event) {
        old_fontsize_val = localStorage.getItem("js_fontSize");

        $('.font-size-switch.small3-size').addClass('active');
        $('.font-size-switch.small2-size').removeClass('active');
        $('.font-size-switch.small-size').removeClass('active');
        $('.font-size-switch.normal-size').removeClass('active');
        $('.font-size-switch.big-size').removeClass('active');
        $('.font-size-switch.big2-size').removeClass('active');
        $('.font-size-switch.big3-size').removeClass('active');

        localStorage.setItem("js_fontSize", -2);

        new_fontsize_val = localStorage.getItem("js_fontSize");

        if (old_fontsize_val != new_fontsize_val) changeFontSize(new_fontsize_val);
        return false;
    });

    //Changing to small2-size
    $('.font-size-switch.small2-size').click(function (event) {
        old_fontsize_val = localStorage.getItem("js_fontSize");

        $('.font-size-switch.small3-size').removeClass('active');
        $('.font-size-switch.small2-size').addClass('active');
        $('.font-size-switch.small-size').removeClass('active');
        $('.font-size-switch.normal-size').removeClass('active');
        $('.font-size-switch.big-size').removeClass('active');
        $('.font-size-switch.big2-size').removeClass('active');
        $('.font-size-switch.big3-size').removeClass('active');
        
        localStorage.setItem("js_fontSize", -2);

        new_fontsize_val = localStorage.getItem("js_fontSize");

        if (old_fontsize_val != new_fontsize_val) changeFontSize(new_fontsize_val);
        return false;
    });

    //Changing to small-size
    $('.font-size-switch.small-size').click(function (event) {
        old_fontsize_val = localStorage.getItem("js_fontSize");

        $('.font-size-switch.small3-size').removeClass('active');
        $('.font-size-switch.small2-size').removeClass('active');
        $('.font-size-switch.small-size').addClass('active');
        $('.font-size-switch.normal-size').removeClass('active');
        $('.font-size-switch.big-size').removeClass('active');
        $('.font-size-switch.big2-size').removeClass('active');
        $('.font-size-switch.big3-size').removeClass('active');

        localStorage.setItem("js_fontSize", -1);

        new_fontsize_val = localStorage.getItem("js_fontSize");

        if (old_fontsize_val != new_fontsize_val) changeFontSize(new_fontsize_val);
        return false;
    });

    //Changing to normal-size
    $('.font-size-switch.normal-size').click(function (event) {
        old_fontsize_val = localStorage.getItem("js_fontSize");

        $('.font-size-switch.small3-size').removeClass('active');
        $('.font-size-switch.small2-size').removeClass('active');
        $('.font-size-switch.small-size').removeClass('active');
        $('.font-size-switch.normal-size').addClass('active');
        $('.font-size-switch.big-size').removeClass('active');
        $('.font-size-switch.big2-size').removeClass('active');
        $('.font-size-switch.big3-size').removeClass('active');

        localStorage.setItem("js_fontSize", 0);

        new_fontsize_val = localStorage.getItem("js_fontSize");

        if (old_fontsize_val != new_fontsize_val) changeFontSize(new_fontsize_val);
        return false;
    });

    //Changing to big-size
    $('.font-size-switch.big-size').click(function (event) {
        old_fontsize_val = localStorage.getItem("js_fontSize");

        $('.font-size-switch.small3-size').removeClass('active');
        $('.font-size-switch.small2-size').removeClass('active');
        $('.font-size-switch.small-size').removeClass('active');
        $('.font-size-switch.normal-size').removeClass('active');
        $('.font-size-switch.big-size').addClass('active');
        $('.font-size-switch.big2-size').removeClass('active');
        $('.font-size-switch.big3-size').removeClass('active');

        localStorage.setItem("js_fontSize", 1);

        new_fontsize_val = localStorage.getItem("js_fontSize");

        if (old_fontsize_val != new_fontsize_val) changeFontSize(new_fontsize_val);
        return false;
    });

    //Changing to big2-size
    $('.font-size-switch.big2-size').click(function (event) {
        old_fontsize_val = localStorage.getItem("js_fontSize");

        $('.font-size-switch.small3-size').removeClass('active');
        $('.font-size-switch.small2-size').removeClass('active');
        $('.font-size-switch.small-size').removeClass('active');
        $('.font-size-switch.normal-size').removeClass('active');
        $('.font-size-switch.big-size').removeClass('active');
        $('.font-size-switch.big2-size').addClass('active');
        $('.font-size-switch.big3-size').removeClass('active');

        localStorage.setItem("js_fontSize", 2);

        new_fontsize_val = localStorage.getItem("js_fontSize");

        if (old_fontsize_val != new_fontsize_val) changeFontSize(new_fontsize_val);
        return false;
    });

    //Changing to big2-size
    $('.font-size-switch.big3-size').click(function (event) {
        old_fontsize_val = localStorage.getItem("js_fontSize");

        $('.font-size-switch.small3-size').removeClass('active');
        $('.font-size-switch.small2-size').removeClass('active');
        $('.font-size-switch.small-size').removeClass('active');
        $('.font-size-switch.normal-size').removeClass('active');
        $('.font-size-switch.big-size').removeClass('active');
        $('.font-size-switch.big2-size').removeClass('active');
        $('.font-size-switch.big3-size').addClass('active');

        localStorage.setItem("js_fontSize", 2);

        new_fontsize_val = localStorage.getItem("js_fontSize");

        if (old_fontsize_val != new_fontsize_val) changeFontSize(new_fontsize_val);
        return false;
    });



    //On load Functions

    setTimeout(function () {
        fontsize_val = (localStorage.getItem("js_fontSize") != null) ? (localStorage.getItem("js_fontSize")) : (0);
        $('.font-size-switch.small3-size').removeClass('active');
        $('.font-size-switch.small2-size').removeClass('active');
        $('.font-size-switch.small-size').removeClass('active');
        $('.font-size-switch.normal-size').removeClass('active');
        $('.font-size-switch.big-size').removeClass('active');
        $('.font-size-switch.big2-size').removeClass('active');
        $('.font-size-switch.big3-size').removeClass('active');
        switch (fontsize_val) {
            case -2:
                $('.font-size-switch.small2-size').addClass('active');
                break;
            case -1:
                $('.font-size-switch.small-size').addClass('active');
                break;
            case 1:
                $('.font-size-switch.big-size').addClass('active');
                break;
            case 2:
                $('.font-size-switch.big2-size').addClass('active');
                break;
            default:
                $('.font-size-switch.big-size').addClass('active');
        }
        markDefaultFontSize();
        changeFontSize(fontsize_val);
    }, 50);


    $(document).ajaxComplete(function () {
        setTimeout(function () {
            fontsize_val = (localStorage.getItem("js_fontSize") != null) ? (localStorage.getItem("js_fontSize")) : (0);
            $('.font-size-switch.small2-size').removeClass('active');
            $('.font-size-switch.small-size').removeClass('active');
            $('.font-size-switch.normal-size').removeClass('active');
            $('.font-size-switch.big-size').removeClass('active');
            $('.font-size-switch.big2-size').removeClass('active');
            switch (fontsize_val) {
                case -3:
                    $('.font-size-switch.small3-size').addClass('active');
                    break;
                case -2:
                    $('.font-size-switch.small2-size').addClass('active');
                    break;
                case -1:
                    $('.font-size-switch.small-size').addClass('active');
                    break;
                case 1:
                    $('.font-size-switch.big-size').addClass('active');
                    break;
                case 2:
                    $('.font-size-switch.big2-size').addClass('active');
                    break;
                case 3:
                    $('.font-size-switch.big3-size').addClass('active');
                    break;
                default:
                    $('.font-size-switch.big-size').addClass('active');
            }
            markDefaultFontSize();
            changeFontSize(fontsize_val);
        }, 50);
    });



    //Function
    function markDefaultFontSize() {
        $.each(affectedElements_array, function (i, val) {
            $(val).each(function () {
                var $this = $(this);
                if ($this.attr("font-size-default-px") === undefined) {
                    var default_size_px = parseInt($this.css('font-size'));
                    $this.attr("font-size-default-px", parseInt(default_size_px));
                }
            });
        })
    }


    function changeFontSize(fontsize_val) {
        /*   it works */
        $.each(affectedElements_array, function (i, val) {
            $(val).each(function () {
                var $this = $(this);
                if (!
                    (
                        $this.hasClass("small3-size") ||
                        $this.hasClass("small2-size") ||
                        $this.hasClass("small-size") ||
                        $this.hasClass("normal-size") ||
                        $this.hasClass("big-size") ||
                        $this.hasClass("big2-size") ||
                        $this.hasClass("big3-size")
                    )
                ) {
                    var current_size_px = parseInt($this.attr('font-size-default-px'));
                    if (fontsize_val == -3) {
                        $this.css("font-size", parseInt(current_size_px * small3) + "px");
                    } else if (fontsize_val == -2) {
                        $this.css("font-size", parseInt(current_size_px * small2) + "px");
                    } else if (fontsize_val == -1) {
                        $this.css("font-size", parseInt(current_size_px * small) + "px");
                    } else if (fontsize_val == 1) {
                        $this.css("font-size", parseInt(current_size_px * big) + "px");
                    } else if (fontsize_val == 2) {
                        $this.css("font-size", parseInt(current_size_px * big2) + "px");
                    }else if (fontsize_val == 3) {
                        $this.css("font-size", parseInt(current_size_px * big3) + "px");
                    } else {
                        $this.css("font-size", parseInt(current_size_px * normal) + "px");
                    }
                }
            });
        })
    }
});