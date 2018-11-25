import React, { Component } from 'react';

import './MessageForm.css';
import FormInput from '../FormInput/FormInput.js';

class MessageForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: 0
        };
    }

    updateData (id, text) {
        this.props.updateData(id, text, '');
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
            this.props.updateData(this.state.id+1, text, '', '');
            this.setState({id: this.state.id+1});
        };
        function error() {
            alert("Unable to retrieve your location");
        };
        navigator.geolocation.getCurrentPosition(success.bind(this), error);
    }

    _onFileSelect (event) {
        event.preventDefault();

        var this_ptr = this;

        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            if (file.type.startsWith('image/')) {
                this_ptr.props.updateData(this_ptr.state.id+1, '', reader.result, file); // кнопка меняет состояние App
            } else {
                this_ptr.props.updateData(this_ptr.state.id+1, '', '', file);           
            }
            this_ptr.setState({id: this_ptr.state.id+1});
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