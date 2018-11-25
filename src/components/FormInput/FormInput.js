import React, {Component} from 'react';
import {connect} from 'react-redux';

import './FormInput.css';
import * as actionTypes from '../../store/actions/actionTypes';
import {getTime, sendToServer} from '../../library.js';


class FormInput extends Component {
    state = {
        text: ''
    };

    sendAndUpdate(text, file) {
        sendToServer(text, file).then (response => {
            if (response) {
                this.props.handleSendToServer(getTime());
            }
        });
    }

    handleInput (event) {
        this.setState({text: event.target.value});
    }

    handleSubmit (event) {
        event.preventDefault();
        this.props.handleSubmitText(this.state.text);
        this.sendAndUpdate(this.state.text, '');
        this.setState({text: ''});
    }

    render() {
        return (
            <div>
                <input className="Input"
                       placeholder="Введите сообщение" 
                       value={this.state.text}
                       onChange={this.handleInput.bind(this)} />
                <button className="SendButton" onClick={this.handleSubmit.bind(this)}>
                    <img src="../img/send.png" alt='' />
                </button>
            </div>
        );  
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSubmitText: (text) => dispatch({type: actionTypes.SENDTEXT, text}),
        handleSendToServer: (time) => dispatch({type: actionTypes.UPDATEDELIVER, time})
    }
};

export default connect(null, mapDispatchToProps)(FormInput);