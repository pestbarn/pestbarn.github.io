var parser = (function() {

    const DEBUG = true;

    function buildElement(element, text, parent) {
        var item = element;
        var contents = text;
        var contentFragment = document.createDocumentFragment();

        contents.forEach(function(e) {
            var li = document.createElement('span');
            if (typeof e === 'string') e.replace(/[^\,\w\s]/gi, '');
            li.textContent = e;
            contentFragment.appendChild(li);
        });

        item.appendChild(contentFragment);
        var toEl = parent;
        toEl.appendChild(item, parent);
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
        catch(err) {
            if (DEBUG) throw new Error(err);
            throw new Error('WTF is this? Hit me up with these details: \n'+ err);
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
        var parent = document.getElementById(target[0]);
        var object = obj.items;
        var numItems = object.length;
        var out = toArray(object);
        for(let i = 0, l = numItems; i < l; i++) {
            var innerEl = document.createElement(target[1]);
            var className = out[i][0].toLowerCase().replace(/[^\w\s]/gi, '');
            innerEl.classList.add(className);
            buildElement(innerEl, out[i], parent);
        }
    }

    var getPartials = function(obj, type, target) {
        var xhr = new XMLHttpRequest();
        var target = target;
        var isFile = type == 'file' ? true : false;
        if (isFile) xhr.overrideMimeType('application/json');
        xhr.open('GET', obj, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var params = this.response;
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
            var params = object.items;
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

var ExperienceModule = {

    init: function() {
        var url = 'bin/js/json/experience.json',
            toEl = ['experience','div'];
        parser.xhrFile(url, toEl);
    }

};

var SkillsModule = {

    init: function() {
        var url = 'bin/js/json/skills.json',
            toEl = ['skills','li'];
        parser.xhrFile(url, toEl);
    }

};

document.addEventListener('DOMContentLoaded', function() {
    HeaderModule.init();
    ExperienceModule.init();
    SkillsModule.init();
});
