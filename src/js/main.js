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
        var xhr = new XMLHttpRequest();
        var url = request.url,
            tag = request.tag;
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (this.readyState !== 4 || this.status !== 200) return;
            var output = document.getElementsByTagName(tag);
            output[0].innerHTML = this.responseText;
        };
        xhr.send();
    }

};

document.addEventListener('DOMContentLoaded', function() {
    HeaderModule.init();
});
