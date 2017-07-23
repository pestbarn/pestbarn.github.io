/* global SVG, Vivus */

const singlePath = {
    friend: 'M35,15.5 C35,14.673 35.673,14 36.5,14 C37.327,14 38,14.673 38,15.5 C38,16.327 37.327,17 36.5,17 C35.673,17 35,16.327 35,15.5 M22,15.5 C22,14.673 22.673,14 23.5,14 C24.327,14 25,14.673 25,15.5 C25,16.327 24.327,17 23.5,17 C22.673,17 22,16.327 22,15.5 M56,51 C56,55.334 53.81,60 49,60 L45,60 C44.447,60 44,59.552 44,59 C44,58.448 44.447,58 45,58 L49,58 C52.436,58 54,54.372 54,51 C54,48.592 52.436,46 49,46 C45.064,46 45.001,51.756 45,52.001 C44.998,52.553 44.551,52.999 44,52.999 L43.998,52.999 C43.446,52.999 43,52.552 43,52 C43,49.399 44.109,44.623 48.182,44.057 C48.55,42.135 48.341,40.642 47.55,39.621 C46.324,38.038 44.02,38 43.996,38 C43.445,37.996 43,37.546 43.002,36.996 C43.005,36.445 43.449,36 44,36 C44.133,36 47.281,36.027 49.117,38.378 C50.232,39.808 50.595,41.729 50.206,44.096 C54.011,44.657 56,47.841 56,51 M11.818,44.057 C15.891,44.623 17,49.399 17,52 C17,52.552 16.554,52.999 16.002,52.999 L16,52.999 C15.449,52.999 15.002,52.553 15,52.001 C14.999,51.756 14.936,46 11,46 C7.564,46 6,48.592 6,51 C6,54.372 7.564,58 11,58 L15,58 C15.553,58 16,58.448 16,59 C16,59.552 15.553,60 15,60 L11,60 C6.19,60 4,55.334 4,51 C4,47.841 5.989,44.657 9.794,44.096 C9.405,41.729 9.768,39.808 10.883,38.378 C12.719,36.027 15.867,36 16,36 C16.553,36 17,36.448 17,37 C17,37.551 16.555,37.998 16.004,38 C15.969,38 13.673,38.042 12.45,39.621 C11.659,40.642 11.45,42.135 11.818,44.057 M40.998,51.726 C41.869,52.532 42.744,54.144 41.97,57.243 C41.638,58.571 40.567,60 39,60 L34,60 C32.366,60 30.913,59.212 30,57.997 C29.087,59.212 27.634,60 26,60 L21,60 C19.427,60 18.246,58.559 18.014,57.165 C17.528,54.257 17.885,52.337 19.104,51.294 C20.199,50.359 21.668,50.391 22.975,50.674 C22.913,48.709 22.71,44.963 22.03,42.243 C21.896,41.707 22.222,41.164 22.758,41.03 C23.293,40.894 23.836,41.222 23.97,41.757 C24.81,45.116 24.965,49.724 24.993,51.378 L26.447,52.105 C26.941,52.353 27.142,52.953 26.895,53.447 C26.719,53.798 26.366,54 25.999,54 C25.849,54 25.696,53.966 25.553,53.895 L23.633,52.935 C22.022,52.404 20.935,52.362 20.404,52.814 C19.789,53.34 19.642,54.768 19.986,56.835 C20.086,57.434 20.579,58 21,58 L26,58 C27.654,58 29,56.654 29,55 L29,47 C29,46.448 29.447,46 30,46 C30.553,46 31,46.448 31,47 L31,55 C31,56.654 32.346,58 34,58 L39,58 C39.396,58 39.858,57.442 40.03,56.757 C40.326,55.571 40.499,53.99 39.64,53.194 C38.985,52.588 37.736,52.492 36.369,52.934 L34.447,53.895 C34.304,53.966 34.151,54 34.001,54 C33.634,54 33.281,53.798 33.105,53.447 C32.858,52.953 33.059,52.353 33.553,52.105 L35.007,51.378 C35.035,49.724 35.19,45.116 36.03,41.757 C36.163,41.222 36.706,40.893 37.242,41.03 C37.778,41.164 38.104,41.707 37.97,42.243 C37.283,44.991 37.082,48.78 37.024,50.729 C38.613,50.497 40.044,50.842 40.998,51.726 M27.188,22.057 C27.422,22.97 27.935,24.255 29,24.77 L29,26 C29,26.891 29,27.382 27.553,28.105 C27.059,28.353 26.858,28.953 27.105,29.447 C27.354,29.941 27.952,30.142 28.447,29.895 C29.131,29.553 29.632,29.198 30,28.833 C30.368,29.198 30.869,29.553 31.553,29.895 C31.696,29.966 31.849,30 31.999,30 C32.366,30 32.719,29.798 32.895,29.447 C33.142,28.953 32.941,28.353 32.447,28.105 C31,27.382 31,26.891 31,26 L31,24.77 C32.067,24.256 32.579,22.97 32.812,22.057 C35.827,22.24 36,22.867 36,23 C36,27.794 33.196,32 30,32 C26.804,32 24,27.794 24,23 C24,22.867 24.173,22.241 27.188,22.057 M30,21 C30.569,21 30.847,21.096 30.966,21.157 C30.818,21.976 30.413,23 30,23 C29.586,23 29.186,21.987 29.034,21.157 C29.154,21.095 29.432,21 30,21 M30,34 C34.785,34 38,28.312 38,23 C38,20.479 34.646,20.124 32.662,20.042 C32.301,19.528 31.556,19 30,19 C28.444,19 27.699,19.528 27.338,20.042 C25.354,20.125 22,20.481 22,23 C22,28.312 25.215,34 30,34 M18.669,8.388 C18.447,8.031 18.027,7.853 17.617,7.936 C15.724,8.325 14,6.857 14,5 C14,3.346 15.346,2 17,2 C18.654,2 20,3.346 20,5 L20,5.608 C19.933,5.672 19.858,5.728 19.793,5.793 C19.402,6.184 19.402,6.816 19.793,7.207 C20.184,7.598 20.816,7.598 21.207,7.207 C23.857,4.557 27.452,4 30,4 C33.604,4 36.727,5.144 38.791,7.221 C38.986,7.417 39.243,7.516 39.5,7.516 C39.755,7.516 40.01,7.419 40.205,7.225 C40.597,6.835 40.599,6.203 40.209,5.811 C40.144,5.744 40.067,5.688 40,5.623 L40,5 C40,3.346 41.346,2 43,2 C44.654,2 46,3.346 46,5 C46,6.856 44.283,8.332 42.384,7.936 C41.979,7.855 41.553,8.031 41.332,8.388 C41.11,8.745 41.136,9.201 41.395,9.531 C44.364,13.326 46,18.82 46,25 C46,31.277 36.609,38 30,38 C23.391,38 14,31.277 14,25 C14,18.819 15.636,13.326 18.606,9.532 C18.865,9.201 18.891,8.745 18.669,8.388 M30,40 C39.101,40 48,31.411 48,25 C48,19.178 46.62,13.891 44.083,9.882 C46.321,9.386 48,7.385 48,5 C48,2.243 45.757,0 43,0 C40.539,0 38.5,1.791 38.088,4.135 C35.856,2.748 33.071,2 30,2 C26.883,2 24.136,2.727 21.91,4.116 C21.491,1.781 19.454,0 17,0 C14.243,0 12,2.243 12,5 C12,7.385 13.679,9.386 15.917,9.882 C13.38,13.891 12,19.177 12,25 C12,31.411 20.899,40 30,40'
};

