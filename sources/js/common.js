var ua = navigator.userAgent.toLowerCase();
var isDevices = ua.match(/(iphone|ipad|ipod|android)/);

var IE9down = false;
var IpadFlag = false;
var MobileFlag = false;
var isPopupOpen = false;


define('common', [], function () {
    return {
        init: function (pageFunction) {
            var self = this;

            require(["domReady!"], function () {
                console.log('domReady onload');
                setTimeout(function () {
                    self.hideLoading();

                    setTimeout(function () {
                        self.pageLoaded();
                    }, 200);
                }, 200);
            });

            require(["jquery", "jqMigrate", "tweenmax", "timelinemax"], function ($, jqMigrate, TweenMax, TimelineMax) {
                console.log('jquery loaded');
                $(document).ready(function () {
                    console.log('document ready');
                    self.detectBroswer();
                    new responsive();

                    self.headerInit();
                    self.footerInit();

                    if (typeof pageFunction === 'function') {
                        pageFunction.call(this);
                    }
                });
            });
        },
        showLoading: function () {
            $('.loading').fadeIn(400);
        },
        hideLoading: function () {
            $('.loading').fadeOut(400);
        },
        detectBroswer: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            var ver = window.navigator.appVersion.toLowerCase();
            var gHasTouch = 'ontouchstart' in window;

            if (!gHasTouch) {
                $('body').addClass('noTouch');
            }

            if (ua.indexOf("msie") != -1) {
                if (ver.indexOf("msie 6.") != -1) {
                    IE9down = true;
                } else if (ver.indexOf("msie 7.") != -1) {
                    IE9down = true;
                } else if (ver.indexOf("msie 8.") != -1) {
                    IE9down = true;
                } else if (ver.indexOf("msie 9.") != -1) {
                    IE9down = true;
                } else if (ver.indexOf("msie 10.") != -1) {
                    IE9down = false;
                } else {
                    IE9down = false;
                }
            }

            if (ua.match(/(iphone)/) || ua.match(/(ipad)/) || ua.match(/(ipod)/) || ua.match(/(android)/)) {
                MobileFlag = true;
            }

            if (ua.match(/(ipad)/)) {
                IpadFlag = true;
            }

            if (IE9down) {
                jQuery.fx.interval = 1000 / 30;
            } else {
                jQuery.fx.interval = 1000 / 60;
            }
        },
        /******************************** PAGE LOADED *******************************/
        pageLoaded: function () {
            var self = this;

            $('body').addClass('animateIn');
            self.headerTransition();
        },
        /******************************** HEADER *******************************/
        headerInit: function () {
            var self = this;

            var subMenuHeight = [];
            var searchWrapperHeight = 0;

            TweenMax.set('.header .menuArrow', {
                x: $('.header .menuItem').eq(0).offset().left + ($('.header .menuItem').eq(0).width() / 2) - (28 / 2),
                'border-bottom-width': 0
            });


            $('.loginBoxBtn').on('click', function (e) {
                e.preventDefault();

                popup($('.loginPopup'));
                setTimeout(function () {
                    $('.menuCloseBtn').trigger('click');
                }, 800);
            });


            /*************** desktop ***************/
            $('.headerBot .menuItem .mainCat').on('mouseenter', function () {
                    if ($('body').hasClass('desktop')) {
                        var parent = $(this).parent();
                        var idx = parent.index();


                        if (parent.find('.subMenuItemsContainer').length) {
                            $('.headerBot .menuItem').removeClass('active');
                            parent.addClass('active');

                            $('.headerBot .menuItem .subMenuItemsContainer').css({
                                'z-index': 1
                            });


                            if (!$('.headerBot').hasClass('headerMenuOpen')) {
                                $('.headerBot').addClass('headerMenuOpen');

                                TweenMax.to(parent.find('.subMenuItemsContainer'), 0.7, {
                                    autoAlpha: 1,
                                    ease: Expo.easeInOut
                                });
                                TweenMax.to('.headerBot .subMenuBg', 0.5, {
                                    height: subMenuHeight[idx],
                                    ease: Expo.easeInOut
                                });
                            } else {
                                TweenMax.to($('.headerBot .menuItem .subMenuItemsContainer'), 0.4, {
                                    autoAlpha: 0,
                                    ease: Expo.easeInOut
                                });
                                TweenMax.set(parent.find('.subMenuItemsContainer'), {
                                    'z-index': 2
                                });
                                TweenMax.to(parent.find('.subMenuItemsContainer'), 0.7, {
                                    autoAlpha: 1,
                                    ease: Expo.easeInOut
                                });
                                TweenMax.to('.headerBot .subMenuBg', 0.5, {
                                    height: subMenuHeight[idx],
                                    ease: Expo.easeInOut
                                });
                            }


                            TweenMax.to('.header .menuArrow', 0.5, {
                                x: parent.offset().left + (parent.width() / 2) - (28 / 2),
                                ease: Expo.easeInOut
                            });
                            TweenMax.to('.header .menuArrow', 0.3, {
                                'border-bottom-width': 5,
                                ease: Power1.easeOut
                            });
                        }
                    }
                })
                .on('mouseleave', function () {});


            $('.header .headerBot').on('mouseleave', function () {
                if ($('body').hasClass('desktop')) {
                    if ($('.headerBot').hasClass('headerMenuOpen')) {
                        $('.headerBot').removeClass('headerMenuOpen');

                        TweenMax.to($('.headerBot .menuItem .subMenuItemsContainer'), 0.4, {
                            autoAlpha: 0,
                            ease: Expo.easeOut,
                            onComplete: function () {
                                if (!$('.headerBot').hasClass('headerMenuOpen')) {
                                    $('.headerBot .menuItem').removeClass('active');
                                }
                            }
                        });
                        TweenMax.to('.headerBot .subMenuBg', 0.4, {
                            height: 0,
                            ease: Expo.easeInOut
                        });
                        TweenMax.to('.header .menuArrow', 0.3, {
                            'border-bottom-width': 0,
                            ease: Power1.easeOut
                        });
                    }
                }
            });

            /*************** mobile ***************/
            $('.headerBot .menuItem .mainCat').on('click', function (e) {
                if ($('body').hasClass('mobile') || $('body').hasClass('tablet')) {

                    var parent = $(this).parent();
                    var idx = parent.index();

                    if (parent.find('.subMenuItemsContainer').length) {
                        e.preventDefault();

                        parent.addClass('opening');

                        if (!parent.hasClass('open')) {
                            parent.addClass('open');
                            $(this).find('.arrow').removeClass('icon-menuarrowd').addClass('icon-menuarrowt');

                            TweenMax.to(parent.find('.subMenuItemsContainer'), 0.7, {
                                height: subMenuHeight[idx],
                                ease: Power3.easeOut
                            });
                        } else {
                            parent.removeClass('opening');
                            parent.removeClass('open');
                            $(this).find('.arrow').removeClass('icon-menuarrowt').addClass('icon-menuarrowd');

                            TweenMax.to(parent.find('.subMenuItemsContainer'), 0.7, {
                                height: 0,
                                ease: Power3.easeOut
                            });
                        }
                    }
                }
            });

            $('.header .menuBtn').on('click', function () {
                if (!$(this).hasClass('menuCloseBtn')) {
                    self.menuOpenFn();
                }
            });

            $(document).on('click', '.menuCloseBtn', function () {
                self.menuCloseFn();
            });

            $(document).on('click', '.menuDim', function () {
                self.menuCloseFn();
            });

            $('.searchBtn').on('click', function () {
                if ($('body').hasClass('mobile') || $('body').hasClass('tablet')) {
                    if ($(this).hasClass('open')) {
                        $(this).removeClass('open');
                        TweenMax.to('.searchWrapper', 0.6, {
                            height: 0,
                            ease: Power3.easeOut
                        });
                        TweenMax.to('.searchWrapper .searchContainer', 0.6, {
                            y: -5,
                            ease: Power3.easeOut
                        });
                    } else {
                        $(this).addClass('open');
                        TweenMax.to('.searchWrapper', 0.8, {
                            height: searchWrapperHeight,
                            ease: Power3.easeOut
                        });
                        TweenMax.to('.searchWrapper .searchContainer', 0.6, {
                            y: 0,
                            ease: Power3.easeOut
                        });
                    }
                }
            });




            $(document).on('responsive.headerInit', function () {
                TweenMax.set('.headerBot .menuItem .subMenuItemsContainer', {
                    height: 'auto'
                });

                for (var i = 0; i < $('.headerBot .menuItem .subMenuItemsContainer').length; i++) {
                    var idx = $('.headerBot .menuItem .subMenuItemsContainer').eq(i).parent().index();
                    subMenuHeight[idx] = $('.headerBot .menuItem .subMenuItemsContainer').eq(i).height();
                }



                if ($('body').hasClass('mobile') || $('body').hasClass('tablet')) {
                    $('.searchWrapper').css({
                        'height': 'auto'
                    });
                    searchWrapperHeight = $('.searchWrapper').height();
                    TweenMax.set('.searchWrapper', {
                        height: 0
                    });
                    TweenMax.set('.searchWrapper .searchContainer', {
                        y: -5
                    });

                    TweenMax.set('.headerBot .menuItem .subMenuItemsContainer', {
                        autoAlpha: 1,
                        height: 0
                    });
                } else {
                    TweenMax.set('.headerBot .menuItem .subMenuItemsContainer', {
                        autoAlpha: 0
                    });
                    self.menuCloseFn();
                }
            });
            $(document).trigger('responsive.headerInit');

            $(window).on('resize.headerInit', function () {
                if ($('.headerBot').hasClass('menuOpen')) {
                    TweenMax.set('.headerBot', {
                        width: $(window).width() - 48,
                        height: $(window).height()
                    });
                    TweenMax.set('.innerWrapper', {
                        x: $(window).width() - 48,
                        height: $(window).height()
                    });
                }
            });
        },
        headerTransition: function () {
            var self = this;

            if ($('body').hasClass('desktop')) {
                TweenMax.to(".header .logo", 0.8, {
                    y: 0,
                    opacity: 1,
                    ease: Power1.easeOut
                });
            } else {
                TweenMax.to(".header .logo", 0.5, {
                    y: 0,
                    opacity: 1,
                    ease: Power1.easeOut
                });
            }

            TweenMax.staggerTo(".header .menuItem:not('.onlyM') .mainCat, .rewardBtn", 0.6, {
                x: 0,
                opacity: 1,
                ease: Power1.easeOut,
                delay: 0.2
            }, 0.1);

            self.hamburgerTransition();
        },
        menuOpenFn: function () {
            $('body').css({
                'overflow': 'hidden'
            });

            TweenMax.to('.menuDim', 0.5, {
                autoAlpha: 1,
                ease: Power3.easeOut
            });

            $('.headerBot').addClass('menuOpen');
            TweenMax.set('.headerBot', {
                width: $(window).width() - 48,
                height: $(window).height()
            });

            TweenMax.set('.innerWrapper', {
                height: $(window).height()
            });
            TweenMax.to('.innerWrapper', 0.5, {
                x: $(window).width() - 48,
                ease: Power3.easeOut
            });

            TweenMax.set(".menuBtn .bg", {
                width: 0
            });
            TweenMax.to(".menuBtn .bg", 0.8, {
                width: '100%',
                backgroundColor: '#00919f',
                ease: Power3.easeOut
            });

            var tl = new TimelineMax();
            tl.to(".menuBtn .l1 span", 0.3, {
                width: 0,
                ease: Power3.easeOut
            });
            tl.to(".menuBtn .l2 span", 0.3, {
                width: 0,
                ease: Power3.easeOut
            }, "-=0.3");
            tl.to(".menuBtn .l3 span", 0.3, {
                width: 0,
                ease: Power3.easeOut
            }, "-=0.3");

            tl.set(".menuBtn .l1", {
                top: '50%',
                left: '50%',
                rotation: 45
            });
            tl.set(".menuBtn .l2", {
                top: '50%',
                left: '50%',
                x: -2,
                rotation: -45
            });
            tl.set(".menuBtn .l1 span", {
                height: 2
            });
            tl.set(".menuBtn .l2 span", {
                height: 2
            });

            tl.to(".menuBtn .l1 span", 0.5, {
                width: 40,
                x: '-=20',
                backgroundColor: '#ffffff',
                ease: Elastic.easeOut.config(1, 0.6)
            });
            tl.to(".menuBtn .l2 span", 0.5, {
                width: 40,
                x: '-=20',
                backgroundColor: '#ffffff',
                ease: Elastic.easeOut.config(1, 0.6)
            }, "-=0.5");
            tl.set(".menuBtn .l3 span", {
                width: 0
            });

            setTimeout(function () {
                $('.header .menuBtn').addClass('menuCloseBtn');
            }, 200);
        },
        menuCloseFn: function () {
            var self = this;

            TweenLite.killTweensOf(".menuBtn .l1 span");

            $('body').css({
                'overflow': ''
            });

            TweenMax.to('.menuDim', 0.5, {
                autoAlpha: 0,
                ease: Power3.easeOut
            });


            TweenMax.set('.innerWrapper', {
                height: 'auto'
            });
            $('.headerBot').removeClass('menuOpen');
            TweenMax.set('.headerBot', {
                height: 'auto'
            });

            TweenMax.to('.innerWrapper', 0.5, {
                x: '0%',
                ease: Power3.easeOut,
                onComplete: function () {
                    $('.innerWrapper').css({
                        transform: 'none'
                    });
                    TweenMax.set('.headerBot', {
                        width: 'auto'
                    });
                }
            });

            TweenMax.to(".menuBtn .bg", 0.5, {
                width: 0,
                backgroundColor: '#ffffff',
                ease: Power3.easeOut
            });


            if ($('.menuBtn').hasClass('menuCloseBtn')) {
                TweenMax.to(".menuBtn .l1 span", 0.3, {
                    width: 0,
                    x: '+=20',
                    ease: Power3.easeOut
                });
                TweenMax.to(".menuBtn .l2 span", 0.3, {
                    width: 0,
                    x: '+=20',
                    ease: Power3.easeOut
                });
            }


            $('.header .menuBtn').removeClass('menuCloseBtn');

            setTimeout(function () {
                self.hamburgerTransition();
            }, 200);
        },
        hamburgerTransition: function () {
            TweenMax.set(".menuBtn .l1", {
                top: '32%',
                left: '20%',
                rotation: 0
            });
            TweenMax.set(".menuBtn .l2", {
                top: '49%',
                left: '20%',
                x: 0,
                rotation: 0
            });

            TweenMax.set(".menuBtn .l1 span", {
                height: 3,
                backgroundColor: '#333333'
            });
            TweenMax.set(".menuBtn .l2 span", {
                height: 3,
                backgroundColor: '#333333'
            });

            var tl = new TimelineMax();
            tl.to(".menuBtn .l1 span", 0.8, {
                width: 48 * 0.6,
                rotation: 0,
                ease: Elastic.easeOut.config(1, 0.5),
                delay: 0.1
            });
            tl.to(".menuBtn .l2 span", 0.8, {
                width: 48 * 0.4,
                rotation: 0,
                ease: Elastic.easeOut.config(1, 0.5)
            }, "-=0.7");
            tl.to(".menuBtn .l3 span", 0.8, {
                width: 48 * 0.5,
                rotation: 0,
                ease: Elastic.easeOut.config(1, 0.5)
            }, "-=0.7");
        },
        /******************************** Footer *******************************/
        footerInit: function () {
            $('.backToTopBtn').click(function (e) {
                e.preventDefault();

                TweenMax.to('html, body', 0.6, {
                    scrollTop: 0,
                    ease: Expo.easeOut
                });
            });

            $(window).on('scroll.footer', function () {
                if ($(window).scrollTop() > 10) {
                    TweenMax.to('.bttBox .backToTopBtn', 0.5, {
                        autoAlpha: 1,
                        ease: Power3.easeOut
                    });
                } else {
                    TweenMax.to('.bttBox .backToTopBtn', 0.5, {
                        autoAlpha: 0,
                        ease: Power3.easeOut
                    });
                }

                if ($(this).scrollTop() + window.innerHeight > $('.footer').offset().top + 35) {
                    TweenMax.set('.bttBox', {
                        'margin-bottom': $(this).scrollTop() + window.innerHeight - $('.footer').offset().top - 35
                    });
                } else {
                    TweenMax.set('.bttBox', {
                        'margin-bottom': 0
                    });
                }
            });
            $(window).trigger('scroll.footer');

            $(window).on('responsive.footer', function () {
                $(window).trigger('scroll.footer');
            });
        }
    }
});


