var Parser = (function() {

    function $http(url){
        var core = {
            ajax: function(method, url, args) {
                var promise = new Promise(function(resolve, reject) {
                    var client = new XMLHttpRequest();
                    var uri = url;
                    client.open(method, uri);
                    client.send();
                    client.onload = function () {
                        if (this.status >= 200 && this.status < 300) {
                            resolve(this.response);
                        } else {
                            reject(this.statusText);
                        }
                    };
                    client.onerror = function () {
                        reject(this.statusText);
                    };
                });
                return promise;
            }
        };
        return {
            'get': function(args) {
                return core.ajax('GET', url, args);
            }
        };
    };

    return {

        fetchContent: function() {
            let partials = new Map([
                ["header", "bin/partials/header.html"],
                [".contact", "bin/partials/contact.html"]
            ]);
            var files = [
                'experience'
            ];
            for (const part of partials) {
                fetchFile(part[1], part[0]);
            }
            for (const file of files) {
                fetchFile(file);
            }
            function fetchFile(f, e) {
                var file = e ? f : 'bin/js/json/'+f+'.json';
                var callback = {
                    success: function(data) {
                        var data = e ? data : JSON.parse(data);
                        if (e) {
                            Render.getPart(data, e)
                        } else Render.build(data);
                    },
                    error: function(data) {
                        throw new Error(data);
                    }
                };
                $http(file).get()
                .then(callback.success)
                .catch(callback.error);
            }
        }

    };

})();

var Render = {

    build: function(data) {
        var data = data.items;
        var grid = document.querySelector('.grid');

        for (const n of data) {
            var title = n.title,
            uri = n.url,
            size = n.hasOwnProperty('size') ? n.size : false;
        }
    },

    getPart: function(data, e) {
        if (e.indexOf('.') !== -1) {
            // e refers to a classname
            var e = e.substr(1);

            // creating a div with classname e
            var temp = document.createElement('div');
            temp.classList.add(e);

            // add data
            temp.innerHTML = data;

            // append to parent <main>
            var parent = document.querySelector('main');
            parent.appendChild(temp);
        } else {
            var elem = document.querySelector(e);
            var temp = document.createElement(e);
            temp.innerHTML = data;

            document.body.replaceChild(temp, elem);
        }
    },

    init: function() {
        Parser.fetchContent();
    }

};

document.addEventListener('DOMContentLoaded', function() {
    Render.init();
});
