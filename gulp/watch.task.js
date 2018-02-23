var gulp = require('gulp'),
    config = require('./config').sass;

gulp.task('watch', function() {
    gulp.watch(config.src, ['sass']);
});