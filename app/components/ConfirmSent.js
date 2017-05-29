import React from 'react';
import { ContactContainer } from '../containers/';
import { hashHistory } from 'react-router';

export default class ConfirmSent extends React.Component {
    constructor(props) {
        super(props);

        this.handleDone = this.handleDone.bind(this);
    }

    giveAnimal() {
        const animals = {
            'seal': 'FmZvLxA.jpg',
            'kitten': 'UGCw236.jpg',
            'baby duck': '1tN1nu7.jpg',
            'baby sugarglider': 'pfMe5Rf.jpg',
            'baby aardvark': 'eMj2uE1.jpg',
            'baby quoll': 'zds75I8.jpg',
            'baby tarsier': 'voAMgG4.jpg',
            'dassie': 'SVHFN.jpg',
            'puppy driving a car': 'ShEVc39.jpg'
        };

        let animalArray = Object.keys(animals);
        let animalIndex = Math.floor(Math.random() * animalArray.length);
        let animalKey = animalArray[animalIndex];
        let animalValue = 'http://i.imgur.com/' + animals[animalKey];

        return (
            <p>
                Here is a picture of a {animalKey}.
                <a href={animalValue}>
                    <img src={animalValue} />
                </a>
            </p>
        );
    }

    handleDone() {
        hashHistory.push('/');
    }

    render() {
        return (
            <div className="root-container">
                <ContactContainer className="mdl-dialog wide-dialog" style={{display: 'block'}}>
                    <div className="mdl-dialog__content">
                        <p>
                            Thanks for your message.
                        </p>
                        {this.giveAnimal()}
                    </div>
                    <div className="mdl-dialog__actions">
                        <button type="button" className="mdl-button" onClick={this.handleDone}>Ok bye</button>
                    </div>
                </ContactContainer>
            </div>
        );
    }
}
