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

    init: () => {
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

const Request = {

    isPage: url => {
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

window.addEventListener('DOMContentLoaded', () => {
    Render.init();
});
