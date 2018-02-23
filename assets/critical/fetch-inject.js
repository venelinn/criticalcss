var fetchInject = (function() {
    'use strict';

    const head = (function(i, s, o, g, r, a, m) {
        a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
        a.appendChild(s.createTextNode(g.text));
        a.onload = r(g);
        m && typeof m !== 'undefined' ? s.head.appendChild(a) : s.head.appendChild(a); }); 
        // ORIGINAL LINE
        // m ? m.parentNode.insertBefore(a, m) : s.head.appendChild(a) }) // eslint-disable-line

    const fetchInject = function(inputs, promise) {
        if (!(inputs && Array.isArray(inputs))) return Promise.reject(new TypeError('`inputs` must be an array'))
        if (promise && !(promise instanceof Promise)) return Promise.reject(new TypeError('`promise` must be a promise'))

        const resources = [];
        const deferreds = promise ? [].concat(promise) : [];
        const thenables = [];

        inputs.forEach(input => deferreds.push(
            window.fetch(input).then(res => {
                return [res.clone().text(), res.blob()]
            }).then(promises => {
                return Promise.all(promises).then(resolved => {
                    resources.push({ text: resolved[0], blob: resolved[1] });
                })
            })
        ));

        return Promise.all(deferreds).then(() => {
            resources.forEach(resource => {
                thenables.push({
                    then: resolve => {
                        resource.blob.type.includes('text/css') ?
                            head(window, document, 'style', resource, resolve) :
                            head(window, document, 'script', resource, resolve);
                    }
                });
            });
            return Promise.all(thenables)
        })
    };

    return fetchInject;

}());