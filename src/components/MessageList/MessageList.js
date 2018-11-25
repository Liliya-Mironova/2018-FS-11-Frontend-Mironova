import React, {Component} from 'react';
import {connect} from 'react-redux';

import './MessageList.css';
import Message from '../Message/Message.js';
import * as actionTypes from '../../store/actions/actionTypes';
import {getTime, sendToServer} from '../../library.js';


class MessageList extends Component {
    sendAndUpdate (text, file) {
        sendToServer(text, file).then (response => {
            if (response) {
                this.props.handleSendToServer(getTime());
            }
        });
    }

    handleDragAndDrop (event) {
        event.preventDefault();

        var this_ptr = this;

        var files = event.dataTransfer.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
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
    }

    render() {
        return (
            <ul className="MessageList" onDrop={this.handleDragAndDrop.bind(this)}
                                        onDragEnter={this.handleDragAndDrop.bind(this)}
                                        onDragOver={this.handleDragAndDrop.bind(this)}
                                        onDragLeave={this.handleDragAndDrop.bind(this)} >
                {this.props.msgList.map((msg, index) => {
                    return (
                        <Message key={index} id={index} text={msg.text} img={msg.img} file={msg.file}/>
                    )
                })}
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        msgList: state.msgRed.messageList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleFileSelect: (file) => dispatch({type: actionTypes.SENDFILE, file}),
        handleImgSelect: (img, file) => dispatch({type: actionTypes.SENDIMG, img, file}),
        handleSendToServer: (time) => dispatch({type: actionTypes.UPDATEDELIVER, time})
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (MessageList);