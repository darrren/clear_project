# Clear Project Template with Gulp
### Install npm package
```
npm install
```

### Install bower components
```
bower install
```

### Run gulp
```
gulp
```

## require.js config
```javascript
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
		gmap			: "https://maps.googleapis.com/maps/api/js?key=!!!API KEY HERE!!!&sensor=false",
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
```

## Google Map
```javascript
require(["async!gmap"], function(gmap){
  var myLatlng = {lat: 22.310873, lng: 114.125827};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: myLatlng,
    disableDefaultUI: true
  });
});
```

## Components
### Accordion
```html
<div class="accordionContainer">
  <div class="accordionBox">
    <div class="accordionItem show">
      <span class="title">Description</span>
      <div class="accordionContent">
        <ul class="hyphen">
          <li><!-- content here --></li>
        </ul>
      </div>
    </div>
  </div>
</div>
```
#### Show content by default
- Add a class **`show`** in accordionItem

### Tabs
```html
<div class="tabsContainer">
  <div class="tabHead">
    <div class="tabHeadItem active"><!-- label name --></div>
    <div class="tabHeadItem"><!-- label name --></div>
    <div class="tabHeadItem"><!-- label name --></div>
  </div>

  <div class="tabContent">
    <div class="tabContentItem">
      <div class="innertabContentItem">
        <!-- content here -->
      </div>
    </div>
    <div class="tabContentItem">
      <div class="innertabContentItem">
        <!-- content here -->
      </div>
    </div>
    <div class="tabContentItem">
      <div class="innertabContentItem">
        <!-- content here -->
      </div>
    </div>
  </div>
</div>
```
#### Set tab by default
- Add a class **`active`** in tabHeadItem

## Function
### Magnific Popup
[https://github.com/dimsemenov/Magnific-Popup](https://github.com/dimsemenov/Magnific-Popup)
```javascript
popup({
  selector: '.target',
  showcloseBtn: true,
  closeOnBg: true,
  callbacks: {
    open: function(){
      console.log('open');
    },
    close: function(){
      console.log('close');
    },
    afterClose: function(){
      console.log('afterClose');
    }
  }
});
```

### Slick Carousel
[https://github.com/kenwheeler/slick](https://github.com/kenwheeler/slick)
```javascript
slickInit({
	selector: '.target',
	draggable: false,
	speed:  800,
	infinite: false,
	easing: 'easeOutCubic',
	prevArrow: '',
	nextArrow: '',
	slidesToShow: 1,
	slidesToScroll: 1,
	responsive: null
});
```
#### Option
Option | Type | Default
------ | ---- | -------
selector | string | $(element)
draggable | boolean | false
speed | int | 800
infinite | boolean | false
easing | string | 'easeOutCubic'
prevArrow | string | ''
nextArrow | string | ''
slidesToShow | int | 1
slidesToScroll | int | 1
responsive | array | null
