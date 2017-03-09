import React, { Component } from 'react';
import { Link } from 'react-router';

class StatsContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mdl-layout mdl-js-layout">

                <div className="mdl-layout__header">

                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">Stats of life</span>

                        <div className="mdl-layout-spacer"></div>

                        <div className="mdl-navigation">
                            <Link className="mdl-navigation__link" to="/stats">Attended gigs</Link>
                            <Link className="mdl-navigation__link" to="/stats/beer">Beer list</Link>
                        </div>
                    </div>

                </div>

                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Stats of life</span>

                    <nav className="mdl-navigation">
                        <Link className="mdl-navigation__link" to="/stats">Attended gigs</Link>
                        <Link className="mdl-navigation__link" to="/stats/beer">Beer list</Link>
                        <Link className="mdl-navigation__link" to="/">Back to mattias.pw</Link>
                    </nav>
                </div>

                <div className="mdl-layout__content">
                    {this.props.children}
                </div>

            </div>
        );
    }
}

export default StatsContainer;
