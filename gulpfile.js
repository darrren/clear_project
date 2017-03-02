'use strict';

var gulp			= require('gulp');
var sourcemaps      = require('gulp-sourcemaps');
var babel           = require("gulp-babel");
var mainBowerFiles  = require('main-bower-files');
var reqOptimize		= require('gulp-requirejs-optimize');
var sass			= require('gulp-sass');
var cleanCSS        = require('gulp-clean-css');
var concat			= require('gulp-concat');
var filter			= require('gulp-filter');
var uglify			= require('gulp-uglify');
var autoprefixer	= require('gulp-autoprefixer');
var imagemin        = require('gulp-imagemin');
var iconfont		= require('gulp-iconfont');
var iconfontCss		= require('gulp-iconfont-css');
var plumber         = require('gulp-plumber');
var del				= require('del');
var browserSync		= require('browser-sync').create();
var connectSSI		= require('connect-ssi');

var runTimestamp	= Math.round(Date.now()/1000);

var path			= {
	html:	'./html/**/*.html',
	css: 	'./sources/css/scss/**/*.scss',
	js:		'./sources/js/*.js'
}


gulp.task('bower', function() {
    gulp.src(mainBowerFiles('**/*.css'))
    .pipe(gulp.dest('./css/lib'));

    gulp.src(mainBowerFiles('**/*.gif'))
    .pipe(gulp.dest('./css/lib'));

    gulp.src(mainBowerFiles('**/fonts/*'))
    .pipe(gulp.dest('./css/lib/fonts'));

    gulp.src(mainBowerFiles('**/*.js'))
    .pipe(filter(['**/*.js', '!**/require.js', '!**/domReady.js', '!**/requirejs-plugins/**/*.js']))
    .pipe(gulp.dest('./js/lib'));

    gulp.src(mainBowerFiles('**/require.js'))
    .pipe(gulp.dest('./js/requirejs'));
    gulp.src(mainBowerFiles(['**/domReady.js', '**/requirejs-plugins/src/*.js']))
    .pipe(gulp.dest('./js/requirejs/plugin'));
});


gulp.task('browser-sync', ['requirejs', 'Iconfont', 'sass'], function () {
	browserSync.init({
		server: {
            baseDir: ".",
			index: "/html/index.html",
			middleware: [
				connectSSI({
					baseDir: __dirname + '/html',
					ext: '.html'
				})
			]
        },
		open: true
	});
});

gulp.task('clean:dist', function(){
	del.sync("./dist")
});

gulp.task('requirejs', function () {
	return gulp.src([path.js])
//	return gulp.src(['js/common.js', '!js/main.js'])
        .pipe(reqOptimize({
//			mainConfigFile: './js/main.js',
            optimize: "none"
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            "presets": ["es2015", "babili"]
        }))
		.pipe(uglify())
//		.pipe(concat("main.min.js"))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
	return gulp.src(path.css)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
//        .pipe(concat('main.css'))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('image:min', function () {
	return gulp.src('./images/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'));
});

gulp.task('Iconfont', function(){
  return gulp.src(['./sources/images/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: 'fontIco',
      path: './sources/css/scss/_icons_template.scss',
      targetPath: '../sources/css/scss/_icons.scss',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: 'fontIco', // required
      prependUnicode: true, // recommended option
      formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
//    .on('glyphs', function(glyphs, options) {
    // CSS templating, e.g.
//    console.log(glyphs, options);
//    })
    .pipe(gulp.dest('./fonts'));
});

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(path.css, ['sass']).on('change', function(e){
        console.log( e.path +' has been changed.');
    });
    gulp.watch(path.js, ['requirejs']).on('change', function(e){
        console.log( e.path +' has been changed.');
    });
	gulp.watch(path.html).on('change', browserSync.reload);
});

gulp.task('default', ['bower', 'watch']);
