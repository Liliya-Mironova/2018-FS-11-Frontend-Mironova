import React, { Component } from 'react';

import './MessageForm.css';

import FormInput from '../FormInput/FormInput.js';
import {getReadableSize, sendToServer} from '../../library.js';

class MessageForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: 0
        };
    }

    updateData (id, value) {
        this.props.updateData(id, value, '');
        this.setState({id: this.state.id+1});
    }

    _onLocationClick (event) {
        event.preventDefault();

        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }
        function success (position) {
            var text = `${position.coords.latitude}, ${position.coords.longitude}`;
            this.props.updateData(this.state.id, text, '');
        };
        function error() {
            alert("Unable to retrieve your location");
        };
        navigator.geolocation.getCurrentPosition(success.bind(this), error);
    }

    _onFileSelect (event) {
        event.preventDefault();

        var text = '';
        var this_ptr = this;

        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            if (file.type.startsWith('image/')) {
                text = reader.result;
                this_ptr.props.updateData(this_ptr.state.id+1, '', text); // кнопка меняет состояние App

            } else {
                text =`${file.name}, ${file.type}, ${getReadableSize(file.size)}`; 
                this_ptr.props.updateData(this_ptr.state.id+1, text, '');           
            }
            this_ptr.setState({id: this_ptr.state.id+1})
        };
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div>
                <button className="LocationButton" onClick={this._onLocationClick.bind(this)}>
                    <img src="../img/location.png" alt=''/>
                </button>
                <input type="file" className="FileButton" onChange={this._onFileSelect.bind(this)} />
                <form className="MessageForm">
                    <FormInput id={this.state.id} updateData={this.updateData.bind(this)} />
                </form>
            </div>
        );
    }
}

export default MessageForm;