/******************************** RESPONSIVE *******************************/
var layout;

function responsive() {
    var _self = this;

    _self.layoutSize = [0, 750, 980];
    _self.layout = ['mobile', 'tablet', 'desktop'];
    // _self.layoutSize = [0, 980];
    // _self.layout = ['mobile', 'desktop'];

    _self.window = $(window);
    _self.body = $('body');
    _self.current = _self.layout[_self.layout.length - 1];
    if (IE9down) {
        _self.changeClass(_self.layout[1]);
    } else {
        _self.init();
    }
}
responsive.prototype.init = function () {
    var _self = this;

    _self.changeClass(_self.layout[_self.checkSize()]);
    _self.addEvent();
}
responsive.prototype.addEvent = function () {
    var _self = this;

    _self.window.on('resize', function () {
        _self.changeClass(_self.layout[_self.checkSize()]);
    });
}
responsive.prototype.checkSize = function () {
    var _self = this;

    var _layout = 0;

    for (var i = 0; i < _self.layoutSize.length; i++) {
        if (_self.layoutSize[i] > _self.window.width()) {
            break;
        } else {
            _layout = i;
        }
    }
    return _layout;
}
responsive.prototype.changeClass = function (className) {
    var _self = this;

    if (!_self.body.hasClass(className)) {
        for (var i = 0; i < _self.layoutSize.length; i++) {
            _self.body.removeClass(_self.layout[i]);
        }
        _self.body.addClass(className);
        layout = className;
        $(document).trigger('responsive', className);
    }
}


