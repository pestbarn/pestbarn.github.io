/* global SVG, Vivus, axios, setObj, getObj */

const renderFriends = promise => {
    const teddyBear = promise.data.friend;

    const svg = SVG('friend');

    svg.viewbox('0 -1 52 62');

    const friend = svg.path(teddyBear);

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

    const element = document.querySelector('#friend svg');

    element.onclick = () => {
        const reset = element;

        while (reset.parentNode) {
            reset.parentNode.removeChild(reset);
        }

        getObj('mattiasIcons') === null ? axios.get('/src/icons.json').then(promise => renderFriends(promise)) : renderFriends(getObj('mattiasIcons'));
    };
};

const renderSkills = promise => {
    const skills = promise.data.skills;

    const svg = SVG('skills');

    svg.viewbox('0 0 512 512');


    /**
     * Desktop
     */
    const [
        desktopBackground,
        desktopFrame,
        desktopScreenBackground,
        desktopCode
    ] = [
        svg.path(skills.desktopBackground),
        skills.desktopFrame.map(n => svg.path(n)),
        svg.path(skills.desktopScreenBackground),
        skills.desktopCode.map(n => svg.path(n))
    ];

    desktopBackground.fill(skills.colors[0]);

    desktopFrame.forEach((n, i) => {
        n.fill(skills.colors[i + 1]);
    });
    desktopScreenBackground.fill(skills.colors[4]);

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

    const [
        articleTabletPanel1,
        articleTabletHeadline1,
        articleTabletPanel2,
        articleTabletParagraph,
        articleTabletHeadline2,
        articleTabletHeader
    ] = [
        svg.path(skills.articleTabletPanel1),
        svg.path(skills.articleTabletHeadline1),
        svg.path(skills.articleTabletPanel2),
        svg.path(skills.articleTabletParagraph),
        svg.path(skills.articleTabletHeadline2),
        svg.path(skills.articleTabletHeader)
    ];

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

    const [
        articlePhonePanel1,
        articlePhoneParagraph1,
        articlePhoneHeadline1,
        articlePhonePanel2,
        articlePhoneParagraph2,
        articlePhoneHeadline2,
        articlePhoneHeader
    ] = [
        svg.path(skills.articlePhonePanel1),
        svg.path(skills.articlePhoneParagraph1),
        svg.path(skills.articlePhoneHeadline1),
        svg.path(skills.articlePhonePanel2),
        svg.path(skills.articlePhoneParagraph2),
        svg.path(skills.articlePhoneHeadline2),
        svg.path(skills.articlePhoneHeader)
    ];

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

    const element = document.querySelector('#skills svg');

    element.onclick = () => {
        const reset = element;

        while (reset.parentNode) {
            reset.parentNode.removeChild(reset);
        }

        getObj('mattiasIcons') === null ? axios.get('/src/icons.json').then(promise => renderSkills(promise)) : renderSkills(getObj('mattiasIcons'));
    };
};

const renderWork = promise => {
    const work = promise.data.work;

    const svg = SVG('jobs');

    svg.viewbox('0 0 512 512');

    const base = svg.path(work.base).opacity(0),
        headline = svg.path(work.headline).opacity(0),
        paragraph = svg.path(work.paragraph).opacity(0),
        redBg = svg.path(work.redBg).opacity(0),
        topHeadline = svg.path(work.topHeadline).opacity(0),
        head = svg.circle().attr({
            cx: 256,
            cy: 176.64,
            r: 40.4
        }).opacity(0),
        body = svg.path(work.body).opacity(0);

    base.fill(work.colors[0]);
    headline.fill(work.colors[1]);
    redBg.fill(work.colors[3]);

    [paragraph, topHeadline].map(n => {
        n.fill(work.colors[2]);
    });

    [head, body].map(n => {
        n.fill(work.colors[4]);
    });

    const baseHeight = base.height(),
        redWidth = redBg.width(),
        topHeadWidth = topHeadline.width(),
        headlineWidth = headline.width(),
        paragraphHeight = paragraph.height(),
        headR = head.attr('r'),
        bodyHeight = body.height();

    base
        .height(1)
        .animate(400, '<>')
        .height(baseHeight)
        .opacity(1)
        .after(() => {
            redBg
                .width(1)
                .animate(400, '<')
                .width(redWidth)
                .opacity(1)
                .after(() => {
                    topHeadline
                        .width(1)
                        .animate(200, '>')
                        .width(topHeadWidth)
                        .opacity(1)
                        .after(() => {
                            headline
                                .width(1)
                                .animate(400, '<>')
                                .width(headlineWidth)
                                .opacity(1);

                            paragraph
                                .height(1)
                                .animate(400, '<>')
                                .height(paragraphHeight)
                                .opacity(1)
                                .after(() => {
                                    head
                                        .attr('r', 0)
                                        .animate(200, '<>')
                                        .attr('r', headR + 10)
                                        .opacity(1)
                                        .after(() => {
                                            body
                                                .height(1)
                                                .animate(200)
                                                .height(bodyHeight)
                                                .opacity(1);
                                        })
                                        .animate(200, '<>')
                                        .attr('r', headR);
                                });
                        });
                });
        });

    const element = document.querySelector('#work svg');

    element.onclick = () => {
        const reset = element;

        while (reset.parentNode) {
            reset.parentNode.removeChild(reset);
        }

        getObj('mattiasIcons') === null ? axios.get('/src/icons.json').then(promise => renderWork(promise)) : renderWork(getObj('mattiasIcons'));
    };
};

