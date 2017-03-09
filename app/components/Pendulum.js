import React from 'react';

const Pendulum = () => {
    const Pendulae = () => {
        return Array.from(Array(10), (e, i) => {
            return <div className={'pendulum-' + (i+1)} key={i+1}></div>;
        });
    };

    return (
        <div className="pendula">
            {Pendulae()}
        </div>
    );
};

export default Pendulum;
