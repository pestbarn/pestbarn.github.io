import React from 'react';
import axios from 'axios';
import { Stats } from './';

/* global sorttable, List */

export default class StatsGigs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gigs: []
        };
    }

    componentDidMount() {
        this.serverRequest = axios
        .get('https://spreadsheets.google.com/feeds/list/1Tf2vRy6me9F3knQSA5FpfvrTLuNetlkd0Mmb2P20Jqo/1/public/values?alt=json')
        .then(result => {
            this.setState({
                gigs: result.data.feed.entry
            });

            document.querySelector('#gigs .mdl-spinner').remove();

            const options = {
                valueNames: ['gig-name', 'gig-location', 'gig-date']
            };
            new List('gigs', options);
        })
        .catch(err => {
            throw new Error(err);
        });

        const sort = document.getElementById('gigslist');
        sorttable.makeSortable(sort);
    }

    componentWillUnmount() {
        this.serverRequest.abort();
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
                <tbody className="list">
                    {this.state.gigs.filter(i => i.id.$t.slice(-5) != 'cokwr').map(gig => {
                        let updated = gig.updated.$t;
                        updated = `Last updated: ${updated.substr(0,10)}`;
                        document.querySelector('#gigs .mdl-tooltip').innerHTML = updated;

                        return (
                            <tr key={gig.id.$t}>
                                <td className="mdl-data-table__cell--non-numeric gig-name">
                                    {gig.gsx$headline.$t}
                                </td>
                                <td className="mdl-data-table__cell--non-numeric gig-location">
                                    {gig.gsx$text.$t}
                                </td>
                                <td className="gig-date">{gig.gsx$startdate.$t}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Stats>
        );
    }
}
