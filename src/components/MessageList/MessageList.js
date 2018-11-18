import React, { Component } from 'react';

import './MessageList.css';

import Message from '../Message/Message.js';
import {getReadableSize, sendToServer, getTime} from '../../library.js';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg_list: []
        };
    }

    _onDragOver (event) {
        event.preventDefault();

        var text = '';
        var this_ptr = this;

        var files = event.dataTransfer.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();
            reader.onload = function() {
                if (file.type.startsWith('image/')) {
                    text = reader.result;
                    this_ptr.props.updateData('', text); // кнопка меняет состояние App
                } else {
                    text =`${file.name}, ${file.type}, ${getReadableSize(file.size)}`; 
                    this_ptr.props.updateData(text, '');           
                }
            };
            reader.readAsDataURL(file);
        }
    }
    
    render() {
        if (this.props.text !== '' || this.props.img !== '') {
            this.state.msg_list.push(<Message id={this.props.id}
                                              text={this.props.text}
                                              time={getTime()}
                                              img={this.props.img}
                                              done={this.props.done}
                                              key={this.props.id}/>);
        }

        return (
            <ul className="MessageList" done={this.state.done} 
                             onDrop={this._onDragOver.bind(this)}
                             onDragEnter={this._onDragOver.bind(this)}
                             onDragOver={this._onDragOver.bind(this)}
                             onDragLeave={this._onDragOver.bind(this)} >
                {this.state.msg_list}
            </ul>
        );
    }
}

export default MessageList;