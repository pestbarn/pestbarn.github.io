var é = function (selector) {
    return document.querySelector(selector);
};

var ç = function (selector) {
    return document.createElement(selector);
};

var Parser = (function() {

    function $http(url){
        var core = {
            ajax: function(method, url) {
                var promise = new Promise(function(resolve, reject) {
                    var client = new XMLHttpRequest();
                    var uri = url;
                    client.open(method, uri);
                    client.send();
                    client.onload = function () {
                        if (this.status >= 200 && this.status < 300) {
                            resolve(this.response);
                        } else {
                            reject(this.statusText);
                        }
                    };
                    client.onerror = function () {
                        reject(this.statusText);
                    };
                });
                return promise;
            }
        };
        return {
            'get': function() {
                return core.ajax('GET', url);
            }
        };
    }

    return {

        fetchContent: function() {
            let partials = new Map([
                ['header', 'bin/partials/header.html'],
                ['.contact', 'bin/partials/contact.html'],
                ['aside', 'bin/partials/aside.html']
            ]);
            let files = [
                'experience'
            ];
            for (const part of partials) {
                fetchFile(part[1], part[0]);
            }
            for (const file of files) {
                fetchFile(file);
            }
            function fetchFile(f, e) {
                var file = e ? f : 'bin/js/json/'+f+'.json';
                var callback = {
                    success: function(data) {
                        data = e ? data : JSON.parse(data);
                        if (e) {
                            Render.getPart(data, e);
                        } else Render.buildList(data, f);
                    },
                    error: function(data) {
                        throw new Error(data);
                    }
                };
                $http(file).get()
                .then(callback.success)
                .catch(callback.error);
            }
        },
        fetchGigs: function () {
            // FOR THE /gigs/ PAGE ONLY
            let gigs = '//spreadsheets.google.com/feeds/list/1Tf2vRy6me9F3knQSA5FpfvrTLuNetlkd0Mmb2P20Jqo/1/public/values?alt=json';

            var callback = {
                success: function(data) {
                    var cells = JSON.parse(data);
                    var title = cells.feed.entry;
                    var updated = cells.feed.updated.$t;
                    updated = `Last updated: ${updated.substr(0,10)}`;
                    é('.mdl-spinner').remove();
                    é('#scroll-tab-1 .mdl-tooltip').innerHTML = updated;
                    var sort = document.getElementById('giglist');

                    for (let t in title) {
                        if (t > 0) Gigs.gigList(title[t].gsx$headline.$t,
                                                title[t].gsx$text.$t,
                                                title[t].gsx$startdate.$t);
                        if (t == title.length-1){
                            sorttable.makeSortable(sort);
                            var options = {
                                valueNames: ['gig-name', 'gig-location', 'gig-date']
                            };
                            var userList = new List('attended-gigs', options);
                        }
                    }
                },
                error: function(data) {
                    throw new Error(data);
                }
            };
            $http(gigs).get()
            .then(callback.success)
            .catch(callback.error);
        }

    };

})();

var Render = {

    settings: {
        createEl: 'div',
        parentEl: 'main'
    },

    buildList: function(data, f) {
        data = data.items;
        var parent = é('.'+ f);
        var ul = ç('ul');

        function build(element, content, attr) {
            element = ç(element);
            element.appendChild(document.createTextNode(content));
            attr && element.setAttribute('href', '//' + content);
            return element;
        }

        for (const n of data) {
            var li = ç('li');

            var temp = [
                build('h2', n.title),
                build('h3', n.position),
                build('time', n.dateFrom),
                build('span', '—'),
                build('time', n.dateTo),
                n.url && build('a', n.url, 1)
            ];

            var docFrag = document.createDocumentFragment();
            for(var i = 0; i < temp.length; i++) {
                temp[i] && docFrag.appendChild(temp[i]);
            }

            li.appendChild(docFrag);
            ul.appendChild(li);
        }

        parent.appendChild(ul);
    },

    getPart: function(data, e) {
        if (~e.indexOf('.')) {

            // e refers to a classname
            e = e.substr(1);

            // creating a div with classname e
            var temp = ç(this.settings.createEl);
            temp.classList.add(e);

            // add data and attach click handler
            temp.innerHTML = data;
            temp.onclick = Interact.toggleClicked;

            // append to parent <main>
            var parent = é(this.settings.parentEl);
            parent.appendChild(temp);

        } else {

            // e refers to an existing element
            var elem = é(e);

            // create the (new) element
            temp = ç(e);

            // add data
            temp.innerHTML = data;

            temp.onclick = Interact.toggleClicked;

            // replace existing element with new
            document.body.replaceChild(temp, elem);
            if(~e.indexOf('aside')) Age.calc();
        }
    },

    init: function() {
        if (Request.isIndex()) Parser.fetchContent();
        if (Request.isPage('/gigs/')) Parser.fetchGigs();
    }

};

var Interact = {

    toggleClicked: function() {
        var clicked = this.nodeName;
        if(clicked == 'HEADER'||this.classList == 'contact'){
            var el = é('header');
            el.className == 'clicked' ? el.className = 'reverse' : el.className = 'clicked';
        }
    }

};

var Age = {

    calc: function() {
        var el = é('time');
        var time = el.getAttribute('datetime');

        var today = new Date();
        var now = [today.getFullYear(), today.getMonth()+1, ('0' + today.getDate()).slice(-2)];
        var birth = [time.slice(0,4), time.slice(5,7), time.slice(8,10)];

        now = now.join('');
        birth = birth.join('');

        var age = (now - birth).toString().slice(0,2);
        el.innerHTML = age + ',';
    }

};

var Request = {

    isIndex: function() {
        if (document.location.pathname == '/') {
            return true;
        }
    },

    isPage: function(url) {
        if (document.location.pathname == url) {
            return true;
        }
    }

};

var Gigs = {
    // NOT USED ON MAIN PAGE

    gigList: function(name, location, date) {
        var frag = document.createDocumentFragment();
        var list = é('#giglist tbody');
        var gig = `<td class="mdl-data-table__cell--non-numeric gig-name">
                ${name}
            </td>
            <td class="mdl-data-table__cell--non-numeric gig-location">
                ${location}
            </td>
            <td class="gig-date">${date}</td>`;

        var tr = ç('tr');
        tr.innerHTML = gig;
        frag.appendChild(tr);
        list.appendChild(frag);
    }

};

window.addEventListener('DOMContentLoaded', function() {
    Render.init();
});
