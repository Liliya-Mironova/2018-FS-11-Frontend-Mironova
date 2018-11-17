import React from 'react';

import './index.css';
import './shadow.css';


export class FormInput extends React.Component {  
    constructor(props) {
        super(props);
        this.state = { 
            val: ''
        };
    }

    _onKeyPress(event) {
        if (event.key == 'Enter') {
            event.target.value = '';
        }
    }

    _onInput (event) {
        this.setState({val: event.target.value});
    }

    render() {
        return (
            <input className="Input" 
                   placeholder="Введите сообщение" 
                   onInput={this._onInput.bind(this)} 
                   onKeyPress={this._onKeyPress.bind(this)} />
        );  
    }
}