/******************************** Tabs *******************************/
var tabContentHeight = 0;
function tabsInit(container, selfClose) {
    if (typeof selfClose == 'undefined') {
        selfClose = false;
    }

    TweenMax.set(container + ' .tabHead .tabArrow', {
        x: $(container + ' .tabHead .tabHeadItem').eq(0).offset().left + ($(container + ' .tabHead .tabHeadItem').eq(0).width() / 2) - parseInt($(container + ' .tabHead .tabArrow').css('border-left-width')),
        'border-bottom-width': 0
    });

    if ($(container).find('.tabHeadItem.active').length) {
        setTab(container, $(container).find('.tabHeadItem.active').index() + 1);
    } else {
        TweenMax.set(container + ' .tabContent .tabContentItem', {
            autoAlpha: 0,
            'z-index': 1
        });
    }

    $(container + ' .tabHead .tabHeadItem').on('click', function (e) {
        e.preventDefault();

        var self = $(this);
        var idx = self.index();

        if (!selfClose) {
            $(container + ' .tabHead .tabHeadItem').removeClass('active');
            self.addClass('active');

            tabSlideDown(container, idx);
        } else {
            if (self.hasClass('active')) {
                self.removeClass('active');
                $(container + ' .tabContent .tabContentItem').removeClass('active');

                TweenMax.to(container + ' .tabHead .tabArrow', 0.3, {
                    'border-bottom-width': 0,
                    ease: Power1.easeOut
                });

                TweenMax.to(container + ' .tabContent', 0.5, {
                    height: 0,
                    ease: Expo.easeOut
                });
                TweenMax.to(container + ' .tabContent .tabContentItem', 0.5, {
                    autoAlpha: 0,
                    ease: Expo.easeOut
                });
            } else {
                $(container + ' .tabHead .tabHeadItem').removeClass('active');
                self.addClass('active');
                tabSlideDown(container, idx);
            }
        }
    });

    var resizeTimeout = null;
    $(window).on('resize.tab', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            TweenMax.set(container + ' .tabContent .tabContentItem.active .innertabContentItem', {
                height: 'auto'
            });

            if (!$('body').hasClass('desktop') && container == '.cartContainer') {
                tabContentHeight = $(container + ' .tabContent .tabContentItem.active').outerHeight(true);

                var maxheight = window.innerHeight - $('.tabHead').height() - $('.innerHeader').height();

                if (tabContentHeight > maxheight) {
                    TweenMax.set(container + ' .tabContent .tabContentItem.active .innertabContentItem', {
                        height: maxheight
                    });
                } else {
                    TweenMax.set(container + ' .tabContent .tabContentItem.active .innertabContentItem', {
                        height: tabContentHeight
                    });
                }
            } else {
                TweenMax.set(container + ' .tabContent .tabContentItem.active .innertabContentItem', {
                    height: 'auto'
                });

                tabContentHeight = $(container + ' .tabContent .tabContentItem.active').outerHeight(true);
            }

            TweenMax.set($(container + ' .tabContent .tabContentItem.active').parent(), {
                height: tabContentHeight
            });
        }, 300);
    });

    $(window).trigger('resize.tab');
}

