import React, { Component } from 'react';

import './FormInput.css';
import {sendToServer} from '../../library.js';

class FormInput extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: 0,
            val: ''
        };
    }

    _onSubmit (event) {
        event.preventDefault();
        if (this.state.val !== '') {
            this.props.updateData(this.props.id+1, this.state.val, ''); // меняет состояние MessageForm
            //sendToServer('', this.state.val);
            this.setState({id: this.props.id+1, val: ''});
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
                       onInput={this._onInput.bind(this)} 
                       value={this.state.val} />
                <button className="SendButton" onClick={this._onSubmit.bind(this)}>
                    <img src="../img/send.png" alt='' />
                </button>
            </div>
        );  
    }
}

export default FormInput;