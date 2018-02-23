var gulp = require('gulp'),
    target = require('gulp-css-critical'),
    gutil = require('gulp-util'),
    cleanCSS = require('gulp-clean-css'),
    config = require('./config').critical;

gulp.task("split-css", ['sass'],  function () {
    return gulp.src(config.src)
    .pipe(target({
        base: config.dest
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.output))
    .on('end', function(){ 
        gutil.log(gutil.colors.green('Critical CSS have been generate in: ' + config.dest))
    });
});