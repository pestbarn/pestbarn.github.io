import React from 'react';
import Locator from './Locator';

const Main = props => {
    return (
        <main>
            {props.children}
            <Locator />
        </main>
    );
};

export default Main;
