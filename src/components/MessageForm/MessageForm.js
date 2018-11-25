import React, {Component} from 'react';
import {connect} from 'react-redux';

import './MessageForm.css';
import FormInput from '../FormInput/FormInput.js';
import * as actionTypes from '../../store/actions/actionTypes';
import {getTime, sendToServer} from '../../library.js';


class MessageForm extends Component {
    sendAndUpdate (text, file) {
        sendToServer(text, file).then (response => {
            if (response) {
                this.props.handleSendToServer(getTime());
            }
        });
    }

    handleLocationClick (event) {
        event.preventDefault();

        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }
        function success (position) {
            var text = `${position.coords.latitude}, ${position.coords.longitude}`;
            this.props.handleLocationSelect(text);
            this.sendAndUpdate(text, '');
        };
        function error() {
            alert("Unable to retrieve your location");
        };
        navigator.geolocation.getCurrentPosition(success.bind(this), error);
    }

    handleFileClick (event) {
        event.preventDefault();

        var this_ptr = this;

        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            if (file.type.startsWith('image/')) {
                this_ptr.props.handleImgSelect(reader.result, file);
            } else {
                this_ptr.props.handleFileSelect(file);
            }
            this_ptr.sendAndUpdate('', file);
        };
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div>
                <button className="LocationButton" onClick={this.handleLocationClick.bind(this)}>
                    <img src="../img/location.png" alt=''/>
                </button>
                <input type="file" className="FileButton" onChange={this.handleFileClick.bind(this)} />
                <form className="MessageForm">
                    <FormInput />
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocationSelect: (text) => dispatch({type: actionTypes.SENDTEXT, text}),
        handleFileSelect: (file) => dispatch({type: actionTypes.SENDFILE, file}),
        handleImgSelect: (img, file) => dispatch({type: actionTypes.SENDIMG, img, file}),
        handleSendToServer: (time) => dispatch({type: actionTypes.UPDATEDELIVER, time})
    }
};

export default connect(null, mapDispatchToProps) (MessageForm);
