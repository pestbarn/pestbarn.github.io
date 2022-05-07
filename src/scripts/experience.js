const axios = require('axios');

const renderExperience = () => {
    axios.get('/src/experience.json').then(result => {
        const exp = result.data.items;
        getExperience(exp);
    });

    function getExperience(exp) {
        const element = document.getElementById('experience');

        exp.map(pos => {
            let frag = document.createDocumentFragment();
            let data = `<h3>${pos.title}</h3>
            <h4>${pos.position}</h4>
            <time>${pos.dateFrom} - ${pos.dateTo}</time>`;
            let url = pos.url && `<a href="https://${pos.url}">${pos.url.substring(pos.url.lastIndexOf('/') + 1)}</a>`;

            let li = document.createElement('li');

            li.innerHTML = url ? data + url : data;

            frag.appendChild(li);
            element.appendChild(frag);
        });
    }
};

module.exports = (function() {
    renderExperience();
})();
