# Critical CSS Demo


Note: This is PHP file with .html ext.

You need to have NodeJs installed.

1. npm install
2. gulp prod - to generate css

## Usage

### In CSS

```css
/**
  * Target
**/
.target {
  _test: "@include target(test-target) { content: bar }";
}
/*! @{target: critical} */
.target {
  content: bar;
}

/*! {target: critical}@ */
/*! @{target:a-target-without-space} */
.baz {
  content: qux;
}

/*! {target:a-target-without-space}@ */
```

### JavaScript
```javascript
var target = require('gulp-css-critical');

// Same Directory
gulp.task('target', function () {
  return gulp.src('css/**/*.css')
    .pipe(target())
    .pipe(gulp.dest('css/'));
});

// New Directory
gulp.task('target-new', function () {
  return gulp.src('css/**/*.css')
    .pipe(target({
      base: 'output'
    }))
    .pipe(gulp.dest('output/'));
});
```

More info coming soon...
