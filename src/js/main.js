var parser = (function() {

    const DEBUG = true;

    function addElement(element, text, parent) {
        var newItem = document.createElement(element);
        var newContent = document.createTextNode(text);
        newItem.appendChild(newContent);

        var currentDiv = document.getElementById(parent);
        document.body.insertBefore(newItem, currentDiv);
    }

    var getPartials, params, i, l, output;

    getPartials = function(obj, type, target) {
        var xhr = new XMLHttpRequest();
        var url = obj.url,
            tag = obj.tag;
        var file = obj,
            elId = target;
        if (type == 'file') {
            file = obj;
            xhr.overrideMimeType('application/json');
            xhr.open('GET', file, true);
        } else {
            xhr.open('GET', url, true);
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    switch (type) {
                        case 'object':
                            output = document.getElementsByTagName(tag);
                            output[0].innerHTML = this.responseText;
                            break;
                        case 'file':
                            output = document.getElementById(elId);
                            params = JSON.parse(this.responseText);
                            for(i = 0, l = params.length; i < l; i++) {
                                var obj = params[i];
                                output.innerHTML = obj;
                                addElement('p', obj.work, output);
                                addElement('p', obj.title, output);
                                addElement('p', obj.meta.dateFrom, output);
                                addElement('p', obj.meta.dateTo, output);
                                addElement('p', obj.meta.url, output);
                                addElement('p', obj.description, output);
                            }
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
        xhrFile: function(url, type, id) {
            var pUrl = url,
            pType = type,
            pId = id;
            getPartials(pUrl, pType, pId);
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
        parser.xhrFile(url, 'file', 'skills');
    }

};

document.addEventListener('DOMContentLoaded', function() {
    HeaderModule.init();
    SkillsModule.init();
});
