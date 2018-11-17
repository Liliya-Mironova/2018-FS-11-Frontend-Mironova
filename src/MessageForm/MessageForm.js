import React, { Component } from 'react';

import './MessageForm.css';

import FormInput from '../FormInput/FormInput.js';
import {getTime, getReadableSize, sendToServer} from '../library.js';

class MessageForm extends Component {
    updateData (value, time) {
        this.props.updateData(value, time, '');
    }

    _onLocationClick (event) {
        event.preventDefault();

        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }
        function success (position) {
            var text = `${position.coords.latitude}, ${position.coords.longitude}`;
            this.props.updateData(text, getTime(), '');
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
                this_ptr.props.updateData('', getTime(), text); // кнопка меняет состояние App
            } else {
                text =`${file.name}, ${file.type}, ${getReadableSize(file.size)}`; 
                this_ptr.props.updateData(text, getTime(), '');           
            }
        };
        reader.readAsDataURL(file);

        sendToServer(file, '');
    }

    render() {
        return (
            <div>
                <button className="LocationButton" onClick={this._onLocationClick.bind(this)}>
                    <img src="../img/location.png" />
                </button>
                <input type="file" className="FileButton" onChange={this._onFileSelect.bind(this)} />
                <form className="MessageForm">
                    <FormInput updateData={this.updateData.bind(this)} />
                </form>
            </div>
        );
    }
}

export default MessageForm;