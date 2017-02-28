import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';

import { Root } from '../components';
import { StatsContainer } from '../containers';

class Routes extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Root} />
                <Route path="/stats" header="Stats of Life" component={StatsContainer}>
                    <Route path="/stats/gigs" subHeader="Attended Gigs" component={StatsContainer} />
                    <Route path="/stats/beer" subHeader="Beer List" component={StatsContainer} />
                </Route>
            </Router>
        );
    }
}

export default <Routes />;
