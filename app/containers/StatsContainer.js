import React, { Component } from 'react';
import { Stats } from '../components';

class StatsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            playersInfo: []
        };
        this.handleInitiateBattle = this.handleInitiateBattle.bind(this);
    }

    componentDidMount() {
        let query = this.props.location.query;
    }

    handleInitiateBattle() {
        this.context.router.push({
            pathname: '/results',
            state: {
                playersInfo: this.state.playersInfo
            }
        });
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
