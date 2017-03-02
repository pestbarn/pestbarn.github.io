import React from 'react';
import axios from 'axios';
import { Stats } from './';

/* global sorttable, List */

export default class StatsBeer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            beers: []
        };
    }

    componentDidMount() {
        this.serverRequest = axios
        .get('https://spreadsheets.google.com/feeds/list/1a056ruITWMr8oeJECb8QM6ePe00IqTTEIkrkhY-QeMI/1/public/values?alt=json')
        .then(result => {
            this.setState({
                beers: result.data.feed.entry
            });

            document.querySelector('#beers .mdl-spinner').remove();

            const options = {
                valueNames: ['brewery', 'beer-name', 'beer-type', 'beer-abv', 'beer-rating', 'beer-date']
            };
            new List('beers', options);
        })
        .catch(err => {
            throw new Error(err);
        });

        const sort = document.getElementById('beerslist');
        sorttable.makeSortable(sort);
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
                <tbody className="list">
                    {this.state.beers.map(beer => {
                        let updated = beer.updated.$t;
                        updated = `Last updated: ${updated.substr(0,10)}`;
                        document.querySelector('#beers .mdl-tooltip').innerHTML = updated;

                        return (
                            <tr key={beer.id.$t}>
                                <td className="mdl-data-table__cell--non-numeric brewery">
                                    {beer.gsx$breweryname.$t}
                                </td>
                                <td className="mdl-data-table__cell--non-numeric beer-name">
                                    {beer.gsx$beername.$t}
                                </td>
                                <td className="mdl-data-table__cell--non-numeric beer-type">
                                    {beer.gsx$beertype.$t}
                                </td>
                                <td className="beer-abv">{beer.gsx$beerabv.$t}</td>
                                <td className="beer-rating">{beer.gsx$ratingscore.$t}</td>
                                <td className="beer-date">{beer.gsx$createdat.$t.substr(0,10)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Stats>
        );
    }
}
