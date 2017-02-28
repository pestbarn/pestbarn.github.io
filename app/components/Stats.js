import React from 'react';
import { Link } from 'react-router';

export default class Stats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">

                <div className="mdl-layout__header">

                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">Stats of life</span>
                    </div>

                    <div className="mdl-layout__tab-bar mdl-js-ripple-effect">
                        <Link to="/stats/gigs" id="gigs" className="mdl-layout__tab is-active">Attended gigs</Link>
                        <Link to="/stats/beer" id="beer" className="mdl-layout__tab">Beer list</Link>
                    </div>

                </div>

                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Stats of life</span>

                    <nav className="mdl-navigation">
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
