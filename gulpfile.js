var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var path = require('path');
var notify = require('gulp-notify');

var dependencies = [
    'react'
];
var cssTask = function (options) {
    if (options.development) {
      var run = function () {
        console.log(arguments);
        var start = new Date();
        console.log('Building CSS bundle');
        gulp.src('./styles/application.less')
        .pipe(plumber())
        .pipe(less({
          paths: [ path.join('./styles', 'less', 'includes') ]
        }).on('error', function(err){
          gutil.log(err);
          this.emit('end');
        }))
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
            console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
        }));
      };
      run();
    } else {
      gulp.src(options.src)
        .pipe(concat('main.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(options.dest));   
    }
}
gulp.task('default', function () {
  cssTask({
    development: true,
    src: './styles/**/*.css',
    dest: './public'
  });
});