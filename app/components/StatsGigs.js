import React from 'react';
import axios from 'axios';
import { Stats } from './';

/* global sorttable, List */

const Get = () => {
    const gigs = '//spreadsheets.google.com/feeds/list/1Tf2vRy6me9F3knQSA5FpfvrTLuNetlkd0Mmb2P20Jqo/1/public/values?alt=json';

    const callback = {
        success: data => {
            const cells = data;
            const title = cells.data.feed.entry;
            let updated = cells.data.feed.updated.$t;
            updated = `Last updated: ${updated.substr(0,10)}`;
            document.querySelector('#gigs .mdl-spinner').remove();
            document.querySelector('#gigs .mdl-tooltip').innerHTML = updated;
            const sort = document.getElementById('gigslist');

            for (let t in title) {
                let [name, location, date] = [
                    title[t].gsx$headline.$t,
                    title[t].gsx$text.$t,
                    title[t].gsx$startdate.$t
                ];

                if (t > 0) gigList(name, location, date);

                if (t == title.length-1) {
                    sorttable.makeSortable(sort);
                    const options = {
                        valueNames: ['gig-name', 'gig-location', 'gig-date']
                    };
                    new List('gigs', options);
                }
            }
        },
        error: data => {
            throw new Error(data);
        }
    };

    axios.get(gigs)
    .then(callback.success)
    .catch(callback.error);
};

const gigList = (name, location, date) => {
    const frag = document.createDocumentFragment();
    const list = document.querySelector('#gigslist tbody');
    let gig = `<td class="mdl-data-table__cell--non-numeric gig-name">
            ${name}
        </td>
        <td class="mdl-data-table__cell--non-numeric gig-location">
            ${location}
        </td>
        <td class="gig-date">${date}</td>`;

    const tr = document.createElement('tr');
    tr.innerHTML = gig;
    frag.appendChild(tr);
    list.appendChild(frag);
};

export default class StatsGigs extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Get();
    }

    render() {
        return (
            <Stats subHeader="Attended gigs" subId="gigs">
                <thead>
                    <tr>
                        <th className="mdl-data-table__cell--non-numeric sorttable_alpha">Artist/band</th>
                        <th className="mdl-data-table__cell--non-numeric sorttable_alpha">Location</th>
                        <th>Date</th>
                    </tr>
                </thead>
            </Stats>
        );
    }
}
