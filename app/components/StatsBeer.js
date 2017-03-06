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
        .get('https://doc-0o-2k-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/pcb9mm1le955k9itr4menll9itegkl5j/1488794400000/10166180421145262528/*/0B9yDBByGfhzqV2luejZiN0hFUnc')
        .then(result => {
            this.setState({
                beers: result.data
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
                        let updated = `Last updated: ${beer.created_at.substr(0,10)}`;
                        document.querySelector('#beers .mdl-tooltip').innerHTML = updated;

                        return (
                            <tr key={beer.beer_url}>
                                <td className="mdl-data-table__cell--non-numeric brewery">
                                    {beer.brewery_name}
                                </td>
                                <td className="mdl-data-table__cell--non-numeric beer-name">
                                    {beer.beer_name}
                                </td>
                                <td className="mdl-data-table__cell--non-numeric beer-type">
                                    {beer.beer_type}
                                </td>
                                <td className="beer-abv">{beer.beer_abv}%</td>
                                <td className="beer-rating">{beer.rating_score}</td>
                                <td className="beer-date">{beer.created_at.substr(0,10)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Stats>
        );
    }
}
