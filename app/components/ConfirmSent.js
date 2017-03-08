import React from 'react';
import { ContactContainer } from '../containers/';
import { hashHistory } from 'react-router';

export default class ConfirmSent extends React.Component {
    constructor(props) {
        super(props);

        this.handleDone = this.handleDone.bind(this);
    }

    handleDone() {
        hashHistory.push('/');
    }

    render() {
        return (
            <div className="root-container">
                <ContactContainer className="mdl-dialog" style={{display: 'block'}}>
                    <div className="mdl-dialog__content">
                        <p>
                            Thanks for your message. Not much left to do now.
                        </p>
                    </div>
                    <div className="mdl-dialog__actions">
                        <button type="button" className="mdl-button" onClick={this.handleDone}>I'm done here</button>
                    </div>
                </ContactContainer>
            </div>
        );
    }
}

ContactContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};
