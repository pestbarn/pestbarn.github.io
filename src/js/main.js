const é = selector => document.querySelector(selector);
const ç = selector => document.createElement(selector);

/* global sorttable, List */

const Parser = (() => {

    function $http(url){
        const core = {
            ajax: (method, url) => {
                const promise = new Promise(function(resolve, reject) {
                    const client = new XMLHttpRequest();
                    const uri = url;
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
            'get': () => {
                return core.ajax('GET', url);
            }
        };
    }

    return {

        fetchContent: () => {
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
                let file = e ? f : 'bin/js/json/'+f+'.json';
                const callback = {
                    success: data => {
                        data = e ? data : JSON.parse(data);
                        if (e) {
                            Render.getPart(data, e);
                        } else Render.buildList(data, f);
                    },
                    error: data => {
                        throw new Error(data);
                    }
                };
                $http(file).get()
                .then(callback.success)
                .catch(callback.error);
            }
        },
        fetchGigs: () => {
            const gigs = '//spreadsheets.google.com/feeds/list/1Tf2vRy6me9F3knQSA5FpfvrTLuNetlkd0Mmb2P20Jqo/1/public/values?alt=json';

            const callback = {
                success: data => {
                    const cells = JSON.parse(data);
                    const title = cells.feed.entry;
                    let updated = cells.feed.updated.$t;
                    updated = `Last updated: ${updated.substr(0,10)}`;
                    é('#attended-gigs .mdl-spinner').remove();
                    é('#gigs .mdl-tooltip').innerHTML = updated;
                    const sort = document.getElementById('giglist');

                    for (let t in title) {
                        let [name, location, date] = [
                            title[t].gsx$headline.$t,
                            title[t].gsx$text.$t,
                            title[t].gsx$startdate.$t
                        ];

                        if (t > 0) Tables.gigList(name, location, date);

                        if (t == title.length-1) {
                            sorttable.makeSortable(sort);
                            const options = {
                                valueNames: ['gig-name', 'gig-location', 'gig-date']
                            };
                            new List('attended-gigs', options);
                        }
                    }
                },
                error: data => {
                    throw new Error(data);
                }
            };
            $http(gigs).get()
            .then(callback.success)
            .catch(callback.error);
        },
        fetchBeer: () => {
            const beer = '//spreadsheets.google.com/feeds/list/1a056ruITWMr8oeJECb8QM6ePe00IqTTEIkrkhY-QeMI/1/public/values?alt=json';

            const callback = {
                success: data => {
                    const cells = JSON.parse(data);
                    const title = cells.feed.entry;
                    let updated = cells.feed.updated.$t;
                    updated = `Last updated: ${updated.substr(0,10)}`;
                    é('#untappd-stats .mdl-spinner').remove();
                    é('#beers .mdl-tooltip').innerHTML = updated;
                    const sort = document.getElementById('beerlist');

                    for (let t in title) {
                        let [
                            brewery,
                            bName,
                            bType,
                            bAbv,
                            bRating,
                            dateTrim
                        ] = [
                            title[t].gsx$breweryname.$t,
                            title[t].gsx$beername.$t,
                            title[t].gsx$beertype.$t,
                            title[t].gsx$beerabv.$t,
                            title[t].gsx$ratingscore.$t,
                            title[t].gsx$createdat.$t.substr(0,10)
                        ];

                        if (t > 0) Tables.beerList(
                            brewery,
                            bName,
                            bType,
                            bAbv,
                            bRating,
                            dateTrim
                        );
                        if (t == title.length-1){
                            sorttable.makeSortable(sort);
                            const options = {
                                valueNames: ['brewery', 'beer-name', 'beer-type', 'beer-abv', 'beer-rating', 'beer-date']
                            };
                            new List('untappd-stats', options);
                        }
                    }
                },
                error: data => {
                    throw new Error(data);
                }
            };
            $http(beer).get()
            .then(callback.success)
            .catch(callback.error);
        }

    };

})();

const Render = {

    settings: {
        createEl: 'div',
        parentEl: 'main'
    },

    buildList: (data, f) => {
        data = data.items;
        const parent = é('.'+ f);
        const ul = ç('ul');

        function build(element, content, attr) {
            element = ç(element);
            element.appendChild(document.createTextNode(content));
            attr && element.setAttribute('href', '//' + content);
            return element;
        }

        for (const n of data) {
            const li = ç('li');

            let temp = [
                build('h2', n.title),
                build('h3', n.position),
                build('time', n.dateFrom),
                build('span', '—'),
                build('time', n.dateTo),
                n.url && build('a', n.url, 1)
            ];

            const docFrag = document.createDocumentFragment();
            for(let i = 0; i < temp.length; i++) {
                temp[i] && docFrag.appendChild(temp[i]);
            }

            li.appendChild(docFrag);
            ul.appendChild(li);
        }

        parent.appendChild(ul);
    },

    getPart: (data, e) => {
        if (~e.indexOf('.')) {

            // e refers to a classname
            e = e.substr(1);

            // creating a div with classname e
            let temp = ç(Render.settings.createEl);
            temp.classList.add(e);

            // add data and attach click handler
            temp.innerHTML = data;
            temp.onclick = Interact.toggleClicked;

            // append to parent <main>
            const parent = é(Render.settings.parentEl);
            parent.appendChild(temp);

        } else {

            // e refers to an existing element
            const elem = é(e);

            // create the (new) element
            let temp = ç(e);

            // add data
            temp.innerHTML = data;

            temp.onclick = Interact.toggleClicked;

            // replace existing element with new
            document.body.replaceChild(temp, elem);
            if(~e.indexOf('header')) Pizazz.check();
            if(~e.indexOf('aside')) Age.calc();
        }
    },

    init: () => {
        if (Request.isIndex()) Parser.fetchContent();
        if (Request.isPage('/stats/')){
            Parser.fetchGigs();
            Parser.fetchBeer();

            const hash = document.location.hash;
            if (hash) {
                let relLink = é('a[href="'+ hash +'"]');
                window.addEventListener('load', () => {
                    relLink.click();
                });
            }
        }
    }

};

const Interact = {

    toggleClicked: (e) => {
        const parent = e.target.parentElement.nodeName;
        const div = e.target.classList;
        if(parent == 'HEADER' || parent == 'MAIN' || div == 'locate'){
            const el = é('header');
            el.className == 'clicked' ? el.className = 'reverse' : el.className = 'clicked';
        }
    }

};

const Age = {

    calc: () => {
        const el = é('time');
        const time = el.getAttribute('datetime');
        const today = new Date();
        const month = today.getMonth()+1 <= 9 ? ''+today.getMonth()+1 : today.getMonth()+1;

        let now = [
            today.getFullYear(),
            month,
            parseInt(('0' + today.getDate()).slice(-2))
        ];
        let birth = [
            time.slice(0,4),
            time.slice(5,7),
            time.slice(8,10)
        ];

        now = now.join('');
        birth = birth.join('');

        const age = (now - birth).toString().slice(0,2);
        el.innerHTML = age + ',';
    }

};

const Request = {

    isIndex: () => {
        if (document.location.pathname == '/') {
            return true;
        }
    },

    isPage: (url) => {
        if (document.location.pathname == url) {
            return true;
        }
    }

};

const Tables = {
    // NOT USED ON MAIN PAGE

    gigList: (name, location, date) => {
        const frag = document.createDocumentFragment();
        const list = é('#giglist tbody');
        let gig = `<td class="mdl-data-table__cell--non-numeric gig-name">
                ${name}
            </td>
            <td class="mdl-data-table__cell--non-numeric gig-location">
                ${location}
            </td>
            <td class="gig-date">${date}</td>`;

        const tr = ç('tr');
        tr.innerHTML = gig;
        frag.appendChild(tr);
        list.appendChild(frag);
    },

    beerList: (brewery, bName, bType, bAbv, bRating, bDate) => {
        const frag = document.createDocumentFragment();
        const list = é('#beerlist tbody');
        let brew = `<td class="mdl-data-table__cell--non-numeric brewery">
                ${brewery}
            </td>
            <td class="mdl-data-table__cell--non-numeric beer-name">
                ${bName}
            </td>
            <td class="mdl-data-table__cell--non-numeric beer-type">
                ${bType}
            </td>
            <td class="beer-abv">${bAbv}</td>
            <td class="beer-rating">${bRating}</td>
            <td class="beer-date">${bDate}</td>`;

        const tr = ç('tr');
        tr.innerHTML = brew;
        frag.appendChild(tr);
        list.appendChild(frag);
    }

};

const Pizazz = {
    // fallbacks for visual goodies
    check: () => {
        let n = navigator.userAgent;
        // yeah yeah, shouldn't use browser sniffing, but whatever...
        const browser = (n.indexOf('Firefox') != -1 || n.indexOf('Safari') != -1);
        const chrome = n.indexOf('Chrome') != -1;

        if (browser && !chrome) {
            let svgReplace = ç('img');
            const imageReplacement = 'src/img/logotype.svg';
            svgReplace.setAttribute('src', imageReplacement);

            const svg = document.getElementById('logotype');
            const header = é('header');

            header.replaceChild(svgReplace, svg);
        }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    Render.init();
});
