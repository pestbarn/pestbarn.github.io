var é = function (selector) {
    return document.querySelector(selector);
};

var ç = function (selector) {
    return document.createElement(selector);
};

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
                [".contact", "bin/partials/contact.html"],
                ["aside", "bin/partials/aside.html"]
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

    settings: {
        createEl: 'div',
        parentEl: 'main'
    },

    build: function(data) {
        var data = data.items;
        var parent = é(this.settings.parentEl);

        for (const n of data) {
            // future proofing for outputting JSON content
        }
    },

    getPart: function(data, e) {
        if (~e.indexOf('.')) {

            // e refers to a classname
            var e = e.substr(1);

            // creating a div with classname e
            var temp = ç(this.settings.createEl);
            temp.classList.add(e);

            // add data and attach click handler
            temp.innerHTML = data;
            temp.onclick = Interact.toggleClicked;

            // append to parent <main>
            var parent = é(this.settings.parentEl);
            parent.appendChild(temp);

        } else {

            // e refers to an existing element
            var elem = é(e);

            // create the (new) element
            var temp = ç(e);

            // add data
            temp.innerHTML = data;

            temp.onclick = Interact.toggleClicked;

            // replace existing element with new
            document.body.replaceChild(temp, elem);
            if(~e.indexOf('aside')) Age.calc();
        }
    },

    init: function() {
        Parser.fetchContent();
    }

};

var Interact = {

    toggleClicked: function() {
        var el = é('header');
        el.className == 'clicked' ? el.className = 'reverse' : el.className = 'clicked';
    },

    resetClicked: function() {
        var el = é('.clicked');
        if (el.length === undefined) {
            el.removeAttribute('class');
        } else {
            for (var i = 0; i < el.length; i++) {
                var element = el[i];
                element.removeAttribute('class');
            }
        }
    }

};

var Age = {

    calc: function() {
        var el = é('time');
        var time = el.getAttribute('datetime');

        var today = new Date();
        var now = [today.getFullYear(), today.getMonth()+1, today.getDate()];
        var birth = [time.slice(0,4), time.slice(5,7), time.slice(8,10)];

        now = now.join('');
        birth = birth.join('');

        var age = (now - birth).toString().slice(0,2);;
        el.innerHTML = age + ',';
    }

};

window.addEventListener('DOMContentLoaded', function() {
    Render.init();
});
