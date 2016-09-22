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
            alert('The request for ' + url + ' timed out.');
        };
        xhr.timeout = 1000;
        xhr.send();
    }

};

var params,
SkillsModule = {

    fetchJSON: function(file, callback) {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/json');
        xhr.open('GET', file, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                }
            }
        };
        xhr.send();
    },

    loadJSON: function(file) {
        this.fetchJSON(file, function(response) {
            var fetchedJSON = JSON.parse(response);
            console.log(fetchedJSON);
        });
    },

    init: function() {
        this.loadJSON('experience.json');
    }

};


document.addEventListener('DOMContentLoaded', function() {
    HeaderModule.init();
    SkillsModule.init();
});
