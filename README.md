# Critical CSS Demo


Note: index.html is PHP file with .html ext.

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

### Loading Critical JS 
```
<script src="/assets/critical/jquery-3.2.1.min.js"></script>
<script src="/assets/critical/fetch-inject.js"></script>
```

### Loading Non CSS/JS after page load
```css
<script type="text/javascript">
     $.getDefer('/assets/css/style.css')
</script>

```js
<script type="text/javascript">
    $.getDefer('/assets/js/jquery.validation.min.js');
    $.getDefer('/assets/js/main.min.js');

    if(aJsFiles.length > 0) {
        if (window.fetch && typeof window.fetch !== 'undefined') {
            fetchInject(aJsFiles);
        } else {
            $.loopDeferScript(aJsFiles);
        }
    }
</script>

```

More info coming soon...
