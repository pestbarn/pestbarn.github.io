import React from 'react';
import Locator from '../components/Locator';

const Main = props => {
    return (
        <main>
            {props.children}
            <Locator />
        </main>
    );
};

export default Main;
