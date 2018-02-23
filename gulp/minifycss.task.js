var gulp = require('gulp'),
    gutil = require('gulp-util'),
    cleanCSS = require('gulp-clean-css'),
    config = require('./config').minify;

gulp.task("minify", ['split-css'], function () {
    return gulp.src(config.src)
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.dest))
    .on('end', function(){ 
        gutil.log(gutil.colors.green('Critical CSS files have been minified'))
    });
});