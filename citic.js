var clientViewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

window.onload = function () {
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);
    document.addEventListener("keydown", function (e) {
        //document.onkeydown = function(e) {
        // "I" key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            disabledEvent(e);
        }
        // "J" key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
            disabledEvent(e);
        }
        // "S" key + macOS
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            disabledEvent(e);
        }
        // "U" key
        if (e.ctrlKey && e.keyCode == 85) {
            disabledEvent(e);
        }
        // "F12" key
        if (e.keyCode == 123) {
            disabledEvent(e);
        }
    }, false);
    function disabledEvent(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
        e.preventDefault();
        return false;
    }
}
function setTopHeaderChildOurBusinesses() {
    if (jQuery('.pt-page .header-content-fixed').length > 0) {
        jQuery('.pt-page .header-content-fixed').each(function () {
            jQuery(this).css("top", jQuery(this).closest('.pt-page').find('.button-back').outerHeight(true) + "px");
        });
    }
}
function showHideOurBusinessesFirst() {
    if (jQuery('.section-scroll').length > 0 && jQuery('.section-first-fixed').length > 0) {
        if ((jQuery('.section-first-fixed').width() * 1.25) < document.getElementsByClassName('section-scroll')[0].scrollLeft) {
            jQuery('.section-first-fixed').hide();
        } else {
            jQuery('.section-first-fixed').show();
        }
    }
}
function showHideOurBusinessesProperty() {
    if (jQuery('.section-scroll').length > 0 && jQuery('.section-property').length > 0) {
        if ((0 - (jQuery('.section-property:not(.section-property-fixed)').width() * 1.25)) > jQuery('.section-property:not(.section-property-fixed)').offset().left) {
            jQuery('.section-property-fixed').hide();
        } else {
            jQuery('.section-property-fixed').show();
        }
    }
}
function homeBannerSliderFixed() {
    if (jQuery('.home .section-banner.section-banner-fixed').length > 0) {
        if (jQuery('#wpadminbar').length > 0) {
            if (jQuery(window).width() > 767) {
                if (jQuery(window).scrollTop() > jQuery('#wpadminbar').height()) {
                    jQuery('.home .section-banner.section-banner-fixed').css({ 'top': (jQuery('header').outerHeight(true) + jQuery('.top-menu').height()) + 'px', 'height': (clientViewportHeight - (jQuery('header').outerHeight(true) + jQuery('.top-menu').height())) + 'px' });
                    jQuery('.home .section-banner:not(.section-banner-fixed)').css({ 'height': (clientViewportHeight - jQuery('header').outerHeight(true)) + 'px' });
                } else {
                    jQuery('.home .section-banner.section-banner-fixed').css({ 'top': (jQuery('#wpadminbar').outerHeight(true) + (jQuery('header').outerHeight(true) + jQuery('.top-menu').height())) + 'px', 'height': (clientViewportHeight - (jQuery('header').outerHeight(true) + jQuery('.top-menu').height())) + 'px' });
                    jQuery('.home .section-banner:not(.section-banner-fixed)').css({ 'height': (clientViewportHeight - (jQuery('header').outerHeight(true) + jQuery('.top-menu').height())) + 'px' });
                }
            } else {
                if (jQuery(window).scrollTop() > jQuery('#wpadminbar').height()) {
                    jQuery('.home .section-banner.section-banner-fixed').css({ 'top': (jQuery('header').outerHeight(true) + jQuery('.top-menu').height()) + 'px', 'height': (jQuery(window).width() / 16 * 9) + 'px' });
                    jQuery('.home .section-banner:not(.section-banner-fixed)').css({ 'height': (jQuery(window).width() / 16 * 9) + 'px' });
                } else {
                    jQuery('.home .section-banner.section-banner-fixed').css({ 'top': (jQuery('#wpadminbar').outerHeight(true) + (jQuery('header').outerHeight(true) + jQuery('.top-menu').height())) + 'px', 'height': (jQuery(window).width() / 16 * 9) + 'px' });
                    jQuery('.home .section-banner:not(.section-banner-fixed)').css({ 'height': (jQuery(window).width() / 16 * 9) + 'px' });
                }
            }
        } else {
            if (jQuery(window).width() > 767) {
                jQuery('.home .section-banner.section-banner-fixed').css({ 'top': (jQuery('header').outerHeight(true) + jQuery('.top-menu').height()) + 'px', 'height': (clientViewportHeight - (jQuery('header').outerHeight(true) + jQuery('.top-menu').height())) + 'px' });
                jQuery('.home .section-banner:not(.section-banner-fixed)').css({ 'height': (clientViewportHeight - jQuery('header').outerHeight(true)) + 'px' });
            } else {
                jQuery('.home .section-banner.section-banner-fixed').css({ 'top': (jQuery('header').outerHeight(true) + jQuery('.top-menu').height()) + 'px', 'height': (jQuery(window).width() / 16 * 9) + 'px' });
                jQuery('.home .section-banner:not(.section-banner-fixed)').css({ 'height': (jQuery(window).width() / 16 * 9) + 'px' });
            }
        }
    }
}