const renderFriends = () => {
    const svg = SVG('friend');

    svg.viewbox('0 -1 52 62');

    const friend = svg.path(singlePath.friend);

    friend
        .fill({
            opacity: 0
        })
        .stroke({
            color: '#fe5f55',
            opacity: 1,
            width: 1
        });

    new Vivus(svg.node, {
        type: 'delayed',
        duration: 1200
    });
};

const skills = {
    colors: ['#415e72', '#cfdce5', '#aac1ce', '#8ba0ae', '#fff', '#e04f5f', '#25b6d2', '#6b6b6b'],

    desktopBackground: 'M0 345.3V52.6c.1-5.1 4.3-9.3 9.4-9.4h443.9c5.1.1 9.3 4.3 9.4 9.4v292.8L0 345.3z',

    desktopFrame: ['M462.7 345.3v37.6c-.1 5.1-4.3 9.3-9.4 9.4H9.4c-5.2-.1-9.3-4.3-9.4-9.4v-37.6h462.7zM132.3 458.8h198.1v9.4H132.3z', 'M297.1 458.8H165.5l9.4-66.5h112.8z', 'M287.7 392.3H174.9l-5.2 37.1 119.7-25.1z'],

    desktopScreenBackground: 'M18.8 62h425v264.6h-425z',

    desktopCode: ['M192.8 263.4h51.9v9.6h-51.9z', 'M71.8 263.4H141v9.6H71.8z', 'M71.8 194.2H141v9.6H71.8z', 'M175.5 194.2h69.2v9.6h-69.2z', 'M262 194.2h69.2v9.6H262z', 'M306.4 228.8H341v9.6h-34.6z', 'M227.4 228.8H262v9.6h-34.6z', 'M91.4 228.8h65v9.6h-65z', 'M71.8 297.9h172.9v9.6H71.8z', 'M286.5 297.9h41.9v9.6h-41.9z', 'M313.8 159.6h34.6v9.6h-34.6z', 'M227.4 159.6H262v9.6h-34.6z', 'M71.8 159.6h103.7v9.6H71.8z', 'M262 90.5h86.4v9.6H262z', 'M192.8 90.5h34.6v9.6h-34.6zm207.4 0h34.6v9.6h-34.6z', 'M54.5 90.5h103.7v9.6H54.5z', 'M279.3 125.1h69.2v9.6h-69.2z', 'M210.1 125.1h34.6v9.6h-34.6z', 'M37.2 125.1h103.7v9.6H37.2z'],

    tabletBase: 'M488.2 468.8H364.8c-13.1 0-23.8-10.7-23.8-23.8V184.8c0-13.1 10.7-23.8 23.8-23.8h123.4c13.1 0 23.8 10.7 23.8 23.8V445c0 13.2-10.7 23.8-23.8 23.8z',

    tabletScreen: 'M352.2 185.3h148.5v242.8H352.2z',

    articleTabletPanel1: 'M363.3 338h127v75.2h-127z',
    articleTabletHeadline1: 'M377.8 349.9h98.1v3.6h-98.1z',
    articleTabletPanel2: 'M363.3 252.5h127v75.2h-127z',
    articleTabletParagraph: 'M377.8 276.6h98.1v3.6h-98.1zm0 9.3h98.1v3.6h-98.1zm0 9.3h98.1v3.6h-98.1zm0 9.3h98.1v3.6h-98.1zm0 9.2h98.1v3.6h-98.1z',
    articleTabletHeadline2: 'M377.8 264.5h98.1v3.6h-98.1z',
    articleTabletHeader: 'M363.3 197h127v45.3h-127z',

    phoneBase: 'M480.6 364v87.8c0 9.4-8.4 16.9-18.8 17H256.5c-10.4 0-18.8-7.6-18.8-17V364c0-9.4 8.4-16.9 18.8-17h205.3c10.4.1 18.8 7.6 18.8 17z',

    phoneScreen: 'M256.9 355.1h191.6v105.6H256.9z',

    phoneSpeaker: 'M249 392.1v21.6c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8V392c0-1 .8-1.8 1.8-1.8 1 .1 1.8.8 1.8 1.9 0-.1 0-.1 0 0z',

    phoneHomeBtn: 'M472.4 407.9c0 4.6-3.7 8.4-8.4 8.4-4.6 0-8.4-3.7-8.4-8.4 0-4.6 3.7-8.4 8.4-8.4s8.4 3.8 8.4 8.4zm-15 0c0 3.7 3 6.6 6.6 6.6 3.7 0 6.6-3 6.6-6.6 0-3.7-3-6.6-6.6-6.6-3.6 0-6.6 2.9-6.6 6.6z',

    articlePhonePanel1: 'M262.9 416.9h177.9v43.9H262.9z',
    articlePhoneParagraph1: 'M283.2 440.4h137.4v3.5H283.2zm0 9.1h137.4v3.5H283.2zm0 9.1h137.4v2.1H283.2z',
    articlePhoneHeadline1: 'M283.2 428.6h137.4v3.5H283.2z',
    articlePhonePanel2: 'M357.3 362h83.6v47.5h-83.6z',
    articlePhoneParagraph2: 'M365 379.4h66.1v2.4H365zm0 6.3h66.1v2.4H365zm0 6.2h66.1v2.4H365zm0 6.3h66.1v2.4H365z',
    articlePhoneHeadline2: 'M365 371.2h66.1v2.4H365z',
    articlePhoneHeader: 'M262.9 362h81.8v47.5h-81.8z'
};

