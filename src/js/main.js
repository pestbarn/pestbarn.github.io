var h,
HeaderModule = {

    populateHead: {
        url: 'bin/partials/header.html',
        tag: 'header'
    },

    populateNav: {
        url: 'bin/partials/navigation.html',
        tag: 'nav'
    },

    init: function() {
        params = [this.populateHead, this.populateNav];
        params.forEach(function(request) {
            url = request.url;
            tag = request.tag;
        });

        for (out in params) {
            this.doRequest(params);
            console.log(params)
        }
        //this.doRequest(out);
    },

    doRequest: function(request) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', request.url, true);
        xhr.onreadystatechange= function() {
            if (this.readyState !== 4 || this.status !== 200) return;
            var output = document.getElementsByTagName(request.tag);
            output[0].innerHTML = this.responseText;
        };
        xhr.send();
    }

};

document.addEventListener('DOMContentLoaded', function() {
    HeaderModule.init();
});