function headerPosition() {
    if (jQuery('#wpadminbar').length > 0) {
        jQuery('header').css('top', jQuery('#wpadminbar').outerHeight(true) + jQuery('.top-menu').height() + 'px');
        jQuery('.top-menu').css('top', jQuery('#wpadminbar').outerHeight(true) + 'px');
    } else {
        jQuery('header').css('top', jQuery('.top-menu').height() + 'px');
    }

    /*if(jQuery('main.leadership').length == 0){
        if(jQuery('main.news-listing-page').length == 0){
            if(jQuery('main.page-our-businesses').length > 0){
                if(jQuery('body.main-not-show').length == 0){
                    jQuery('body').animate({paddingTop: (jQuery('header').height() + jQuery('.top-menu').height()) +"px"});        
                }else{
                    jQuery('body').animate({paddingTop: "0px"});     
                }
            } else{
                jQuery('body').animate({paddingTop: (jQuery('header').height() + jQuery('.top-menu').height())+"px"});
            }  
        }
    }*/

    if (jQuery('.section-scroll').length > 0) {
        if (jQuery('#wpadminbar').length > 0) {
            jQuery('.section-scroll').css({ 'top': ((jQuery('header').height() + jQuery('.top-menu').height()) + jQuery('#wpadminbar').height()) + 'px', 'height': (jQuery(window).height() - (jQuery('header').height() + jQuery('.top-menu').height())) + 'px' });
        } else {
            jQuery('.section-scroll').css({ 'top': (jQuery('header').height() + jQuery('.top-menu').height()) + 'px', 'height': (jQuery(window).height() - (jQuery('header').height() + jQuery('.top-menu').height())) + 'px' });
        }

        if (iOS() || isMacintosh() || /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            jQuery('.section-first-fixed').css({ 'top': (jQuery('header').height() + jQuery('.top-menu').height()) + 'px', 'height': (jQuery(window).height() - jQuery('header').height()) + 'px' });
            jQuery('.section-others-fixed').css({ 'top': (jQuery('header').height() + jQuery('.top-menu').height()) + 'px', 'height': (jQuery(window).height() - jQuery('header').height()) + 'px' });
            jQuery('.section-property-fixed').css({ 'top': (jQuery('header').height() + jQuery('.top-menu').height()) + 'px', 'height': (jQuery(window).height() - jQuery('header').height()) + 'px' });
        } else {
            jQuery('.section-first-fixed').css({ 'top': (jQuery('header').height() + jQuery('.top-menu').height()) + 'px', 'height': (jQuery(window).height() - (jQuery('header').height() + jQuery('.top-menu').height()) - 17) + 'px' });
            jQuery('.section-others-fixed').css({ 'top': (jQuery('header').height() + jQuery('.top-menu').height()) + 'px', 'height': (jQuery(window).height() - (jQuery('header').height() + jQuery('.top-menu').height()) - 17) + 'px' });
            jQuery('.section-property-fixed').css({ 'top': (jQuery('header').height() + jQuery('.top-menu').height()) + 'px', 'height': (jQuery(window).height() - (jQuery('header').height() + jQuery('.top-menu').height()) - 17) + 'px' });
        }

    }
}

function headerSticky() {
    if (jQuery(window).scrollTop() > 0) {
        jQuery('header').addClass('sticky');
    } else {
        jQuery('header').removeClass('sticky');
    }
}

function hideHomeBannerScrollOver() {
    if (jQuery('.home .section-banner.section-banner-fixed').length > 0) {
        var homeBannerFixedBottom = jQuery('.home .section-banner.section-banner-fixed').outerHeight(true) * 1.5;
        if (jQuery(window).scrollTop() > homeBannerFixedBottom) {
            jQuery('.home .section-banner.section-banner-fixed').hide();
        } else {
            jQuery('.home .section-banner.section-banner-fixed').show();
        }
    }
}

function positionSustainabilityMediaFixed() {
    if (jQuery('.home .sustainability-media.fixed').length > 0) {
        if (jQuery('#wpadminbar').length > 0) {
            if (jQuery(window).scrollTop() > jQuery('#wpadminbar').height()) {
                jQuery('.home .sustainability-media.fixed').css('top', (jQuery('header').outerHeight(true) + jQuery('.top-menu').height()) + 'px');
            } else {
                jQuery('.home .sustainability-media.fixed').css('top', (jQuery('#wpadminbar').outerHeight(true) + (jQuery('header').outerHeight(true) + jQuery('.top-menu').height())) + 'px');
            }
        } else {
            jQuery('.home .sustainability-media.fixed').css('top', (jQuery('header').outerHeight(true) + jQuery('.top-menu').height()) + 'px');
        }
    }
}

function sectionIsInViewport() {
    if (jQuery('.section').length > 0) {
        jQuery('.section').each(function () {
            if (jQuery(this).offset().left <= ((jQuery(window).width() / 2) - jQuery(this).find('.actions .action').width()) && (jQuery(this).offset().left + jQuery(this).width()) > ((jQuery(window).width() / 2) + (jQuery(this).find('.actions .action').width() * 1.5))) {
                jQuery(this).addClass('all-in').find('.container').addClass('all-in');
            } else {
                jQuery(this).find('.container').removeClass('all-in');
            }

            if (jQuery(this).offset().left <= ((jQuery(window).width() / 2) - jQuery(this).find('.actions .action').width()) && (jQuery(this).offset().left + jQuery(this).width()) > ((jQuery(window).width() / 2) + (jQuery(this).find('.actions .action').width() * 1.5))) {
                jQuery(this).addClass('fade-in').find('.container').addClass('fade-in');
            }

            if (jQuery(this).offset().left <= jQuery(window).width()) {
                jQuery(this).addClass('in').find('.container').addClass('in');
            } else {
                jQuery(this).find('.container').removeClass('in');
            }
        });
    }

    if (jQuery('.section-property:not(.section-property-fixed)').length > 0 && jQuery('.section-property-fixed').length > 0) {
        if (jQuery('.section-property:not(.section-property-fixed)').offset().left <= (jQuery(window).width() * 1 / 3)) {
            jQuery('.section-property-fixed').addClass('property-in').find('.container').addClass('property-in');
        } else {
            jQuery('.section-property-fixed').find('.container').removeClass('property-in');
        }
    }


    if (jQuery('.section-others:not(.section-others-fixed)').length > 0 && jQuery('.section-others-fixed').length > 0) {
        if (jQuery(window).width() >= 1280) {
            if (jQuery('.section-others:not(.section-others-fixed)').offset().left <= (jQuery(window).width() * (4 / 5))) {
                jQuery('.section-others-fixed').addClass('other-in').find('.container').addClass('other-in');
            } else {
                jQuery('.section-others-fixed').find('.container').removeClass('other-in');
            }
        } else {
            if (jQuery('.section-others:not(.section-others-fixed)').offset().left <= (jQuery(window).width() / 6)) {
                jQuery('.section-others-fixed').addClass('other-in').find('.container').addClass('other-in');
            } else {
                jQuery('.section-others-fixed').find('.container').removeClass('other-in');
            }
        }
    }
}

