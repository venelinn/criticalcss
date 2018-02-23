var gulp = require('gulp'),
    del = require('del'),
    config = require('./config').clean;

gulp.task('clean', function() {
    return del.sync(config.patterns, config.options);
});