const renderSkills = () => {
    const svg = SVG('skills');

    svg.viewbox('0 0 512 512');


    /**
     * Desktop
     */
    const desktopBackground = svg.path(skills.desktopBackground),
        desktopFrame = skills.desktopFrame.map(n => svg.path(n)),
        desktopScreenBackground = svg.path(skills.desktopScreenBackground),
        desktopCode = skills.desktopCode.map(n => svg.path(n));

    desktopBackground
        .fill(skills.colors[0]);
    desktopFrame.forEach((n, i) => {
        n.fill(skills.colors[i + 1]);
    });
    desktopScreenBackground
        .fill(skills.colors[4]);

    desktopCode.forEach((n, i) => {
        const nWidth = n.width();
        let range = [5, 2, 6, 7],
            r = Math.floor(Math.random() * range.length);
        n.fill(skills.colors[range[r]]);
        n.width(range[r]).opacity(0);
        n.animate(400, '>', (i + 1) * 100).opacity(1).width(nWidth).afterAll(() => {
            i++;
            if(i === 19) {
                animateTablet();
            }
        });
    });


    /**
     * Tablet
     */
    const tabletBase = svg.path(skills.tabletBase),
        tabletScreen = svg.path(skills.tabletScreen),
        tabletCamera = svg.circle().attr({
            cx: 428.2,
            cy: 173.2,
            r: 2.5
        });

    tabletBase.fill(skills.colors[0]);
    [tabletScreen, tabletCamera].map(n => {
        n.fill(skills.colors[1]);
    });
    tabletScreen.opacity(.5);


    /**
     * Article (tablet)
     */
    const articleTabletPanel1 = svg.path(skills.articleTabletPanel1),
        articleTabletHeadline1 = svg.path(skills.articleTabletHeadline1),
        articleTabletPanel2 = svg.path(skills.articleTabletPanel2),
        articleTabletParagraph = svg.path(skills.articleTabletParagraph),
        articleTabletHeadline2 = svg.path(skills.articleTabletHeadline2),
        articleTabletHeader = svg.path(skills.articleTabletHeader);

    [articleTabletPanel1, articleTabletPanel2].map(n => {
        n.fill(skills.colors[4]).opacity(0);
    });

    [articleTabletHeadline1, articleTabletHeadline2].map(n => {
        n.fill(skills.colors[0]).opacity(0);
    });

    articleTabletParagraph.fill(skills.colors[1]).opacity(0);
    articleTabletHeader.fill(skills.colors[5]).opacity(0);

    const animateTablet = () => {
        tabletScreen.animate(400, '>').opacity(1).after(() => {
            const headerWidth = articleTabletHeader.width(),
                panel1 = articleTabletPanel1.height(),
                panel2 = articleTabletPanel2.height(),
                headline1 = articleTabletHeadline1.width(),
                headline2 = articleTabletHeadline2.width(),
                paragraph = articleTabletParagraph.height();
            articleTabletHeader
                .width(1)
                .animate(400, '<>')
                .width(headerWidth)
                .opacity(1)
                .after(() => {
                    animatePhone();
                    articleTabletPanel2
                        .height(1)
                        .animate(400, '>', 400)
                        .height(panel2)
                        .opacity(1).after(() => {
                            articleTabletHeadline2
                                .width(1)
                                .animate(400, '>')
                                .width(headline2)
                                .opacity(1);
                            articleTabletPanel1
                                .height(1)
                                .animate(400, '>')
                                .height(panel1)
                                .opacity(1)
                                .after(() => {
                                    articleTabletParagraph
                                        .height(1)
                                        .animate(400, '>')
                                        .height(paragraph)
                                        .opacity(1);
                                    articleTabletHeadline1
                                        .width(1)
                                        .animate(400, '>')
                                        .width(headline1)
                                        .opacity(1);
                                });
                        });
                });
        });
    };

    /**
     * Phone
     */
    const phoneBase = svg.path(skills.phoneBase),
        phoneScreen = svg.path(skills.phoneScreen),
        phoneSpeaker = svg.path(skills.phoneSpeaker),
        phoneHomeBtn = svg.path(skills.phoneHomeBtn),
        phoneCamera = svg.circle().attr({
            cx: 247.2,
            cy: 423.7,
            r: 1.8
        });

    phoneBase.fill(skills.colors[0]);
    [phoneScreen, phoneSpeaker, phoneHomeBtn, phoneCamera].map(n => {
        n.fill(skills.colors[1]);
    });
    phoneScreen.opacity(.5);


    /**
     * Article (phone)
     */

    const articlePhonePanel1 = svg.path(skills.articlePhonePanel1),
        articlePhoneParagraph1 = svg.path(skills.articlePhoneParagraph1),
        articlePhoneHeadline1 = svg.path(skills.articlePhoneHeadline1),
        articlePhonePanel2 = svg.path(skills.articlePhonePanel2),
        articlePhoneParagraph2 = svg.path(skills.articlePhoneParagraph2),
        articlePhoneHeadline2 = svg.path(skills.articlePhoneHeadline2),
        articlePhoneHeader = svg.path(skills.articlePhoneHeader);

    [articlePhonePanel1, articlePhonePanel2].map(n => {
        n.fill(skills.colors[4]).opacity(0);
    });
    [articlePhoneParagraph1, articlePhoneParagraph2].map(n => {
        n.fill(skills.colors[1]).opacity(0);
    });
    [articlePhoneHeadline1, articlePhoneHeadline2].map(n => {
        n.fill(skills.colors[0]).opacity(0);
    });
    articlePhoneHeader.fill(skills.colors[5]).opacity(0);

    const animatePhone = () => {
        phoneScreen.animate(400, '>').opacity(1).after(() => {
            const headerWidth = articlePhoneHeader.width(),
                panel1 = articlePhonePanel1.height(),
                panel2 = articlePhonePanel2.height(),
                headline1 = articlePhoneHeadline1.width(),
                headline2 = articlePhoneHeadline2.width(),
                paragraph1 = articlePhoneParagraph1.height(),
                paragraph2 = articlePhoneParagraph2.height();
            articlePhoneHeader
                .width(1)
                .animate(400, '<>')
                .width(headerWidth)
                .opacity(1)
                .after(() => {
                    articlePhonePanel2
                        .height(1)
                        .animate(400, '>', 400)
                        .height(panel2)
                        .opacity(1).after(() => {
                            articlePhoneHeadline2
                                .width(1)
                                .animate(400, '>')
                                .width(headline2)
                                .opacity(1);
                            articlePhonePanel1
                                .height(1)
                                .animate(400, '>')
                                .height(panel1)
                                .opacity(1)
                                .after(() => {
                                    articlePhoneParagraph2
                                        .height(1)
                                        .animate(400, '>')
                                        .height(paragraph2)
                                        .opacity(1);
                                    articlePhoneHeadline1
                                        .width(1)
                                        .animate(400, '>')
                                        .width(headline1)
                                        .opacity(1);
                                    articlePhoneParagraph1
                                        .height(1)
                                        .animate(400, '>')
                                        .height(paragraph1)
                                        .opacity(1);
                                });
                        });
                });
        });
    };
};

