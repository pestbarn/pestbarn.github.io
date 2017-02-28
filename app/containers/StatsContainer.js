import React, { Component } from 'react';
import { Stats } from '../components';

class StatsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
        this.handleInitiateBattle = this.handleInitiateBattle.bind(this);
    }

    render() {
        return (
            <Stats
                isLoading={this.state.isLoading}
                onInitiateBattle={this.handleInitiateBattle}
                playersInfo={this.state.playersInfo} />
        );
    }
}

StatsContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default StatsContainer;
