import React, { Component } from 'react';
import { Header, Logo, Contact, Aside, Experience, Pendulum, ExperienceList } from './';

class Root extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="root-container">
                <Header>
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
