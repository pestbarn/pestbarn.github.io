import React from 'react';
import axios from 'axios';
import { Stats } from './';

/* global sorttable, List */

const Get = () => {
    const beer = '//spreadsheets.google.com/feeds/list/1a056ruITWMr8oeJECb8QM6ePe00IqTTEIkrkhY-QeMI/1/public/values?alt=json';

    const callback = {
        success: data => {
            const cells = data;
            const title = cells.data.feed.entry;
            let updated = cells.data.feed.updated.$t;
            updated = `Last updated: ${updated.substr(0,10)}`;
            document.querySelector('#beers .mdl-spinner').remove();
            document.querySelector('#beers .mdl-tooltip').innerHTML = updated;
            const sort = document.getElementById('beerslist');

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

                if (t > 0) beerList(
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
                    new List('beers', options);
                }
            }
        },
        error: data => {
            throw new Error(data);
        }
    };

    axios.get(beer)
    .then(callback.success)
    .catch(callback.error);
};

const beerList = (brewery, bName, bType, bAbv, bRating, bDate) => {
    const frag = document.createDocumentFragment();
    const list = document.querySelector('#beerslist tbody');
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

    const tr = document.createElement('tr');
    tr.innerHTML = brew;
    frag.appendChild(tr);
    list.appendChild(frag);
};

export default class StatsBeer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Get();
    }

    render() {
        return (
            <Stats subHeader="Untappd stats" subId="beers">
                <thead>
                    <tr>
                        <th className="mdl-data-table__cell--non-numeric sorttable_alpha">Brewery</th>
                        <th className="mdl-data-table__cell--non-numeric sorttable_alpha">Beer name</th>
                        <th className="mdl-data-table__cell--non-numeric sorttable_alpha">Beer type</th>
                        <th className="mdl-data-table__cell--non-numeric">ABV</th>
                        <th className="mdl-data-table__cell--non-numeric sorttable_numeric">Rating</th>
                        <th className="mdl-data-table__cell--non-numeric">Checkin date</th>
                    </tr>
                </thead>
            </Stats>
        );
    }
}
