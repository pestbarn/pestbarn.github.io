const axios = require('axios');
const SVG = require('svg.js');
const Vivus = require('vivus');
const verge = require('verge');

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

        axios.get('/src/icons.json').then(p => renderFriends(p));
    };
};

const renderWork = promise => {
    const work = promise.data.work;

    const svg = SVG('jobs');

    svg.viewbox('0 0 512 512');

    const base = svg
            .path(work.base)
            .opacity(0)
            .fill(work.colors[0]),

        headline = svg
            .path(work.headline)
            .opacity(0)
            .fill(work.colors[1]),

        paragraph = svg
            .path(work.paragraph)
            .opacity(0),

        redBg = svg
            .path(work.redBg)
            .opacity(0)
            .fill(work.colors[3]),

        topHeadline = svg
            .path(work.topHeadline)
            .opacity(0),

        head = svg
            .circle()
            .attr({
                cx: 256,
                cy: 176.64,
                r: 40.4
            }).opacity(0),

        body = svg
            .path(work.body)
            .opacity(0);

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

        axios.get('/src/icons.json').then(p => renderWork(p));
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

        axios.get('/src/icons.json').then(p => renderContact(p));
    };
};

const renderSocial = promise => {
    const social = promise.data.social;

    const untappd = SVG('untappd'),
        dribbble = SVG('dribbble'),
        lastfm = SVG('lastfm'),
        linkedin = SVG('linkedin'),
        quora = SVG('quora'),
        twitter = SVG('twitter'),
        github = SVG('github');

    const standardViewBox = '0 0 430 430';

    untappd.viewbox('0 0 296 246')
        .fill('#ffc000');

    untappd.path(social.untappd[0]);
    untappd.path(social.untappd[1]);
    untappd.path(social.untappd[2]);

    dribbble.viewbox(standardViewBox)
        .path(social.dribbble)
        .fill('#ea4c89');

    lastfm.viewbox(standardViewBox)
        .path(social.lastfm)
        .fill('#b80610');

    linkedin.viewbox(standardViewBox)
        .path(social.linkedin)
        .fill('#007bb5');

    quora.viewbox(standardViewBox)
        .path(social.quora)
        .fill('#a82400');

    twitter.viewbox(standardViewBox)
        .path(social.twitter)
        .fill('#55acee');

    github.viewbox('0 0 90 90')
        .path(social.github)
        .fill('#333');
};

(function() {
    axios.get('/src/icons.json').then(promise => {
        let skillsN, workN, contactN;
        const skills = document.getElementById('skills'),
            work = document.getElementById('work'),
            contact = document.getElementById('contact');

        if(!skillsN && verge.inViewport(skills, 10)) {
            // Fix for desktop
            // renderSkills(promise);
            skillsN = true;
        }

        window.addEventListener('scroll', () => {
            if(!skillsN && verge.inViewport(skills, -200)) {
                // renderSkills(promise);
                skillsN = true;
            }

            if(!workN && verge.inViewport(work, 10)) {
                renderWork(promise);
                workN = true;
            }

            if(!contactN && verge.inViewport(contact, 10)) {
                renderContact(promise);
                contactN = true;
            }
        });

        renderFriends(promise);
        renderSocial(promise);
    });
})();