function tabSlideDown(container, idx) {
    $(container + ' .tabContent .tabContentItem').removeClass('active');

    tabContentHeight = $(container + ' .tabContent .tabContentItem').eq(idx).outerHeight(true);

    TweenMax.to(container + ' .tabHead .tabArrow', 0.5, {
        x: $(container + ' .tabHead .tabHeadItem').eq(idx).offset().left + ($(container + ' .tabHead .tabHeadItem').eq(idx).width() / 2) - parseInt($(container + ' .tabHead .tabArrow').css('border-left-width')),
        ease: Expo.easeInOut
    });
    if ($('body').hasClass('mobile')) {
        TweenMax.to(container + ' .tabHead .tabArrow', 0.3, {
            'border-bottom-width': 10,
            ease: Power1.easeOut
        });
    } else {
        TweenMax.to(container + ' .tabHead .tabArrow', 0.3, {
            'border-bottom-width': 16,
            ease: Power1.easeOut
        });
    }

    TweenMax.set(container + ' .tabContent .tabContentItem', {
        'z-index': 1
    });
    TweenMax.to(container + ' .tabContent .tabContentItem', 0.5, {
        autoAlpha: 0,
        ease: Expo.easeOut,
        onComplete: function () {
            // TweenMax.set(container + ' .tabContent .tabContentItem:not(:eq('+ idx +'))', {'display':'none'});
        }
    });
    TweenMax.set(container + ' .tabContent .tabContentItem:eq(' + idx + ')', {
        'z-index': 2
    });
    // TweenMax.set(container + ' .tabContent .tabContentItem:eq('+ idx +')', {'z-index':2, 'display':'block'});
    TweenMax.to(container + ' .tabContent .tabContentItem:eq(' + idx + ')', 0.7, {
        autoAlpha: 1,
        ease: Expo.easeInOut
    });


    setCartTabContentHeight(container, idx, tabContentHeight);
}

