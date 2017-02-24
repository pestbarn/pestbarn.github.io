import React from 'react';

export default class Locator extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const parent = e.target.parentElement.nodeName;
        const div = e.target.classList;
        if(parent == 'HEADER' || parent == 'MAIN' || div == 'locate'){
            const el = document.querySelector('header');
            el.className == 'clicked' ? el.className = 'reverse' : el.className = 'clicked';
        }
    }

    render() {
        return (
            <div className="locate" onClick={this.handleClick}></div>
        );
    }
}
