/* global SVG, axios */

function setObj(key, value) {
    Storage.prototype.setObject = function(key, value) {
        this.setItem(key, JSON.stringify(value));
    };
    return localStorage.setObject(key, value);
}

function getObj(key) {
    Storage.prototype.getObject = function(key) {
        let value = this.getItem(key);
        return value && JSON.parse(value);
    };
    return localStorage.getObject(key);
}

const animationTiming = {
    elastic: pos => {
        if (pos == !!pos) return pos;
        return Math.pow(2, -10 * pos) * Math.sin((pos - 0.075) * (2 * Math.PI) / .3) + 1;
    },

    swingTo: pos => {
        const s = 1.70158;
        return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    },

    bounceOut: pos => {
        if ((pos) < (1 / 2.75)) {
            return (7.5625 * pos * pos);
        } else if (pos < (2 / 2.75)) {
            return (7.5625 * (pos -= (1.5 / 2.75)) * pos + .75);
        } else if (pos < (2.5 / 2.75)) {
            return (7.5625 * (pos -= (2.25 / 2.75)) * pos + .9375);
        } else {
            return (7.5625 * (pos -= (2.625 / 2.75)) * pos + .984375);
        }
    }
};

const mouseOverSqueeze = function() {
    this
        .animate(200, animationTiming.swingTo, 0)
        .scale(.95);
};
const mouseOutSqueeze = function() {
    this
        .animate(200, animationTiming.swingTo, 0)
        .scale(1)
        .finish();
};

const screen = {
    mobile: 768,
};

(function() {
    let resizeTimeout,
        horizontal = document.body.clientWidth;

    const resizeThrottler = () => {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function() {
                resizeTimeout = null;
                if(document.body.clientWidth !== horizontal){
                    actualResizeHandler();
                    horizontal = document.body.clientWidth;
                }
            }, 900);
        }
    };

    const actualResizeHandler = () => {
        const reset = document.getElementById('logo');

        while (reset.firstChild) {
            reset.removeChild(reset.firstChild);
        }

        getObj('mattiasLogo') === null ? axios.get('/src/logo.json').then(p => runLogo(p)) : runLogo();
    };

    document.onreadystatechange = () => {
        if (document.readyState === 'complete') axios.get('/src/logo.json').then(p => runLogo(p));
    };

    window.addEventListener('resize', resizeThrottler, false);
    window.addEventListener('orientationchange', resizeThrottler, false);
})();