function parallaxElementHorizontalPageHorizontal() {
    if (jQuery(".parallax_scroll_horizontal_page_horizontal").length > 0) {
        var parallaxElementHPH = jQuery(".parallax_scroll_horizontal_page_horizontal"),
            parallaxQuantityHPH = parallaxElementHPH.length;
        window.requestAnimationFrame(function () {
            for (var i = 0; i < parallaxQuantityHPH; i++) {
                var currentElementHPH = parallaxElementHPH.eq(i),
                    windowTop = (0 - document.getElementsByClassName('section-scroll')[0].scrollLeft),
                    elementTopHPH = currentElementHPH.offset().left,
                    elementHeightHPH = currentElementHPH.width(),
                    viewPortHeightHPH = window.innerWidth,
                    scrolledHPH = windowTop + elementTopHPH + (viewPortHeightHPH * (jQuery('main > div.section').length / 2));
                currentElementHPH.css({ transform: "translate3d(" + (scrolledHPH * -0.0075) + "px ,0, 0)" });
            }
        });
    }
}

function parallaxElementHorizontalPageHorizontalScale() {
    if (jQuery(".parallax_scroll_horizontal_page_horizontal_scale").length > 0) {
        var parallaxElementHPH = jQuery(".parallax_scroll_horizontal_page_horizontal_scale"),
            parallaxQuantityHPH = parallaxElementHPH.length;
        window.requestAnimationFrame(function () {
            for (var i = 0; i < parallaxQuantityHPH; i++) {
                var currentElementHPH = parallaxElementHPH.eq(i),
                    windowTop = (0 - document.getElementsByClassName('section-scroll')[0].scrollLeft),
                    elementTopHPH = currentElementHPH.offset().left,
                    elementHeightHPH = currentElementHPH.width(),
                    viewPortHeightHPH = window.innerWidth,
                    scrolledHPH = windowTop + elementTopHPH + (viewPortHeightHPH * (jQuery('main > div.section').length / 2));
                currentElementHPH.css({ transform: "translate3d(" + (scrolledHPH * -0.01) + "px ,0, 0) scale(1.3)" });
            }
        });
    }
}

function parallaxElementHorizontalPageHorizontalInvertSmall() {
    if (jQuery(".parallax_scroll_horizontal_page_horizontal_invert_small").length > 0) {
        var parallaxElementHPH = jQuery(".parallax_scroll_horizontal_page_horizontal_invert_small"),
            parallaxQuantityHPH = parallaxElementHPH.length;
        window.requestAnimationFrame(function () {
            for (var i = 0; i < parallaxQuantityHPH; i++) {
                var currentElementHPH = parallaxElementHPH.eq(i),
                    windowTop = (0 - document.getElementsByClassName('section-scroll')[0].scrollLeft),
                    elementTopHPH = currentElementHPH.offset().left,
                    elementHeightHPH = currentElementHPH.width(),
                    viewPortHeightHPH = window.innerWidth,
                    scrolledHPH = windowTop + elementTopHPH + (viewPortHeightHPH * (jQuery('main > div.section').length / 2));
                currentElementHPH.css({ transform: "translate3d(" + (scrolledHPH * 0.015) + "px ,0, 0)" });
            }
        });
    }
}

function parallaxElementHorizontalPageHorizontalAbsolute() {
    if (jQuery(".parallax_scroll_horizontal_page_horizontal_absolute").length > 0) {
        var parallaxElementHPH = jQuery(".parallax_scroll_horizontal_page_horizontal_absolute"),
            parallaxQuantityHPH = parallaxElementHPH.length;
        window.requestAnimationFrame(function () {
            for (var i = 0; i < parallaxQuantityHPH; i++) {
                var currentElementHPH = parallaxElementHPH.eq(i),
                    windowTop = (0 - document.getElementsByClassName('section-scroll')[0].scrollLeft),
                    elementTopHPH = currentElementHPH.offset().left,
                    elementHeightHPH = currentElementHPH.width(),
                    viewPortHeightHPH = window.innerWidth,
                    scrolledHPH = windowTop + elementTopHPH + viewPortHeightHPH;
                currentElementHPH.css({ transform: "translate3d(" + (scrolledHPH * -0.025) + "px ,0, 0) translateX(-57.7%)" });
            }
        });
    }
}

function parallaxElementHorizontalPageHorizontalShort() {
    if (jQuery(".parallax_scroll_horizontal_page_horizontal_short").length > 0) {
        var parallaxElementHPH = jQuery(".parallax_scroll_horizontal_page_horizontal_short"),
            parallaxQuantityHPH = parallaxElementHPH.length;
        window.requestAnimationFrame(function () {
            for (var i = 0; i < parallaxQuantityHPH; i++) {
                var currentElementHPH = parallaxElementHPH.eq(i),
                    windowTop = (0 - document.getElementsByClassName('section-scroll')[0].scrollLeft),
                    elementTopHPH = currentElementHPH.offset().top,
                    elementHeightHPH = currentElementHPH.height(),
                    viewPortHeightHPH = window.innerHeight * 0.5 - elementHeightHPH * 0.5,
                    scrolledHPH = windowTop - elementTopHPH + viewPortHeightHPH;
                currentElementHPH.css({ transform: "translate3d(" + scrolledHPH * -0.025 + "px ,0, 0) scale(1.45)" });
            }
        });
    }
}

function parallaxElementHorizontalPageHorizontalShortScale() {
    if (jQuery(".parallax_scroll_horizontal_page_horizontal_short_scale").length > 0) {
        var parallaxElementHPH = jQuery(".parallax_scroll_horizontal_page_horizontal_short_scale"),
            parallaxQuantityHPH = parallaxElementHPH.length;
        window.requestAnimationFrame(function () {
            for (var i = 0; i < parallaxQuantityHPH; i++) {
                var currentElementHPH = parallaxElementHPH.eq(i),
                    windowTop = (0 - document.getElementsByClassName('section-scroll')[0].scrollLeft),
                    elementTopHPH = currentElementHPH.offset().top,
                    elementHeightHPH = currentElementHPH.height(),
                    viewPortHeightHPH = window.innerHeight * 0.5 - elementHeightHPH * 0.5,
                    scrolledHPH = windowTop - elementTopHPH + viewPortHeightHPH;
                if (parallaxElementHPH.closest('.section').hasClass('in')) {
                    currentElementHPH.css({ transform: "translate3d(" + scrolledHPH * -0.025 + "px ,0, 0) scale(1.25)" });
                } else {
                    currentElementHPH.css({ transform: "translate3d(" + scrolledHPH * -0.025 + "px ,0, 0) scale(1.4)" });
                }
            }
        });
    }
}

