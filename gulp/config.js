var gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util');

var src = './src/',
    assets = './assets/',
    sassFolder = src + 'sass/',
    sassSources = sassFolder + '**/*.scss',
    cssDest = assets + 'css/',
    jsSrc = src + 'js/*.js',
    jsDest = assets + 'js',
    criticalDest = 'critical/';

module.exports = {
    clean: {
        patterns: [
            assets + 'css/**',
            assets + 'js/**'
        ],
        options: {
            force: true
        }
    },
    sass: {
        src: sassSources,
        dest: cssDest,
        maps: './maps',
        folder: sassFolder,
        path: path.resolve(sassFolder),
        autoprefix: ['last 4 versions', '> 2%'],
        sassOptions: {
          style: 'expanded',
          sourceComments: true
        }
    },
    js: {
        src: jsSrc,
        dest: jsDest
    },
    critical: {
        src: cssDest + '**/*.css',
        output: cssDest,
        dest: cssDest + 'critical/'
    },
    minify: {
        src: cssDest + 'critical/*.css',
        dest: cssDest + 'critical/'
    },
    rename: {
        src: cssDest + 'critical/*.css',
        ext: '.css.php',
        dest: criticalDest
    }
};