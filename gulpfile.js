var gulp = require('gulp'),
    requireDir = require('require-dir');

requireDir('./gulp');

gulp.task('build', ['clean', 'js', 'sass', ]);
gulp.task('prod', ['clean', 'critical', 'js']);
gulp.task('default', ['build', 'prod', 'watch']);