var params,
HeaderModule = {

    populate: {
        items: [{
            url: 'bin/partials/header.html',
            tag: 'header',
        }, {
            url: 'bin/partials/navigation.html',
            tag: 'nav',
        }]
    },

    init: function() {
        params = this.populate.items;
        for(i = 0, l = params.length; i < l; i++) {
            var obj = params[i];
            this.getPartials(obj);
        }
    },

    getPartials: function(request) {
        // show loader
        var xhr = new XMLHttpRequest();
        var url = request.url,
            tag = request.tag;
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // hide loader
                    var output = document.getElementsByTagName(tag);
                    output[0].innerHTML = this.responseText;
                }
            }
        };
        xhr.ontimeout = function () {
            alert("The request for " + url + " timed out.");
        };
        xhr.timeout = 1000;
        xhr.send();
    }

};

document.addEventListener('DOMContentLoaded', function() {
    HeaderModule.init();
});