function runLogo(promise) {
    const logo = getObj('mattiasLogo') === null ? promise.data.logo : getObj('mattiasLogo');

    getObj('mattiasLogo') === null && setObj('mattiasLogo', logo);

    const svg = SVG('logo');

    svg.viewbox('0 0 616 374').size('100%', '100%');

    const color = {
        base: '#fe5f55',
        white: '#eef5db',
        complementary: '#f96'
    };

/**
 * LOGO DEFINITIONS AND BASE SETUP
 */

    const base = svg.path(logo.base),
        curlyLeft = svg.path(logo.curlyLeft),
        curlyRight = svg.path(logo.curlyRight),
        symbol = svg.path(logo.symbol);

    const patternX = 4,
        patternY = 4,
        pattern = svg.pattern(patternX, patternY, add => {
            let d = 'M1 3h1v1H1V3zm2-2h1v1H3V1z';
            add.rect(patternX, patternY).fill(color.base);
            add.path(d).fill(color.complementary);
        });

    base
        .fill(pattern)
        .stroke({
            width: 1,
            color: color.white,
            opacity: .9
        })
        .scale(-.05)
        .rotate(-5)
        .addClass('base');

    curlyLeft
        .back()
        .dx(100)
        .addClass('curly');

    curlyRight
        .back()
        .dx(-100)
        .addClass('curly');

    symbol
        .scale(.1)
        .addClass('symbol');

    const textFname =
        svg
        .group()
        .dmove(52, 70)
        .addClass('text');

    const textLname =
        svg
        .group()
        .dmove(-52, -70)
        .addClass('text');

    const textPrefix =
        svg
        .group()
        .dmove(52, -70)
        .addClass('text');

    const textSuffix =
        svg
        .group()
        .dmove(-52, 70)
        .addClass('text');

    svg.each(function() {
        this.opacity(0);
        if((this.type === 'path' || this.type === 'g') && !this.hasClass('base')) {
            this.style({fill: color.white});
        }

        if(this.hasClass('curly')) {
            this.on('mouseover', mouseOverSqueeze)
                .on('mouseout', mouseOutSqueeze);
        }

        if(this.hasClass('symbol')) {
            this
                .on('mousedown', function() {
                    textFname
                        .animate(300, animationTiming.swingTo, 0)
                        .dmove(7, 7);

                    textLname
                        .animate(300, animationTiming.swingTo, 0)
                        .dmove(-7, -7);

                    textPrefix
                        .animate(300, animationTiming.swingTo, 0)
                        .dmove(3.5, -3.5);

                    textSuffix
                        .animate(300, animationTiming.swingTo, 0)
                        .dmove(-3.5, 3.5);
                })
                .on('mouseup', function() {
                    textFname
                        .animate(300, animationTiming.swingTo, 0)
                        .dmove(-7, -7);

                    textLname
                        .animate(300, animationTiming.swingTo, 0)
                        .dmove(7, 7);

                    textPrefix
                        .animate(300, animationTiming.swingTo, 0)
                        .dmove(-3.5, 3.5);

                    textSuffix
                        .animate(300, animationTiming.swingTo, 0)
                        .dmove(3.5, -3.5);
                });
        }
    });

    const
        fNameLetter = [
            logo.fNameLetter0,
            logo.fNameLetter1,
            logo.fNameLetter2,
            logo.fNameLetter3,
            logo.fNameLetter4,
            logo.fNameLetter5,
            logo.fNameLetter6
        ],
        lNameLetter = [
            logo.lNameLetter0,
            logo.lNameLetter1,
            logo.lNameLetter2,
            logo.lNameLetter3,
            logo.lNameLetter4,
            logo.lNameLetter5,
            logo.lNameLetter6
        ],
        prefixLetter = [
            logo.prefixLetter0,
            logo.prefixLetter1,
            logo.prefixLetter2,
            logo.prefixLetter3,
            logo.prefixLetter4,
            logo.prefixLetter5,
            logo.prefixLetter6,
            logo.prefixLetter7,
        ],
        suffixLetter = [
            logo.suffixLetter0,
            logo.suffixLetter1,
            logo.suffixLetter2,
            logo.suffixLetter3,
            logo.suffixLetter4,
            logo.suffixLetter5,
            logo.suffixLetter6,
            logo.suffixLetter7,
            logo.suffixLetter8,
        ];

    fNameLetter.map(n => {
        n = svg.path(n);
        textFname.add(n);
    });

    lNameLetter.map(n => {
        n = svg.path(n);
        textLname.add(n);
    });

    prefixLetter.map(n => {
        n = svg.path(n);
        textPrefix.add(n);
    });

    suffixLetter.map(n => {
        n = svg.path(n);
        textSuffix.add(n);
    });

    const errorMsg = 'Wat' + window.innerWidth > screen.mobile;
    const isDesktop = window.innerWidth > screen.mobile;
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;

/**
 * ANIMATE BASE
 */
    switch(isDesktop || isLandscape) {
    case true:
        base
            .animate(600, animationTiming.bounceOut, 200)
            .rotate(0)
            .scale(1)
            .opacity(1)
            .delay(9000)
            .animate(3000, animationTiming.elastic, 3000)
            .rotate(-.05)
            .scale(.99)
            .scale(1.01)
            .rotate(.05)
            .scale(1)
            .rotate(0)
            .loop();
        break;
    case false:
        base
            .animate(600, animationTiming.bounceOut, 200)
            .cx(150)
            .rotate(-90)
            .scale(1)
            .opacity(1)
            .delay(9000)
            .animate(3000, animationTiming.elastic, 3000)
            .scale(.99)
            .scale(1.01)
            .scale(1)
            .loop();
        break;
    default:
        console.error(errorMsg);
    }


/**
 * ANIMATE CURLIES AND SYMBOL
 */

    switch(isDesktop || isLandscape) {
    case true:
        curlyLeft
            .animate(1000, animationTiming.elastic, 1000)
            .dx(-100)
            .opacity(1);

        curlyRight
            .animate(1000, animationTiming.elastic, 1000)
            .dx(100)
            .opacity(1);

        symbol
            .animate(800, animationTiming.elastic, 1000)
            .opacity(1)
            .scale(1);
        break;
    case false:
        curlyLeft
            .rotate(-90)
            .dy(35)
            .animate(1000, animationTiming.elastic, 1000)
            .dx(-308)
            .opacity(1);

        curlyRight
            .rotate(-90)
            .dy(-35)
            .dx(-154)
            .animate(1000, animationTiming.elastic, 1000)
            .dx(150)
            .opacity(1);

        symbol
            .dy(1540)
            .animate(800, animationTiming.elastic, 1000)
            .opacity(1)
            .scale(1);
        break;
    default:
        console.error(errorMsg);
    }


/**
 * FIRST NAME
 */

    switch(isDesktop || isLandscape) {
    case true:
        textFname
            .animate(400, animationTiming.swingTo, 1800)
            .dmove(-52, -70)
            .opacity(1);
        break;
    case false:
        textFname
            .dy(154)
            .rotate(-10)
            .animate(400, animationTiming.swingTo, 1800)
            .dmove(-52, -70)
            .opacity(1);
        break;
    default:
        console.error(errorMsg);
    }


/**
 * LAST NAME
 */

    switch(isDesktop || isLandscape) {
    case true:
        textLname
            .animate(400, animationTiming.swingTo, 2100)
            .dmove(52, 70)
            .opacity(1);
        break;
    case false:
        textLname
            .dy(154)
            .rotate(-10)
            .animate(400, animationTiming.swingTo, 2100)
            .dmove(52, 70)
            .opacity(1);
        break;
    default:
        console.error(errorMsg);
    }


/**
 * PREFIX
 */

    switch(isDesktop || isLandscape) {
    case true:
        textPrefix
            .animate(400, animationTiming.swingTo, 3000)
            .dmove(-52, 70)
            .opacity(1);
        break;
    case false:
        textPrefix
            .dy(154)
            .rotate(9)
            .animate(400, animationTiming.swingTo, 3000)
            .dmove(-52, 70)
            .opacity(1);
        break;
    default:
        console.error(errorMsg);
    }


/**
 * SUFFIX
 */

    switch(isDesktop || isLandscape) {
    case true:
        textSuffix
            .animate(400, animationTiming.swingTo, 3300)
            .dmove(52, -70)
            .opacity(1);
        break;
    case false:
        textSuffix
            .dy(154)
            .rotate(9)
            .animate(400, animationTiming.swingTo, 3300)
            .dmove(52, -70)
            .opacity(1);
        break;
    default:
        console.error(errorMsg);
    }
}