function setCartTabContentHeight(container, idx, tabContentHeight) {
    if (!$('body').hasClass('desktop') && container == '.cartContainer') {
        var maxheight = window.innerHeight - $('.tabHead').height() - $('.innerHeader').height();

        if (tabContentHeight > maxheight) {
            TweenMax.to(container + ' .tabContent', 0.5, {
                height: maxheight,
                ease: Expo.easeOut,
                onComplete: function () {
                    $(container + ' .tabContent .tabContentItem').eq(idx).addClass('active');
                    TweenMax.set(container + ' .tabContent .tabContentItem:eq(' + idx + ') .innertabContentItem', {
                        height: maxheight
                    });
                }
            });
        } else {
            TweenMax.to(container + ' .tabContent', 0.5, {
                height: tabContentHeight,
                ease: Expo.easeOut,
                onComplete: function () {
                    $(container + ' .tabContent .tabContentItem').eq(idx).addClass('active');
                    TweenMax.set(container + ' .tabContent .tabContentItem:eq(' + idx + ') .innertabContentItem', {
                        height: tabContentHeight
                    });
                }
            });
        }
    } else {
        TweenMax.to(container + ' .tabContent', 0.5, {
            height: tabContentHeight,
            ease: Expo.easeOut,
            onComplete: function () {
                $(container + ' .tabContent .tabContentItem').eq(idx).addClass('active');
                TweenMax.set(container + ' .tabContent .tabContentItem:eq(' + idx + ') .innertabContentItem', {
                    height: 'auto'
                });
            }
        });
    }
}