function parallaxElementScaleUp() {
    if (jQuery(".parallax_scroll_scale_up").length > 0) {
        var parallaxElementSU = jQuery(".parallax_scroll_scale_up"),
            parallaxQuantitySU = parallaxElementSU.length;
        window.requestAnimationFrame(function () {
            for (var i = 0; i < parallaxQuantitySU; i++) {
                var currentElementSU = parallaxElementSU.eq(i);
                var scaleSU = ((document.getElementsByClassName('section-scroll')[0].scrollLeft) / (window.innerWidth)) / 9.5,
                    scaleValueSU = 1 + scaleSU;
                if (scaleValueSU < 1) {
                    scaleValueSU = 1;
                }
                currentElementSU.css({ transform: "scale(" + scaleValueSU + ")" });
            }
        });
    }
}

function parallaxElementScaleUp() {
    if (jQuery(".parallax_scroll_scale_up_bigger").length > 0) {
        var parallaxElementSU = jQuery(".parallax_scroll_scale_up_bigger"),
            parallaxQuantitySU = parallaxElementSU.length;
        window.requestAnimationFrame(function () {
            for (var i = 0; i < parallaxQuantitySU; i++) {
                var currentElementSU = parallaxElementSU.eq(i);
                var scaleSU = ((document.getElementsByClassName('section-scroll')[0].scrollLeft) / (window.innerWidth)) / 4,
                    scaleValueSU = 1 + scaleSU;
                if (scaleValueSU < 1) {
                    scaleValueSU = 1;
                }
                currentElementSU.css({ transform: "scale(" + scaleValueSU + ")" });
            }
        });
    }
}

function parallaxElementHorizontalPageHorizontalShortScaleUp() {
    if (jQuery(".parallax_scroll_horizontal_page_horizontal_short_scale_up").length > 0) {
        var parallaxElementHPH = jQuery(".parallax_scroll_horizontal_page_horizontal_short_scale_up"),
            parallaxQuantityHPH = parallaxElementHPH.length;
        window.requestAnimationFrame(function () {
            for (var i = 0; i < parallaxQuantityHPH; i++) {
                var currentElementHPH = parallaxElementHPH.eq(i);
                var scaleHPH = ((document.getElementsByClassName('section-scroll')[0].scrollLeft) / (window.innerWidth)),
                    windowTop = (0 - document.getElementsByClassName('section-scroll')[0].scrollLeft),
                    elementTopHPH = currentElementHPH.offset().top,
                    elementHeightHPH = currentElementHPH.height(),
                    viewPortHeightHPH = window.innerHeight * 0.5 - elementHeightHPH * 0.5,
                    scrolledHPH = windowTop - elementTopHPH + viewPortHeightHPH;
                scaleValueHPH = 1 + scaleHPH;
                if (scaleValueHPH > 1.25) {
                    scaleValueHPH = 1.25;
                }
                if (scaleValueHPH < 1.1) {
                    scaleValueHPH = 1.1;
                }
                if (jQuery(window).width() > 767) {
                    currentElementHPH.css({ transform: "translate3d(" + scrolledHPH * -0.025 + "px ,0, 0) scale(" + scaleValueHPH + ")" });
                } else {
                    currentElementHPH.css({ transform: "translate3d(0 ,0, 0) scale(1.1)" });
                }
            }
        });
    }
}

function parallaxElementVerticalShortScaleUp() {
    if (jQuery(".parallax_scroll_vertical_short_scale_up").length > 0) {
        var parallaxElementVSS = jQuery(".parallax_scroll_vertical_short_scale_up"),
            parallaxQuantityVSS = parallaxElementVSS.length;
        window.requestAnimationFrame(function () {
            for (var i = 0; i < parallaxQuantityVSS; i++) {
                var currentElementVSS = parallaxElementVSS.eq(i),
                    windowTop = jQuery(window).scrollTop(),
                    elementTopVSS = currentElementVSS.offset().top,
                    elementHeightVSS = currentElementVSS.height(),
                    viewPortHeightVSS = window.innerHeight - elementHeightVSS,
                    scrolledVSS = windowTop - elementTopVSS + viewPortHeightVSS;
                var scaleVSS = (jQuery(window).scrollTop() / (jQuery(document).height() - currentElementVSS.offset().top)) / 15;
                var scaleValueVSS = 1 + scaleVSS;
                if (scaleValueVSS < 1) {
                    scaleValueVSS = 1;
                }
                currentElementVSS.css({ transform: "scale(" + scaleValueVSS + ")" });
            }
        });
    }
}

function setHeight404() {
    if (jQuery('.error404').length > 0) {
        var padding = (jQuery(window).height() - (jQuery('header').outerHeight(true) + jQuery('.top-menu').height()) - jQuery('footer').outerHeight(true) - jQuery('.footer-nav-widgets-wrapper').outerHeight(true) - jQuery('.error404 .error404-content').height()) / 2;
        if (padding <= 0) {
            padding = (jQuery(window).height() - jQuery('.error404 .error404-content').height()) / 2;
        }
        jQuery('.error404 .error404-content').css({ 'padding-top': padding + 'px', 'padding-bottom': padding + 'px' })
    }
}

function stopVideo() {
    jQuery('video').each(function () {
        jQuery(this)[0].pause();
        jQuery(this)[0].currentTime = 0;
    });

    jQuery('iframe').each(function () {
        let iframeUrl = jQuery(this).attr('src');
        jQuery(this).attr('src', '');
        jQuery(this).attr('src', iframeUrl);
    });
}

