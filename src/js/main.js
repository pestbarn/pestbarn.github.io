var parser = (function() {

    const DEBUG = true;

    var getPartials, params, i, l, output;

    getPartials = function(request, type) {
        var xhr = new XMLHttpRequest();
        var url = request.url,
            tag = request.tag;
        if (type == 'file') xhr.overrideMimeType('application/json');
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    switch (type) {
                        case 'object':
                            output = document.getElementsByTagName(tag);
                            output[0].innerHTML = this.responseText;
                            break;
                        case 'file':
                            output = document.getElementById(tag);
                            output[0].innerHTML = this.responseText;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        if(DEBUG) {
            xhr.ontimeout = function () {
                console.log('The request timed out.');
            };
            xhr.timeout = 1000;
        }
        xhr.send();
    };

    return {
        xhrObjs: function(object) {
            params = object.items;
            for(i = 0, l = params.length; i < l; i++) {
                var obj = params[i];
                getPartials(obj, 'object');
            }
        },
        xhrFile: function(file, id) {
            params = JSON.parse(file);
            for(i = 0, l = params.length; i < l; i++) {
                var obj = params[i];
                getPartials(obj, 'file');
            }
        }
    };

})();

var HeaderModule = {

    init: function() {
        var objs = {
            items: [
                {
                    url: 'bin/partials/header.html',
                    tag: 'header'
                }, {
                    url: 'bin/partials/navigation.html',
                    tag: 'nav'
                }
            ]
        };
        parser.xhrObjs(objs);
    }

}

var SkillsModule = {

    init: function() {
        var file = 'experience.json',
            id = 'skills';
        parser.xhrFile(file, id);
    }

};

document.addEventListener('DOMContentLoaded', function() {
    HeaderModule.init();
    SkillsModule.init();
});
