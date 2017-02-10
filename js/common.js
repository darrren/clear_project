require(["main"], function(){
	
	require(["domReady!"], function() {//salert('1');
		console.log('domReady onload');
//		window.onload = function(){
//			console.log('onload');
			setTimeout(function(){
				hideLoading();

				setTimeout(function()
				{
					pageLoaded();
				}, 200);
			}, 200);
//		}
	});
	
	require(["jquery", "jqMigrate", "tweenmax", "timelinemax"], function($, jqMigrate, TweenMax, TimelineMax){
		console.log('jquery loaded');
		$(document).ready(function () {
			console.log('document ready');
			detectBroswer();
			new responsive();
		});
	});
});


var ua = navigator.userAgent.toLowerCase();
var isDevices = ua.match(/(iphone|ipad|ipod|android)/);

var IE9down = false;
var IpadFlag = false;
var MobileFlag = false;
var isPopupOpen = false;


function showLoading(){
	$('.loading').fadeIn(400);
}

function hideLoading(){
	$('.loading').fadeOut(400);
}


function detectBroswer(){
	var ua = window.navigator.userAgent.toLowerCase();
	var ver = window.navigator.appVersion.toLowerCase();
	var gHasTouch = 'ontouchstart' in window;

	if( !gHasTouch ) {
		$('body').addClass('noTouch');
	}

	if (ua.indexOf("msie") != -1){
		if (ver.indexOf("msie 6.") != -1){
			IE9down =true
		}else if (ver.indexOf("msie 7.") != -1){
			IE9down =true
		}else if (ver.indexOf("msie 8.") != -1){
			IE9down =true
		}else if (ver.indexOf("msie 9.") != -1){
			IE9down =true
		}else if (ver.indexOf("msie 10.") != -1){
			IE9down =false
		}else{
			IE9down =false
		}
	}

	if (ua.match(/(iphone)/) || ua.match(/(ipad)/) || ua.match(/(ipod)/) || ua.match(/(android)/) )	{
		MobileFlag = true;
	}

	if (ua.match(/(ipad)/) )	{
		IpadFlag = true;
	}

	if ( IE9down ) {
		jQuery.fx.interval = 1000 / 30;
	} else {
		jQuery.fx.interval = 1000 / 60;
	}

}

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


/******************************** PAGE LOADED *******************************/
function pageLoaded()
{
	$('body').addClass('animateIn');
}


/******************************** Slick *******************************/
function slickInit( obj )
{
	$(obj.elm).slick({
		lazyLoad: 'ondemand',
		draggable: false,
		speed: 800,
		infinite: false,
		easing: 'easeOutCubic',
		prevArrow: "<div class='slick-prev'><div class='ico icon-arrowl'></div></div>",
		nextArrow: "<div class='slick-next'><div class='ico icon-arrowr'></div></div>",
		slidesToShow: obj.slidesToShow,
		slidesToScroll: obj.slidesToScroll,
		// variableWidth: true,
		responsive: [
			{
				breakpoint: 980,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
					// variableWidth: true
				}
			}
		]
	});

	var responsiveTimeout = null;
	var destroyTimeout = null;
	$(document).off('responsive'+obj.elm).on('responsive'+obj.elm, function()
	{
		clearTimeout(responsiveTimeout);
		responsiveTimeout = setTimeout(function()
		{
			if( $('body').hasClass('desktop') ){
				!$(obj.elm).removeClass('device');

				slickInit( obj );

				if( $(obj.elm).hasClass('added') ){
					var slideIndex = $(obj.elm).find('.slick-slide').length;
					$(obj.elm).slick('slickRemove',slideIndex - 1);

					$(obj.elm).removeClass('added');
				}			
			}
			else{
				if( !$(obj.elm).hasClass('noMoreBtn') && !$(obj.elm).hasClass('added') ){// && $(obj.elm).find('.slick-slide').length > 5 ){
					$(obj.elm).addClass('added');
					$(obj.elm).slick('slickAdd','<div><div class="viewmoreBox"><a href="#"><span>View more</span><br/><span class="ico icon-arrowr"></span></a></div></div>');
				}

				// clearTimeout(destroyTimeout);
				// destroyTimeout = setTimeout(function()
				// {
					$(obj.elm).slick('destroy');
					$(obj.elm).addClass('device');
				// }, 100);
			}
		}, 200);
	});

	if( $('body').hasClass('mobile') || $('body').hasClass('tablet') ){
		$(document).trigger('responsive'+obj.elm);
		$(obj.elm).find('img').lazyload({
			effect : "fadeIn",
			container: $(obj.elm)
		});
	}
}


/******************************** POPUP *******************************/
function popup( obj )
{
	// var jspapi = null;

	if( typeof obj.showcloseBtn == 'undefined' ){
		obj.showcloseBtn = true;
	}
	if( typeof obj.closeOnBg == 'undefined' ){
		obj.closeOnBg = true;
	}

	$.magnificPopup.close();

	if( isDevices ){
		$('html,body').animate({'scrollTop': 0 }, 200);
	}

	setTimeout(function()
	{
		$.magnificPopup.open({
		    mainClass: 'mfp-fade',
//		    prependTo: $('#form1'), 
			removalDelay: 500,
			showCloseBtn: obj.showcloseBtn,
			closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close"><span class="ico icon-cross"></span></button>',
			closeOnBgClick: obj.closeOnBg,
			items: {
				src: obj.selector,
				type: "inline"
			},
			callbacks: {
				open: function(){
					$(window).on('resize.pop', function(){
						$('.wrapper').css({'height':'auto'});
						$('.wrapper').css({'height':window.innerHeight, 'overflow':'hidden'});

						$('.mfp-content').css({'height':'auto'});
						if( $('.mfp-content').height() > window.innerHeight )
						{
							$('.mfp-content').css({'height':'100%'});
						}
					});

					setTimeout(function()
					{
						if( $('body').hasClass('mobile') ){
							$(window).trigger('resize.pop');
						}
					}, 400);

					$('.mfp-close, .backBtn').on('click', function()
					{
						$.magnificPopup.close();
					});
					isPopupOpen = true;

					if( $('.mfp-wrap .popup').hasClass('videoPopup') ){
						videojs('my-video');
					}
				},
				close: function(){
					$('.wrapper').css({'height':'auto', 'overflow':''});
					$(window).off('resize.pop');
					isPopupOpen = false;
				},
				afterClose: function()
				{
				}
			}
		});
	}, 300);
}