// Detech element is in Viewport
jQuery.fn.isInViewport = function () {
    var elementTop = jQuery(this).offset().top;
    var elementBottom = elementTop + jQuery(this).outerHeight();
    var viewportTop = jQuery(window).scrollTop();
    var viewportBottom = viewportTop + (jQuery(window).height() * (3 / 4));
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

function iPadiOS() {
    return [
        'iPad Simulator',
        'iPad'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function iphoneiOS() {
    return [
        'iPhone Simulator',
        'iPod Simulator',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}


function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

function isMacintosh() {
    return navigator.platform.indexOf('Mac') > -1
}


jQuery(document).ready(function ($) {
    setHeight404();
    if (iphoneiOS() || /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('body').addClass('mobile-device');
    }
    if (iphoneiOS() || /iPhone|iPod/i.test(navigator.userAgent)) {
        $('body').addClass('iphone-device');
    }

    if (iOS() || isMacintosh()) {
        $('body').addClass('has-scrollbar');
    }

    var elementLeft = 0,
        elementRight = 0,
        viewportLeft = 0,
        viewportRight = 0;

    if ($('main.page-our-businesses').length > 0) {

        var ourBussinessesMainTag = document.getElementsByClassName('section-scroll')[0];

        // Show/hide tab in Our Businesses page
        $(window).on('hashchange', function (e) {
            // stopVideo();
            // hashValue = window.location.hash.replace("#", "");
            // $('.pt-page[data-tab="' + hashValue + '"]').addClass('pt-page-current').siblings().removeClass('pt-page-current');
            // jQuery('body').animate({ paddingTop: "0px" }).addClass('main-not-show');
            stopVideo();
            var hashValue = window.location.hash.replace('#', '');
            if (!/^[A-Za-z0-9_-]+$/.test(hashValue)) {
                return;
            }
            $('.pt-page').filter(function () {
                return $(this).attr('data-tab') === hashValue;
            }).addClass('pt-page-current').siblings().removeClass('pt-page-current');
            jQuery('body').animate({ paddingTop: '0px' }).addClass('main-not-show');
            jQuery('.footer-nav-widgets-wrapper').fadeIn();
            jQuery('footer').fadeIn();
            setTopHeaderChildOurBusinesses();
            $(window).scrollTop(0);
            AOS.init({
                once: true
            });
        });
        if (window.location.hash != '') {
            stopVideo();
            hashValue = window.location.hash.replace("#", "");
            $('.pt-page[data-tab="' + hashValue + '"]').addClass('pt-page-current').siblings().removeClass('pt-page-current');
            jQuery('body').animate({ paddingTop: "0px" }).addClass('main-not-show');
            jQuery('.footer-nav-widgets-wrapper').fadeIn();
            jQuery('footer').fadeIn();
            if ($('.main-not-show').length > 0) {
                if ($('.section-scroll div[data-tab="' + hashValue + '"]').length > 0) {
                    ourBussinessesMainTag.scrollLeft = $('.section-scroll div[data-tab="' + hashValue + '"]').offset().left;
                }
                $('.anime-text').each(function () {
                    elementLeft = $(this).offset().left;
                    elementRight = elementLeft + $(this).outerWidth();
                    viewportLeft = ourBussinessesMainTag.scrollLeft;
                    viewportRight = viewportLeft + ($(window).width() * (3 / 4));
                    if (elementLeft < $(window).width() * (3 / 4)) {
                        $(this).addClass('in');
                    }
                });

                sectionIsInViewport();
                parallaxElementHorizontalPageHorizontal();
                parallaxElementHorizontalPageHorizontalScale();
                parallaxElementHorizontalPageHorizontalShort();
                parallaxElementHorizontalPageHorizontalShortScale();
                parallaxElementHorizontalPageHorizontalShortScaleUp();
                parallaxElementScaleUp();
                parallaxElementHorizontalPageHorizontalAbsolute();
                parallaxElementHorizontalPageHorizontalInvertSmall();
                showHideOurBusinessesProperty();
                showHideOurBusinessesFirst();
                setTopHeaderChildOurBusinesses();
            }
        }


        window.addEventListener('wheel', function (e) {
            if ($('body').hasClass('main-not-show') == false) {
                if (e.deltaY > 0) ourBussinessesMainTag.scrollLeft += 50;
                else ourBussinessesMainTag.scrollLeft -= 50;
            }
        });




        $('.section-scroll').on('scroll', function (e) {
            if ($('body').hasClass('main-not-show') == false) {
                $('.anime-text').each(function () {
                    elementLeft = $(this).offset().left;
                    elementRight = elementLeft + $(this).outerWidth();
                    viewportLeft = ourBussinessesMainTag.scrollLeft;
                    viewportRight = viewportLeft + ($(window).width() * (3 / 4));
                    if (elementLeft < $(window).width() * (3 / 4)) {
                        $(this).addClass('in');
                    }
                });

                sectionIsInViewport();
                parallaxElementHorizontalPageHorizontal();
                parallaxElementHorizontalPageHorizontalScale();
                parallaxElementHorizontalPageHorizontalShort();
                parallaxElementHorizontalPageHorizontalShortScale();
                parallaxElementHorizontalPageHorizontalShortScaleUp();
                parallaxElementScaleUp();
                parallaxElementHorizontalPageHorizontalAbsolute();
                parallaxElementHorizontalPageHorizontalInvertSmall();
                showHideOurBusinessesProperty();
                showHideOurBusinessesFirst();

            }
        });
    }


    var listNewsAutoplayTimeout = 10000;
    var listNewsOption = {
        loop: true,
        items: 1,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: listNewsAutoplayTimeout,
        responsive: {
            0: {
                margin: 10,
                items: 1
            },
            375: {
                margin: 15,
                items: 1
            },
            768: {
                margin: 20,
                items: 1
            },
            993: {
                margin: 25,
                items: 1
            },
            1025: {
                margin: 30,
                items: 1
            },
            1201: {
                margin: 40,
                items: 1
            },
            1260: {
                margin: 50,
                items: 1
            }
        }
    }
    var stepTime = listNewsAutoplayTimeout / 400;
    var countStep = 0;

    headerPosition();
    headerSticky();
    homeBannerSliderFixed();
    hideHomeBannerScrollOver();
    positionSustainabilityMediaFixed();

    $(window).scroll(function () {
        //headerPosition();
        headerSticky();
        homeBannerSliderFixed();
        hideHomeBannerScrollOver();
        positionSustainabilityMediaFixed();
        parallaxElementVerticalShortScaleUp();
        parallaxElementHorizontalPageHorizontalInvertSmall();
    });


    $(window).on('resize scroll', function () {
        if ($('body.page-template-template-our-businesses').length == 0) {
            $('.anime-text').each(function () {
                if ($(this).isInViewport()) {
                    $(this).addClass('in');
                }
            });
        }

        if ($('.media-animation').length > 0) {
            $('.media-animation').each(function () {
                if ($(this).isInViewport()) {
                    $(this).addClass('in');
                }
            });
        }

        if ($('.home .section-news .list-news').length > 0) {
            if ($('.home .section-news .list-news').isInViewport()) {
                $('.home .section-news .list-news').trigger('play.owl.autoplay', [listNewsAutoplayTimeout]);
            }
        }
    });

    //Cursor customize
    if ($('.home .cursor').length > 0 || $('.page-template-template-energy .cursor').length > 0 || $('.page-template-template-our-businesses .cursor').length > 0 || $('.page-template-teamplate-about-us .cursor').length > 0 || $('.property .property-post .cursor').length > 0 || $('.page-template-template-news-listing .cursor').length > 0) {
        const cursor = document.querySelector('.cursor');
        cursor.classList.add('hide');
        $(document).mousemove(function (event) {
            if ($(window).width() >= 768) {
                cursor.setAttribute("style", "top: " + (event.pageY - 32) + "px; left: " + (event.pageX - 32) + "px;");
            } else {
                cursor.setAttribute("style", "top: " + (event.pageY - 16) + "px; left: " + (event.pageX - 16) + "px;");
            }
        });

        $('.show-cursor').mouseenter(function () {
            $('.cursor').removeClass('hide');
        });

        $('.show-cursor').mouseleave(function () {
            $('.cursor').addClass('hide');
        });
    }

    //Select customize
    if ($('select').length > 0) {
        $('select').select2({
            minimumResultsForSearch: Infinity,
            width: 'style'
        });
    }

    //parallax scroll
    jQuery(window).on("load scroll", function () {

        if (jQuery(".parallax_scroll_vertical").length > 0) {
            var parallaxElementVertical = jQuery(".parallax_scroll_vertical"),
                parallaxQuantityVertical = parallaxElementVertical.length;
            window.requestAnimationFrame(function () {
                for (var i = 0; i < parallaxQuantityVertical; i++) {
                    var currentElementVertical = parallaxElementVertical.eq(i),
                        windowTop = jQuery(window).scrollTop(),
                        elementTopVertical = currentElementVertical.offset().top,
                        elementHeightVertical = currentElementVertical.height(),
                        viewPortHeightVertical = window.innerHeight * 0.5 - elementHeightVertical * 0.5,
                        scrolledVertical = windowTop - elementTopVertical + viewPortHeightVertical;
                    currentElementVertical.css({
                        transform: "translate3d(0," + scrolledVertical * -0.1 + "px, 0)"
                    });
                }
            });
        }

        if (jQuery(".parallax_scroll_horizontal").length > 0) {
            var parallaxElementHorizontal = jQuery(".parallax_scroll_horizontal"),
                parallaxQuantityHorizontal = parallaxElementHorizontal.length;
            window.requestAnimationFrame(function () {
                for (var i = 0; i < parallaxQuantityHorizontal; i++) {
                    var currentElementHorizontal = parallaxElementHorizontal.eq(i),
                        windowTop = jQuery(window).scrollTop(),
                        elementTopHorizontal = currentElementHorizontal.offset().top,
                        elementHeightHorizontal = currentElementHorizontal.height(),
                        viewPortHeightHorizontal = window.innerHeight * 0.5 - elementHeightHorizontal * 0.5,
                        scrolledHorizontal = windowTop - elementTopHorizontal + viewPortHeightHorizontal;
                    currentElementHorizontal.css({
                        transform: "translate3d(" + scrolled * 0.1 + "px ,0, 0)"
                    });
                }
            });
        }
    });


    $('.footer-menu-wrapper .footer-menu > li:first-child').addClass('show-submenu');

    var isInMenuModal = 0;
    $('.menu-modal').mouseenter(function () {
        isInMenuModal = 1;
    });
    $('.menu-modal').mouseleave(function () {
        isInMenuModal = 0;
    });
    $('.menu-modal').blur(function () {
        isInMenuModal = 0;
    });
    $('body').click(function () {
        if (isInMenuModal == 0) {
            $('html').removeAttr('style');
            $('body').removeClass('showing-menu-modal').removeClass('showing-modal');
            $('.menu-modal').removeClass('show-modal').removeClass('active');
            $('html').removeClass('showing-modal');
        }
    });

    if ($('.home .section-our-businesses .list-our-businesses').length > 0) {
        $('.home .section-our-businesses .list-our-businesses').owlCarousel({
            loop: false,
            items: 4,
            dots: false,
            margin: 21,
            autoplay: false,
            autoplayTimeout: listNewsAutoplayTimeout,
            responsive: {
                0: {
                    margin: 17,
                    items: 1
                },
                768: {
                    margin: 21,
                    items: 2
                },
                1024: {
                    margin: 21,
                    items: 3
                },
                1200: {
                    margin: 21,
                    items: 4
                }
            }
        });
    }

    if ($('.home .section-banner .list-banner-1 .owl-carousel').length > 0) {
        $('.home .section-banner .list-banner-1 .owl-carousel').owlCarousel({
            loop: true,
            items: 1,
            dots: false,
            video: true,
            margin: 0,
            autoplayTimeout: 2000,
            autoplay: true,
            autoplayHoverPause: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn'
        });
    }


    if ($('.home .section-banner .list-banner-2 .owl-carousel').length > 0) {
        setTimeout(function () {
            $('.home .section-banner .list-banner-2 .owl-carousel').owlCarousel({
                loop: true,
                items: 1,
                dots: false,
                video: true,
                margin: 0,
                autoplayTimeout: 2000,
                autoplay: true,
                autoplayHoverPause: true,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn'
            });
        }, 666);
    }

    if ($('.home .section-banner .list-banner-3 .owl-carousel').length > 0) {
        setTimeout(function () {
            $('.home .section-banner .list-banner-3 .owl-carousel').owlCarousel({
                loop: true,
                items: 1,
                dots: false,
                video: true,
                margin: 0,
                autoplayTimeout: 2000,
                autoplay: true,
                autoplayHoverPause: true,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn'
            });
        }, 1333);
    }

    if ($('.home .section-news .list-news').length > 0) {
        $('.home .section-news .list-news').owlCarousel(listNewsOption).on('changed.owl.carousel', function (event) {
            $('.home .section-news .nav-news .index').text(event.page.index + 1);
        });
        $('.home .list-news .owl-dots .owl-dot').each(function () {
            $(this).css('width', (100 / $('.home .list-news .owl-dots .owl-dot').length) + '%');
        });
        $('.home .section-news .nav-news .prev').click(function () {
            $('.home .section-news .list-news').trigger('prev.owl.carousel', [300]);
        });

        $('.home .section-news .nav-news .next').click(function () {
            $('.home .section-news .list-news').trigger('next.owl.carousel', [300]);
        });

        $('.home .section-news .post-title').dotdotdot({
            height: 155,
            ellipsis: "\u2026",
            fallbackToLetter: true,
            watch: true,
        });
        $('.home .section-news .post-title').matchHeight();
    }

    if ($('.home .section-about .entry-content').length > 0) {
        $('.home .section-about .entry-content').dotdotdot({
            height: 135,
            ellipsis: "\u2026 ",
            fallbackToLetter: true,
            watch: true
        });
    }

    $('header .primary-menu > li').mouseenter(function () {
        $(this).find('.sub-menu').addClass('show');
        $(this).siblings().find('.sub-menu').removeClass('show');
    });
    $('header .primary-menu > li').mouseleave(function () {
        $(this).find('.sub-menu').removeClass('show');
        $(this).siblings().find('.sub-menu').removeClass('show');
    });

    $('.menu-modal button.sub-menu-toggle').click(function () {
        if ($(window).width() < 768) {
            $(this).parent().next().slideToggle();
        }
    });

    // redirect to page has anchor
    $('header .primary-menu > li.menu-item-has-children .sub-menu a, .footer-nav-widgets-wrapper .desktop.footer-menu-wrapper .footer-menu > li.menu-item-has-children .sub-menu a').click(function () {
        if ($(this).closest('.menu-item-has-children').hasClass('.pll-parent-menu-item') == false) {
            if ($(this).attr('href').indexOf("#") != -1) {
                window.location = $(this).closest('li.menu-item-has-children').children().attr('href') + $(this).attr('href');
                $(this).closest('.sub-menu').removeClass('show');
                $(this).closest('li.menu-item-has-children').removeClass('focus');
                if ($(this).closest('.menu-item-has-children').hasClass('our-businesses-item')) {
                    $('.our-businesses-item .sub-menu li').removeClass('current-menu-item');
                    $(this).parent().addClass('current-menu-item');
                }
                return false;
            }
        }

        if ($(this).closest('.lang-item').length > 0) {
            if (window.location.hash != '') {

                window.location = $(this).attr('href') + window.location.hash;
                return false;
            }
        }

        if (jQuery('main.page-our-businesses').length > 0) {
            if ($(this).closest('.lang-item').length == 0) {
                jQuery('body').animate({ paddingTop: "0px" }).addClass('main-not-show');
            }
        }
    });

    $('header .primary-menu > li.pll-parent-menu-item > a').attr('href', '').click(function (e) {
        e.preventDefault();
    });

    $('.menu-modal .modal-menu > li.menu-item-has-children .sub-menu a').click(function () {
        if ($(this).attr('href').indexOf("#") != -1) {
            window.location = $(this).closest('li.menu-item-has-children').children().find('a').attr('href') + $(this).attr('href');
            $(this).closest('.sub-menu').removeClass('show');
            $(this).closest('li.menu-item-has-children').removeClass('focus');
            if ($(this).closest('.menu-item-has-children').hasClass('our-businesses-item')) {
                $('.our-businesses-item .sub-menu li').removeClass('current-menu-item');
                $(this).parent().addClass('current-menu-item');
            }
            return false;
        }

        if (jQuery('main.page-our-businesses').length > 0) {
            if ($(this).closest('.lang-item').length == 0) {
                jQuery('body').animate({ paddingTop: "0px" }).addClass('main-not-show');
            }
        }
    });
    $('.our-businesses-item .sub-menu a').each(function () {
        let urlHash = window.location.hash;
        if ($(this).attr('href').indexOf("#") != -1) {
            let itemHash = $(this).attr('href').substr($(this).attr('href').indexOf("#"), $(this).attr('href').length);
            if (urlHash == itemHash) {
                $('.our-businesses-item .sub-menu li').removeClass('current-menu-item');
                $(this).parent().addClass('current-menu-item');
            }
        }
    });
});



jQuery(window).on('load', function () {
    AOS.init({
        once: true
    });
    setTimeout(function () {
        AOS.refreshHard();
    }, 300);

    if (jQuery('.video-popup').length) {
        jQuery('.video-popup').magnificPopup({
            type: 'iframe',
            callbacks: {
                open: function () {
                    var self = this;
                    this.content.find('iframe').on('load', function () {
                        var iframe = jQuery(this);
                        var iframeContent = iframe.contents();
                        var video = iframeContent.find('video');

                        if (video.length) {
                            video.attr("controlsList", "nodownload");
                            video.on('contextmenu', function (e) {
                                e.preventDefault();
                                return false;
                            });
                        }
                        iframe.on('contextmenu', function (e) {
                            e.preventDefault();
                            return false;
                        });
                        iframeContent.on('contextmenu', function (e) {
                            e.preventDefault();
                            return false;
                        });
                        jQuery('.mfp-content, .mfp-wrap, .mfp-iframe').on('contextmenu', function (e) {
                            e.preventDefault();
                            return false;
                        });
                    });
                }
            }
        });
    }

    if (iOS() || /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (jQuery('.anime-text').length > 0) {
            jQuery('.anime-text').each(function () {
                if (jQuery(this).isInViewport()) {
                    jQuery(this).addClass('in');
                }
            });
        }
        if (jQuery('.media-animation').length > 0) {
            jQuery('.media-animation').each(function () {
                if (jQuery(this).isInViewport()) {
                    jQuery(this).addClass('in');
                }
            });
        }
    }

    if (jQuery('main.page-our-businesses').length > 0) {
        if (window.location.hash == '') {
            jQuery('.pt-page:not(.section-scroll) .aos-init').each(function () {
                if (jQuery(this).hasClass('aos-animate') == true) {
                    jQuery(this).removeClass('aos-animate').removeClass('aos-init');
                }
            });
        }
        //  Scroll to Special Steel after click "Scroll to Explore" link in Section First
        jQuery('.page-template-template-our-businesses .page-our-businesses .section-first .action').click(function () {
            jQuery('.page-template-template-our-businesses .page-our-businesses.section-scroll').addClass('scroll-smoth');
            document.getElementsByClassName('section-scroll')[0].scrollLeft = jQuery('.page-template-template-our-businesses .page-our-businesses .section.section-special-steel').offset().left;
            setTimeout(function () {
                jQuery('.page-template-template-our-businesses .page-our-businesses.section-scroll').removeClass('scroll-smoth');
            }, 600);
        });
        //  Scroll to Next/Prev section when click in "Next/Prev" Button 
        jQuery('.page-template-template-our-businesses .next-prev .next').click(function (e) {
            jQuery('.page-template-template-our-businesses .page-our-businesses.section-scroll').addClass('scroll-smoth');
            let totalWidth = 0;
            for (var i = 1; i <= jQuery(this).closest('.section').attr('data-tab-index'); i++) {
                totalWidth += jQuery('.page-template-template-our-businesses .page-our-businesses.section-scroll .section[data-tab-index=' + i + ']').outerWidth(true);
            }
            document.getElementsByClassName('section-scroll')[0].scrollLeft = totalWidth;
            setTimeout(function () {
                jQuery('.page-template-template-our-businesses .page-our-businesses.section-scroll').removeClass('scroll-smoth');
            }, 600);
            e.preventDefault();
        });
        jQuery('.page-template-template-our-businesses .next-prev .prev').click(function (e) {
            jQuery('.page-template-template-our-businesses .page-our-businesses.section-scroll').addClass('scroll-smoth');
            let totalWidth = 0;
            for (var i = 1; i < jQuery(this).closest('.section').attr('data-tab-index') - 1; i++) {
                totalWidth += jQuery('.page-template-template-our-businesses .page-our-businesses.section-scroll .section[data-tab-index=' + i + ']').outerWidth(true);
            }
            document.getElementsByClassName('section-scroll')[0].scrollLeft = totalWidth;
            setTimeout(function () {
                jQuery('.page-template-template-our-businesses .page-our-businesses.section-scroll').removeClass('scroll-smoth');
            }, 600);
            e.preventDefault();
        });
        jQuery('.section-first .anime-text').each(function () {
            jQuery(this).addClass('in');
        });
        sectionIsInViewport();
        // Animation show/hide Our Businesses Detail
        jQuery('.actions .action').on('click', function () {
            stopVideo();
            AOS.refreshHard();
            let dataTabPtPage = jQuery(this).closest('.section').attr('data-tab');
            if (dataTabPtPage != '') {
                history.pushState('', '', (window.location.origin + window.location.pathname + '#' + dataTabPtPage));
                jQuery('body').animate({ paddingTop: "0px" }).addClass('main-not-show');
                jQuery('.pt-page[data-tab="' + dataTabPtPage + '"]').addClass('pt-page-current');
                jQuery('.pt-page[data-tab="' + dataTabPtPage + '"]').addClass('pt-page-moveFromBottom');
                setTimeout(function () {
                    jQuery('.pt-page[data-tab="' + dataTabPtPage + '"').removeClass('pt-page-moveFromBottom');
                }, 600);
                jQuery('.page-our-businesses').addClass('pt-page-moveToTopEasing');
                setTimeout(function () {
                    jQuery('.page-our-businesses').removeClass('pt-page-moveToTopEasing')
                    jQuery('.page-our-businesses').removeClass('pt-page-current');
                }, 700);
                setTimeout(function () {
                    AOS.init({
                        once: true
                    });
                }, 1000);
                jQuery('.footer-nav-widgets-wrapper').fadeIn();
                jQuery('footer').fadeIn();
                setTopHeaderChildOurBusinesses();
            }
            return false;
        });
        jQuery('.pt-page .button-back').on('click', function () {
            stopVideo();
            let parent = jQuery(this).closest('.pt-page');

            jQuery('.page-our-businesses').addClass('pt-page-current');
            jQuery('body').animate({ paddingTop: ((jQuery('header').height() + jQuery('.top-menu').height()) + jQuery('.top-menu').height()) + "px" }).removeClass('main-not-show');
            parent.addClass('pt-page-moveToBottomEasing');
            setTimeout(function () {
                parent.removeClass('pt-page-moveToBottomEasing');
                parent.removeClass('pt-page-current');
            }, 600);
            jQuery('.page-our-businesses').addClass('pt-page-moveFromTop');
            jQuery('.page-our-businesses').addClass('pt-page-ontop');
            setTimeout(function () {
                jQuery('.page-our-businesses').removeClass('pt-page-moveFromTop');
                jQuery('.page-our-businesses').removeClass('pt-page-ontop');
            }, 700);
            jQuery('.footer-nav-widgets-wrapper').fadeOut();
            jQuery('footer').fadeOut();
            setTimeout(function () {
                jQuery('.top-menu').fadeIn();
                jQuery('header').fadeIn();
                headerPosition();
                parent.find('.aos-init').each(function () {
                    jQuery(this).removeClass('aos-animate').removeClass('aos-init');
                });
            }, 700);

            jQuery('header .sub-menu').each(function () {
                jQuery(this).removeClass('show');
            });
            jQuery('header li.menu-item-has-children').each(function () {
                jQuery(this).removeClass('focus');
            });

            history.pushState('', '', (window.location.origin + window.location.pathname));
            return false;
        });
    }
    if (jQuery('body .loading').length > 0) {
        jQuery('body .loading').fadeOut().delay(400).remove();
    }

    if (jQuery('.icon-next-section').length) {
        jQuery('.icon-next-section').click(function () {
            var scrollNextSection = jQuery(this).closest('.sub-page-header').next().offset().top - jQuery('#site-header').height();
            jQuery('html').animate({
                scrollTop: scrollNextSection
            }, 0);
        });
    }

    headerPosition();
    setTopHeaderChildOurBusinesses();
});

jQuery(window).resize(function () {
    setTopHeaderChildOurBusinesses();
    headerPosition();
    headerSticky();
    homeBannerSliderFixed();
    hideHomeBannerScrollOver();
    positionSustainabilityMediaFixed();
    setHeight404();

    if (iphoneiOS() || /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        jQuery('body').addClass('mobile-device');
    } else {
        jQuery('body').removeClass('mobile-device');
    }
});

jQuery(window).on('orientationchange', function () {
    setTopHeaderChildOurBusinesses();
    headerPosition();
    headerSticky();
    homeBannerSliderFixed();
    hideHomeBannerScrollOver();
    positionSustainabilityMediaFixed();
    setHeight404();

    if (iphoneiOS() || /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        jQuery('body').addClass('mobile-device');
    } else {
        jQuery('body').removeClass('mobile-device');
    }
});
