import React from 'react';
import { ContactContainer } from '../containers/';

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ContactContainer className="mdl-dialog">
                <h4 className="mdl-dialog__title">Drop me a line or two</h4>
                <form action="https://formspree.io/hello@mattias.pw" method="POST">
                    <div className="mdl-dialog__content">
                        <p>
                            I'll get back to you ASAP. Promise.
                        </p>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="text" name="name" required />
                            <label className="mdl-textfield__label" htmlFor="name">Name</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input className="mdl-textfield__input" type="email" name="_replyto" required />
                            <label className="mdl-textfield__label" htmlFor="_replyto">E-mail</label>
                        </div>
                        <div className="mdl-textfield mdl-js-textfield">
                            <textarea className="mdl-textfield__input" type="text" name="message" required></textarea>
                            <label className="mdl-textfield__label" htmlFor="message">Message...</label>
                        </div>
                        <input type="text" name="_gotcha" style={{display: 'none'}} />
                        <input type="hidden" name="_next" value="http://www.mattias.pw/#/sent" />
                    </div>
                    <div className="mdl-dialog__actions">
                        <button type="submit" className="mdl-button">Send message</button>
                        <button type="button" className="mdl-button dialog-close">Close</button>
                    </div>
                </form>
            </ContactContainer>
        );
    }
}
