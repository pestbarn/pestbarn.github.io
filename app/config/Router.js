import React, { Component } from 'react';
import { hashHistory, IndexRoute, Router, Route } from 'react-router';

import { ConfirmSent, StatsBeer, StatsGigs, Root } from '../components';
import { StatsContainer } from '../containers';

class Routes extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Root} />
                <Route path="/sent" component={ConfirmSent} />
                <Route path="/stats" header="Stats of Life" component={StatsContainer}>
                    <IndexRoute component={StatsGigs} />
                    <Route path="/stats/gigs" subHeader="Attended Gigs" component={StatsGigs} />
                    <Route path="/stats/beer" subHeader="Beer List" component={StatsBeer} />
                </Route>
            </Router>
        );
    }
}

export default <Routes />;
