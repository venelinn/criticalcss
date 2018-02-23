var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sassUnicode = require('gulp-sass-unicode'),
    gutil = require('gulp-util'),
    config = require('./config').sass;

gulp.task("sass",  function () {
    return gulp.src(config.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(sassUnicode())
    .pipe(autoprefixer(config.autoprefix))
    .pipe(gulp.dest(config.dest))
    .on('end', function(){ 
        gutil.log(gutil.colors.green('CSS files have been generate in: ' + config.dest))
    });
});