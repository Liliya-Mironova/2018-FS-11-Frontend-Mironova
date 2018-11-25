import React, { Component } from 'react';

import './FormInput.css';

class FormInput extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: 0,
            text: ''
        };
    }

    _onSubmit (event) {
        event.preventDefault();
        if (this.state.text !== '') {
            this.props.updateData(this.props.id+1, this.state.text, ''); // меняет состояние MessageForm
            this.setState({id: this.props.id+1, text: ''});
        }
    }

    _onInput (event) {
        this.setState({text: event.target.value});
    }

    render() {
        return (
            <div>
                <input className="Input" 
                       placeholder="Введите сообщение" 
                       onInput={this._onInput.bind(this)} 
                       value={this.state.text} />
                <button className="SendButton" onClick={this._onSubmit.bind(this)}>
                    <img src="../img/send.png" alt='' />
                </button>
            </div>
        );  
    }
}

export default FormInput;