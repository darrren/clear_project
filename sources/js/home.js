// global var
var data = 'aaa';

define(["test"], function(test){
	return {
		init: function(){
			require(["magnificPopup", "slick"], function(magnificPopup, slick){
				data = 'bbb';
				console.log(test.getValue());

				$(document).ready(function () {
					console.log('home function here!!!');
					accordion();
					tabsInit('.tabsContainer');
				});

				require(["domReady!"], function() {
					TweenMax.to('.box', 1, {x:100});

		//			var tl = new TimelineMax();
		//			tl.to(".box", 1, {x:100, ease: Power3.easeOut});
		//			tl.to(".box", 1, {y:100, ease: Power3.easeOut}, "-=0.3");
		//			tl.to(".box", 1, {x:200, ease: Power3.easeOut}, "-=0.3");
					
//					popup({
//						selector: '.popup',
//						callbacks: {
//							open: function(){
//								console.log('hi');
//							}
//						}
//					});
					
                    slickInit({
						selector: '.productSlider',
						draggable: true,
						speed: 400,
						slidesToShow: 5,
						slidesToScroll: 5,
						responsive: [
							{
								breakpoint: 980,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 1
								}
							}
						]
					});
				});
			});
			
//			require(["async!gmap"], function(gmap){
//				var myLatlng = {lat: 22.310873, lng: 114.125827};
//
//				var map = new google.maps.Map(document.getElementById('map'), {
//					zoom: 10,
//					center: myLatlng,
//					disableDefaultUI: true
//				});
//			});
		}
	}
});