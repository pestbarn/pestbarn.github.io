import React from 'react';
const axios = require('axios');

const getExperience = () => {
    return axios
        .get('/bin/js/json/experience.json')
        .then(info => {
            const items = info.data.items;
            for (let n of items) {
                <li>
                    <h2>{n.title}</h2>
                    <h3>{n.position}</h3>
                    <time>{n.dateFrom}</time>
                    <span>—</span>
                    <time>{n.dateTo}</time>
                    <a href="http://{n.url}">{n.url}</a>
                </li>;
            }
        });
};

export default class ExperienceList extends React.Component {
    render() {
        return (
            <div className="experience">
                <ul>
                    {getExperience}
                </ul>
            </div>
        );
    }
}
