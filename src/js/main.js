var parser = (function() {

    const DEBUG = true;

    function addElement(element, text, parent) {
        var newItem = document.createElement(element);
        var newContent = document.createTextNode(text);
        newItem.appendChild(newContent); console.dir(newItem)

        var newParent = document.getElementById(parent);
        document.body.insertBefore(newItem, newParent);
    }

    function toArray(obj) {
        const result = [];
        for (const prop in obj) {
            const value = obj[prop];
            if (typeof value === 'object') {
                result.push(toArray(value));
            }
            else {
                result.push(value);
            }
        }
        return result;
    }

    var tryParseJSON = function(jsonString, target, callback) {
        try {
            var obj = JSON.parse(jsonString);
            if (obj && typeof obj === 'object') {
                returnObject(obj, fileOutput, target);
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

    var objOutput = function(obj, target) {
        var element = document.getElementsByTagName(target);
        var object = obj;
        for (const item of element) {
            item.innerHTML = object;
        }
    }

    var fileOutput = function(obj, target) {
        var element = document.getElementById(target);
        var object = obj.items;
        var numItems = object.length;
        var out = toArray(object);
        for(let i = 0, l = numItems; i < l; i++) {
            var span = 'span';
            //span.className = object[i].work;
            addElement(span, out[i], 'skills');
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
                        tryParseJSON(params, target, returnObject);
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
        xhrFile: function(object, toEl) {
            getPartials(object, 'file', toEl);
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
        parser.xhrFile(url, id);
    }

};

document.addEventListener('DOMContentLoaded', function() {
    HeaderModule.init();
    SkillsModule.init();
});
