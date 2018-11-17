import React, { Component } from 'react';

import './FormInput.css';

import {getTime, sendToServer} from '../library.js';

class FormInput extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            val: ''
        };
    }

    _onSubmit (event) {
        event.preventDefault();
        if (this.state.val !== '') {
            this.props.updateData(this.state.val, getTime(), ''); // меняет состояние MessageForm
            sendToServer('', this.state.val);
            this.setState({val: ''});
            event.target.value = '';
        }
    }

    _onInput (event) {
        this.setState({val: event.target.value});
    }

    render() {
        return (
            <div>
            <input className="Input" 
                   placeholder="Введите сообщение" 
                   onInput={this._onInput.bind(this)} />
            <button onClick={this._onSubmit.bind(this)} />
            </div>
        );  
    }
}

export default FormInput;