function setTab(container, num) {
    $(container + ' .tabHead .tabHeadItem').removeClass('active');
    $(container + ' .tabHead .tabHeadItem').eq(num - 1).addClass('active');

    $(container + ' .tabContent .tabContentItem').removeClass('active');
    $(container + ' .tabContent .tabContentItem').eq(num - 1).addClass('active');

    TweenMax.set(container + ' .tabContent', {
        height: $(container + ' .tabContent .tabContentItem').eq(num - 1).outerHeight(true)
    });
    TweenMax.set(container + ' .tabContent .tabContentItem', {
        autoAlpha: 0,
        'z-index': 1
    });
    TweenMax.set(container + ' .tabContent .tabContentItem:eq(' + (num - 1) + ')', {
        autoAlpha: 1,
        'z-index': 2
    });
}


/******************************** Accordion *******************************/
var accordionContentHeight = [];

function accordion() {
    $('.accordionItem').each(function (i) {
        var self = $(this);

        accordionContentHeight[i] = $(this).find('.accordionContent').height();

        if (!$(this).hasClass('show')) {
            TweenMax.set(self.find('.accordionContent'), {
                height: 0
            });
        } else {
            $(this).find('.title .ico').removeClass('icon-menuarrowd').addClass('icon-menuarrowt');
        }


        $(this).find('.title').on('click', function (e) {
            e.preventDefault();

            var parent = $(this).parent();
            var idx = parent.index();

            parent.find('.accordionContent').css({
                'height': 'auto'
            });
            accordionContentHeight[i] = parent.find('.accordionContent').height();


            if (parent.hasClass('show')) {
                parent.removeClass('show');
                $(this).find('.ico').removeClass('icon-menuarrowt').addClass('icon-menuarrowd');
                TweenMax.set(parent.find('.accordionContent'), {
                    'overflow': 'hidden'
                });
                TweenMax.to(parent.find('.accordionContent'), 0.5, {
                    height: 0,
                    onUpdate: function () {
                        $(window).trigger('scroll');
                    },
                    ease: Expo.easeOut
                });
            } else {
                parent.addClass('show');
                $(this).find('.ico').removeClass('icon-menuarrowd').addClass('icon-menuarrowt');
                TweenMax.set(parent.find('.accordionContent'), {
                    height: 0
                });
                TweenMax.to(parent.find('.accordionContent'), 0.5, {
                    height: accordionContentHeight[i],
                    ease: Expo.easeOut,
                    onUpdate: function () {
                        $(window).trigger('scroll');
                    },
                    onComplete: function () {
                        TweenMax.set(parent.find('.accordionContent'), {
                            height: 'auto',
                            'overflow': 'visible'
                        });
                    }
                });
            }
        });
    });

    $(window).on('resize.accordion', function () {

    });
}