const renderContact = promise => {
    const contact = promise.data.contact;
    const svg = SVG('message');

    svg.viewbox('0 0 512 512');

    const poly = svg.polygon(contact.poly).fill(contact.colors[0]).opacity(0),
        path = svg.path(contact.path).fill(contact.colors[1]).opacity(0);

    let y = 75;

    [0, 1, 2, 3, 4].forEach((n, i) => {
        svg.rect().attr({
            x: i % 2 ? 256 : 122,
            y: i === 0 ? y : y = y + 50,
            fill: contact.colors[2],
            width: i % 2 ? 133 : 266,
            height: 16
        })
            .opacity(0)
            .delay(800)
            .animate(400, '<>')
            .opacity(1);
    });

    const polyHeight = poly.height(),
        pathWidth = path.width();

    path
        .width(1)
        .animate(400, '<>')
        .width(pathWidth)
        .opacity(1)
        .after(() => {
            poly
                .height(1)
                .animate(400, '>')
                .height(polyHeight)
                .opacity(1);
        });

    const element = document.querySelector('#contact svg');

    element.onclick = () => {
        const reset = element;

        while (reset.parentNode) {
            reset.parentNode.removeChild(reset);
        }

        getObj('mattiasIcons') === null ? axios.get('/src/icons.json').then(promise => renderContact(promise)) : renderContact(getObj('mattiasIcons'));
    };
};

const renderSocial = promise => {
    const social = promise.data.social;

    const untappd = SVG('untappd'),
        dribbble = SVG('dribbble'),
        github = SVG('github'),
        lastfm = SVG('lastfm'),
        linkedin = SVG('linkedin'),
        quora = SVG('quora'),
        twitter = SVG('twitter');

    const standardViewBox = '0 0 430 430';

    untappd.viewbox('0 0 296 246');

    untappd.path(social.untappd[0]);
    untappd.path(social.untappd[1]);
    untappd.path(social.untappd[2]);

    untappd.fill('#ffc000');


    dribbble.viewbox(standardViewBox);

    dribbble.path(social.dribbble);
    dribbble.fill('#ea4c89');


    github.viewbox('0 0 90 90');

    github.path(social.github);
    github.fill('#171515');


    lastfm.viewbox(standardViewBox);

    lastfm.path(social.lastfm);
    lastfm.fill('#b80610');


    linkedin.viewbox(standardViewBox);

    linkedin.path(social.linkedin);
    linkedin.fill('#007bb5');


    quora.viewbox(standardViewBox);

    quora.path(social.quora);
    quora.fill('#a82400');


    twitter.viewbox(standardViewBox);

    twitter.path(social.twitter);
    twitter.fill('#55acee');
};

(function() {
    axios.get('/src/icons.json').then(promise => {
        getObj('mattiasIcons') === null && setObj('mattiasIcons', promise);
        promise = getObj('mattiasIcons') === null ? promise : getObj('mattiasIcons');
        renderSkills(promise);
        renderFriends(promise);
        renderContact(promise);
        renderSocial(promise);
        renderWork(promise);
    });
})();
