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
        .get('https://dl.dropboxusercontent.com/s/f7ustvn6xp1bo6h/Untappd.json')
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
                        <th className="mdl-data-table__cell--non-numeric sorttable_numeric">ABV</th>
                        <th className="mdl-data-table__cell--non-numeric sorttable_numeric">Rating</th>
                        <th className="mdl-data-table__cell--non-numeric sorttable_numeric">Checkin date</th>
                    </tr>
                </thead>
                <tbody className="list">
                    {this.state.beers.map(beer => {
                        let updated = `Last updated: ${beer.created_at.substr(0, 10)}`;
                        document.querySelector('#beers .mdl-tooltip').innerHTML = updated;

                        let beerAbv = beer.beer_abv.replace('.', ',');
                        const addDecimal = /^(\d{1,2})$/g;
                        beerAbv = beerAbv.replace(addDecimal, '$1,0');

                        let rating = beer.rating_score.replace('.', ',');
                        const rateWhole = /^(\d{1})$/g;
                        const rateHalfs = /^(\d{1},5)$/g;
                        rating = rating.replace(rateWhole, '$1,00');
                        rating = rating.replace(rateHalfs, '$10');

                        return (
                            <tr key={beer.beer_url}>
                                <td className="mdl-data-table__cell--non-numeric brewery">
                                    {beer.brewery_name}
                                </td>
                                <td className="mdl-data-table__cell--non-numeric beer-name">
                                    <a href={beer.beer_url}>{beer.beer_name}</a>
                                </td>
                                <td className="mdl-data-table__cell--non-numeric beer-type">
                                    {beer.beer_type}
                                </td>
                                <td className="mdl-data-table__cell beer-abv">
                                    {beerAbv}%
                                </td>
                                <td className="mdl-data-table__cell beer-rating">
                                    {rating}
                                </td>
                                <td className="mdl-data-table__cell beer-date">
                                    {beer.created_at.substr(0, 10)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Stats>
        );
    }
}