/******************************** POPUP *******************************/
function popup(option) {
    var defaults = {
        selector: '',
        mainClass: 'mfp-fade',
        removalDelay: 500,
        showCloseBtn: true,
        closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close"><span class="ico icon-cross"></span></button>',
        closeOnBgClick: true,
        items: {
            src: '',
            type: "inline"
        },
        callbacks: {
            open: function () {},
            close: function () {},
            afterClose: function () {}
        }
    }

    var settings = $.extend({}, defaults, option);

    $.magnificPopup.close();

    if (isDevices) {
        $('html,body').animate({
            'scrollTop': 0
        }, 200);
    }

    setTimeout(function () {
        $.magnificPopup.open({
            mainClass: settings.mainClass,
            removalDelay: settings.removalDelay,
            showCloseBtn: settings.showCloseBtn,
            closeMarkup: settings.closeMarkup,
            closeOnBgClick: settings.closeOnBgClick,
            items: {
                src: settings.selector,
                type: settings.type
            },
            callbacks: {
                open: function () {
                    $(window).on('resize.pop', function () {
                        $('.wrapper').css({
                            'height': 'auto'
                        });
                        $('.wrapper').css({
                            'height': window.innerHeight,
                            'overflow': 'hidden'
                        });

                        $('.mfp-content').css({
                            'height': 'auto'
                        });
                        if ($('.mfp-content').height() > window.innerHeight) {
                            $('.mfp-content').css({
                                'height': '100%'
                            });
                        }
                    });

                    setTimeout(function () {
                        if ($('body').hasClass('mobile')) {
                            $(window).trigger('resize.pop');
                        }
                    }, 400);

                    $('.mfp-close, .backBtn').on('click', function () {
                        $.magnificPopup.close();
                    });
                    isPopupOpen = true;

                    if (typeof settings.callbacks.open === 'function') {
                        settings.callbacks.open.call(this);
                    }
                },
                close: function () {
                    $('.wrapper').css({
                        'height': 'auto',
                        'overflow': ''
                    });
                    $(window).off('resize.pop');
                    isPopupOpen = false;

                    if (typeof settings.callbacks.close === 'function') {
                        settings.callbacks.close.call(this);
                    }
                },
                afterClose: function () {
                    if (typeof settings.callbacks.afterClose === 'function') {
                        settings.callbacks.afterClose.call(this);
                    }
                }
            }
        });
    }, 300);
}


