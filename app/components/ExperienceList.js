import React from 'react';

const ExperienceListItem = props => {
    return <li>
        <h2>{props.title}</h2>
        <h3>{props.position}</h3>
        <time>{props.dateFrom}</time>
        <span>—</span>
        <time>{props.dateTo}</time>
        { props.url && <a href={'https://', props.url}>{props.url}</a> }
    </li>;
};

export default class ExperienceList extends React.Component {
    render() {
        return (
            <div className="experience">
                <ul>
                    <ExperienceListItem
                        title="Magic by iStone"
                        position="Frontend developer"
                        dateFrom="2017/03"
                        dateTo="(current)"
                        url="magicbyistone.se" />

                    <ExperienceListItem
                        title="Sportamore"
                        position="Frontend developer"
                        dateFrom="2015/06"
                        dateTo="2017/03"
                        url="sportamore.se" />

                    <ExperienceListItem
                        title="Rockbladet"
                        position="Writer, photographer"
                        dateFrom="2014/12"
                        dateTo="(current)"
                        url="rockbladet.se" />

                    <ExperienceListItem
                        title="I:O:A"
                        position="Festival organizer, developer, graphic designer"
                        dateFrom="2012/09"
                        dateTo="2016/05"
                        url="bit.ly/I-O-A" />

                    <ExperienceListItem
                        title="46elks"
                        position="Frontend developer & designer"
                        dateFrom="2011/05"
                        dateTo="2011/09"
                        url="46elks.com" />

                    <ExperienceListItem
                        title="Freespee"
                        position="Frontend developer & designer"
                        dateFrom="2011/01"
                        dateTo="2015/05"
                        url="freespee.com" />

                    <ExperienceListItem
                        title="SwedenMetal"
                        position="Webmaster, developer, writer"
                        dateFrom="2005/05"
                        dateTo="2010/01" />
                </ul>
            </div>
        );
    }
}
