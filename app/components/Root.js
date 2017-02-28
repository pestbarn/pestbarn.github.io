import React, { Component } from 'react';
import { Experience, Header } from '../containers/';
import { Logo, Contact, Aside, Pendulum, ExperienceList } from './';

class Root extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="root-container">
                <Header locator={true}>
                    <Logo />
                </Header>
                <Contact />
                <Aside />
                <Experience>
                    <Pendulum />
                    <ExperienceList />
                </Experience>
            </div>
        );
    }
}

export default Root;
