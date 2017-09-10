/* global axios, SVG, setObj, getObj */

(function() {
    getObj('mattiasProfile') === null ? axios.get('/src/profile.json').then(p => renderProfile(p)) : renderProfile(getObj('mattiasProfile'));

    function renderProfile(promise) {
        const profile = promise.data.profile;

        getObj('mattiasProfile') === null && setObj('mattiasProfile', promise);

        const svg = SVG('profile');

        svg.viewbox('0 0 567 757').size('260px', '400px');

        const color = '#553E48';

        const main = svg.path(profile.main),
            eyeLeft = svg.path(profile.eyeLeft),
            eyeRight = svg.path(profile.eyeRight),
            shoulder = svg.path(profile.shoulder);

        const group =
            svg
            .group();

        const parts = [ main, eyeLeft, eyeRight, shoulder ];

        parts.map(n => {
            group.add(n);
        });

        group
            .fill({
                color: color,
                opacity: .95
            })
            .stroke({
                color: color,
                opacity: .5,
                width: '50px'
            })
            .scale(.1, -.1)
            .translate(0, 867)
            .attr('stroke-linejoin', 'round');

        parts.map(n => {
            n.opacity(0).translate(400, -400);
            n.animate(600, pos => {
                const s = 1.70158;
                return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
            }, 1200).opacity(1).translate(0, 0);
        });
    }
})();
