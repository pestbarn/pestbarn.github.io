import React, { Component } from 'react';
import { Stats, StatsGigs } from '../components';
require('css-loader?importLoaders=1!resolve-url-loader!../../stats/stats.css');

class StatsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    render() {
        return (
            <Stats
                isLoading={this.state.isLoading}>
                <StatsGigs />
            </Stats>
        );
    }
}

export default StatsContainer;
