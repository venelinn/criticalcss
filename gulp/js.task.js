var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    pump = require('pump'),
    rename = require("gulp-rename"),
    config = require('./config').js;

gutil.log(config.src +' : '+ config.dest )

gulp.task('js', function (cb) {
  	pump([
    	gulp.src(config.src),
     	uglify(),
     	rename({ suffix: '.min' }),
    	gulp.dest(config.dest)
    	],
    cb
  	);
});