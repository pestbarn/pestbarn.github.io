const DEBUG = true;

/**
 * Callable function for making XMLHttpRequests
 * @param {objType} groupNum Subgroup id to query.
 * @param {string|number|null} term An itemName,
 *     or itemId, or null to search everything.
 */
globalXhr: function(objType, outMethod, callback) {

    opts: {
        objType = {
            1: 'file',
            2: 'object'
        },
        outMethod = {
            1: 'toElement',
            2: 'toConsole'
        };
    }

    console.dir(opts);

}

var SkillsModule = {

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
            for(i = 0, l = fetchedJSON.length; i < l; i++) {
                var obj = fetchedJSON[i];
                console.dir(obj);
            }
        });
    },

    init: function(DEBUG) {
        this.loadJSON('experience.json');
    }

};

var HeaderModule = {

    populate: {
        items: [{
            url: 'bin/partials/header.html',
            tag: 'header',
        }, {
            url: 'bin/partials/navigation.html',
            tag: 'nav',
        }]
    },

    getPartials: function(request, DEBUG) {
        var xhr = new XMLHttpRequest();
        var url = request.url,
            tag = request.tag;
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var output = document.getElementsByTagName(tag);
                    output[0].innerHTML = this.responseText;
                }
            }
        };
        if(DEBUG) {
            xhr.ontimeout = function () {
                console.log('The request for ' + url + ' timed out.');
            };
            xhr.timeout = 1000;
            console.log('DEBUG');
        }
        xhr.send();
    },

    init: function(DEBUG) {
        params = this.populate.items;
        for(i = 0, l = params.length; i < l; i++) {
            var obj = params[i];
            this.getPartials(obj, DEBUG);
        }
    }

};

document.addEventListener('DOMContentLoaded', function() {
    HeaderModule.init(DEBUG);
    SkillsModule.init(DEBUG);
});
