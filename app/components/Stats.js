import React from 'react';

export default class Stats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-content mdl-grid">
                <div className="mdl-cell mdl-cell--12-col" id={this.props.subId}>
                    <h1 className="mdl-typography--headline">
                        {this.props.subHeader}
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                            <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor={'search-' + this.props.subId}>
                                <i className="material-icons">search</i>
                            </label>

                            <div className="mdl-textfield__expandable-holder">
                                <input className="mdl-textfield__input search" type="text" name="sample" id={'search-' + this.props.subId} />
                            </div>
                        </div>
                        <div className="mdl-spinner mdl-js-spinner is-active"></div>
                    </h1>
                    <div className="mdl-tooltip" htmlFor={'search-' + this.props.subId}></div>
                    <table className="mdl-data-table mdl-js-data-table" id={this.props.subId + 'list'}>
                        {this.props.children}

                        <tbody className="list" />
                    </table>
                </div>
            </div>
        );
    }
}