const message = {
    colors: ['#25b6d2', '#e04f5f', '#fff'],
    poly0: '420.472,355.784 420.472,499.688 238.192,355.784',
    path: 'M485.224,380.424H26.776C12.008,380.384,0.04,368.416,0,353.648V39.088 C0.04,24.32,12.008,12.352,26.776,12.312h458.448C499.992,12.352,511.96,24.32,512,39.088v314.56 C511.96,368.416,499.992,380.384,485.224,380.424z',
    poly1: '420.472,380.424 267.808,380.424 295.512,401.032 420.472,401.032'
};

const renderContact = () => {
    const svg = SVG('message');

    svg.viewbox('0 0 512 512');

    const poly0 = svg.polygon(message.poly0),
        path = svg.path(message.path),
        poly1 = svg.polygon(message.poly1);

    poly0.fill(message.colors[0]);
    path.fill(message.colors[1]),
    poly1.fill(message.colors[0]);

    let y = 75;

    [0, 1, 2, 3, 4].forEach((n, i) => {
        svg.rect().attr({
            x: i % 2 ? 256 : 122,
            y: i === 0 ? y : y = y + 50,
            fill: message.colors[2],
            width: i % 2 ? 133 : 266,
            height: 16
        });
    });
};

(function() {
    renderFriends();
    renderSkills();
    renderContact();
})();
