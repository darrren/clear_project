requirejs.config({
	baseUrl: "../js",
	paths: {
		jquery			: "lib/jquery",
		jqMigrate		: "lib/jquery-migrate",
		magnificPopup	: "lib/jquery.magnific-popup",
		lazyload		: "lib/jquery.lazyload",
		selectric		: "lib/jquery.selectric",
		slick			: "lib/slick",
		domReady		: "requirejs/plugin/domReady",
		async			: "requirejs/plugin/async",
		gmap			: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBOf0FakDlFZNHhj_0idJiE-Yv5MIjXJ3g&sensor=false",
		tweenmax		: "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/TweenMax.min",
		timelinemax		: "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.5/TimelineMax.min"
	},
	shim: {
		jqMigrate: ["jquery"],
		magnificPopup: ["jquery"],
		lazyload: ["jquery"],
		selectric: ["jquery"],
		slick: ["jquery"],
		tweenmax: {
			exports: "TweenMax"
		},
		timelinemax: {
			deps: ["tweenmax"],
			exports: "TimelineMax"
		}
	}
});