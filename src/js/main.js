var parser = (function() {

    const DEBUG = true;

    function addElement(element, text, parent) {
        var newItem = document.createElement(element);
        var newContent = document.createTextNode(text);
        newItem.appendChild(newContent);

        var currentDiv = document.getElementById(parent);
        document.body.insertBefore(newItem, currentDiv);
    }

    var tryParseJSON = function(jsonString, callback) {
        try {
            var obj = JSON.parse(jsonString);
            if (obj && typeof obj === 'object') {
                returnObject(obj, fileOutput);
            }
        }
        catch(e) {
            if (DEBUG) return e;
            return false;
        }
    };

    var returnObject = function(obj, callback, target) {
        if (obj != undefined && obj.hasOwnProperty){
            callback(obj, target);
        }
    }

    function objOutput(obj, target) {
        var element = document.getElementsByTagName(target).innerHTML;
        var object = obj;
        element = object;
    }

    var fileOutput = function(obj) {
        for (const item of obj.items) {
            console.dir(item);
        }
    }

    var params, i, l;

    var getPartials = function(obj, type, target) {
        var xhr = new XMLHttpRequest();
        var target = target;
        var isFile = type == 'file' ? true : false;
        if (isFile) xhr.overrideMimeType('application/json');
        xhr.open('GET', obj, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    params = this.response;
                    if (isFile) {
                        tryParseJSON(params, returnObject);
                    } else {
                        returnObject(params, objOutput, target);
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
            for (const item of params) {
                getPartials(item.url, 'object', item.tag);
            }
        },
        xhrFile: function(object, type) {
            getPartials(object, 'file');
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
        var url = './experience.json',
            id = 'skills';
        parser.xhrFile(url);
    }

};

document.addEventListener('DOMContentLoaded', function() {
    HeaderModule.init();
    SkillsModule.init();
});
