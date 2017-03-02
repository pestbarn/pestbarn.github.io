import React from 'react';
import { Link } from 'react-router';

export default class Aside extends React.Component {
    calcAge(date) {
        const today = new Date();
        const month = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
        const day = (today.getDate() < 10 ? '0' : '') + today.getDate();

        let now = [
            today.getFullYear(),
            month,
            day
        ];

        now = now.join('');

        let age = (now - date).toString();
        return parseInt(age.slice(0,2));
    }

    render() {
        return (
            <aside>
                <p>
                    <strong>
                        Mattias Hagberg
                    </strong>
                    <br />
                    <time>{this.calcAge(19890125)}</time>, male, Uppsala
                    <br />
                    Frontend developer
                </p>
                <p>
                    <strong>
                        projects / contact channels
                    </strong>
                    <br />
                    <a href="http://www.mattias.pw/starburst.css">starburst.css</a>
                    ,
                    <a href="http://codepen.io/pestbarn/pens/public/">things</a>
                    ,
                    <Link to="/stats">stats</Link>
                    <br />
                    <a href="http://www.linkedin.com/in/pestbarn">linkedin</a>
                    ,
                    <a href="http://github.com/pestbarn">github</a>
                    ,
                    <a href="http://twitter.com/@pestbarn">twitter</a>
                </p>
                <img src="/src/img/profile.jpg" />
            </aside>
        );
    }
}
