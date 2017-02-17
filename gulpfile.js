'use strict';

var gulp			= require('gulp');
var mainBowerFiles  = require('main-bower-files');
var reqOptimize		= require('gulp-requirejs-optimize');
var sass			= require('gulp-sass');
var concat			= require('gulp-concat');
var filter			= require('gulp-filter');
var uglify			= require('gulp-uglify');
var autoprefixer	= require('gulp-autoprefixer');
var imagemin        = require('gulp-imagemin');
var iconfont		= require('gulp-iconfont');
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


gulp.task('browser-sync', ['requirejs', 'sass', 'Iconfont'], function () {
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
		open: false
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
//		.pipe(uglify())
//		.pipe(concat("main.min.js"))
        .pipe(gulp.dest('./js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
	return gulp.src(path.css)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
//        .pipe(concat('main.css'))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('image:min', function () {
	return gulp.src('./images/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'));
});

gulp.task('Iconfont', function(){
  return gulp.src(['./images/icons/*.svg'])
    .pipe(iconfont({
      fontName: 'myfont', // required
      prependUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
      .on('glyphs', function(glyphs, options) {
        // CSS templating, e.g.
        console.log(glyphs, options);
      })
    .pipe(gulp.dest('./fonts'));
});
 
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(path.css, ['sass']);
    gulp.watch(path.js, ['requirejs']);
	gulp.watch(path.html).on('change', browserSync.reload);
});

gulp.task('default', ['bower', 'watch']);