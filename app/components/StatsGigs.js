import React from 'react';
import axios from 'axios';

/* global sorttable, List */

const Get = () => {
    const gigs = '//spreadsheets.google.com/feeds/list/1Tf2vRy6me9F3knQSA5FpfvrTLuNetlkd0Mmb2P20Jqo/1/public/values?alt=json';

    const callback = {
        success: data => {
            const cells = data;
            const title = cells.data.feed.entry;
            let updated = cells.data.feed.updated.$t;
            updated = `Last updated: ${updated.substr(0,10)}`;
            document.querySelector('#attended-gigs .mdl-spinner').remove();
            document.querySelector('#gigs .mdl-tooltip').innerHTML = updated;
            const sort = document.getElementById('giglist');

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
                    new List('attended-gigs', options);
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
    const list = document.querySelector('#giglist tbody');
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
            <div className="mdl-layout__tab-panel is-active" id="gigs">
                <div className="page-content mdl-grid">
                    <div className="mdl-cell" id="attended-gigs">
                        <h1 className="mdl-typography--headline">
                            Attended gigs
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                                <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search-attended">
                                    <i className="material-icons">search</i>
                                </label>

                                <div className="mdl-textfield__expandable-holder">
                                    <input className="mdl-textfield__input search" type="text" name="sample" id="search-attended" />
                                </div>
                            </div>
                            <div className="mdl-spinner mdl-js-spinner is-active"></div>
                        </h1>
                        <div className="mdl-tooltip" htmlFor="search-attended"></div>
                        <table className="mdl-data-table mdl-js-data-table" id="giglist">
                            <thead>
                                <tr>
                                    <th className="mdl-data-table__cell--non-numeric sorttable_alpha">Artist/band</th>
                                    <th className="mdl-data-table__cell--non-numeric sorttable_alpha">Location</th>
                                    <th>Date</th>
                                </tr>
                            </thead>

                            <tbody className="list" />
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