/******************************** Slick *******************************/
function slickInit(option) {
    var defaults = {
        selector: '',
        lazyLoad: 'ondemand',
        draggable: false,
        speed: 800,
        infinite: false,
        easing: 'easeOutCubic',
        prevArrow: "<div class='slick-prev'><div class='ico icon-arrowl'></div></div>",
        nextArrow: "<div class='slick-next'><div class='ico icon-arrowr'></div></div>",
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: null
    }

    var settings = $.extend({}, defaults, option);

    $(settings.selector).slick(settings);
}


/******************************** Check Box *******************************/
function checkboxFn(option) {
    var defaults = {
        selector: '',
        multi: false,
        toggle: true //work if multi is FALSE
    }

    var settings = $.extend({}, defaults, option);

    $(settings.selector).find('.listItem').on('click', function (e) {
        e.preventDefault();
        
        if (!settings.multi) {
            if ($(this).hasClass('active')) {
                if (settings.toggle) {
                    $(this).parents(settings.selector).find('.listItem').removeClass('active');

                    $(this).parents(settings.selector).find('.checkbox').removeClass('checked');
                    $(this).parents(settings.selector).find('input[type="checkbox"]').attr('checked', false);
                }
            } else {
                $(this).parents(settings.selector).find('.listItem').removeClass('active');
                $(this).addClass('active');

                $(this).parents(settings.selector).find('.checkbox').removeClass('checked');
                $(this).parents(settings.selector).find('input[type="checkbox"]').attr('checked', false);

                $(this).find('.checkbox').addClass('checked');
                $(this).find('input[type="checkbox"]').attr('checked', true);
            }
        } else {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');

                $(this).find('.checkbox').removeClass('checked');
                $(this).find('input[type="checkbox"]').attr('checked', false);
            } else {
                $(this).addClass('active');

                $(this).find('.checkbox').addClass('checked');
                $(this).find('input[type="checkbox"]').attr('checked', true);
            }
        }
    });
}
