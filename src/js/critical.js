(function ($) {
    $.loopDeferScript = function(aListFiles) {
        if(aListFiles.length > 0) {
            for (var i = 0; i < aListFiles.length; i++) {
                document.write('<script src="' + aListFiles[i] + '"><\/script>');
            }
        }
    };

    $.getDefer = function (path) {
        aJsFiles.push(path);
    };

    $.appendDeferScript = function(src) {
        var element = document.createElement("script");
        element.src = src;
        document.body.appendChild(element);
    };
}(jQuery));