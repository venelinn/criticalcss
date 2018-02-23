var gulp = require('gulp'),
    rename = require("gulp-rename"),
    gutil = require('gulp-util'),
    config = require('./config').rename;

gulp.task("critical", ['minify'], function () {
    return gulp.src(config.src)
    .pipe(rename(function (path) {
        path.extname = config.ext
    }))
    .pipe(gulp.dest(config.dest))
    .on('end', function(){ 
        gutil.log(gutil.colors.green('Copies of Critical CSS files have been generated in: ' + config.dest))
    });
});