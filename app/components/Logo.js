import React from 'react';
import Isvg from 'react-inlinesvg';

const Logo = () => {
    function check() {
        let n = navigator.userAgent;
        // yeah yeah, shouldn't use browser sniffing, but whatever...
        const browser = (n.indexOf('Firefox') != -1 || n.indexOf('Safari') != -1);
        const chrome = n.indexOf('Chrome') != -1;

        if (browser && !chrome) {
            return false;
        } else return true;
    }

    return (
        check()
        ? <Isvg src="/src/img/inlineLogo.svg" uniquifyIDs={false} />
        : <img src="/src/img/logotype.svg" />
    );
};

export default Logo;
