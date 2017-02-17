requirejs.config({
	baseUrl: "../js",
	waitSeconds: 200,
	paths: {
		jquery			: "lib/jquery",
		jqMigrate		: "lib/jquery-migrate",
		magnificPopup	: "lib/jquery.magnific-popup",
		lazyload		: "lib/jquery.lazyload",
		selectric		: "lib/jquery.selectric",
		slick			: "lib/slick",
		tweenmax		: "lib/TweenMax.min",
		timelinemax		: "lib/TimelineMax.min",
		domReady		: "requirejs/plugin/domReady",
		async			: "requirejs/plugin/async",
		gmap			: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBOf0FakDlFZNHhj_0idJiE-Yv5MIjXJ3g&sensor=false"
	},
	shim: {
		jqMigrate: ["jquery"],
		magnificPopup: ["jquery"],
		lazyload: ["jquery"],
		selectric: ["jquery"],
		slick: ["jquery"],
		tweenmax: {
            deps: ["jquery"],
			exports: "TweenMax"
		},
		timelinemax: {
			deps: ["jquery", "tweenmax"],
			exports: "TimelineMax"
		}
	}
});