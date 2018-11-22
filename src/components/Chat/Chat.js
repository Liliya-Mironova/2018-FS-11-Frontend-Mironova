import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Chat.css';
import MessageList from '../MessageList/MessageList.js';
import MessageForm from '../MessageForm/MessageForm.js';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: 0,
            text: '',
            img: '',
            file: ''
        };
    }

    updateData (id, text, img, file) {
        this.setState({id: id, text: text, img: img, file: file});
    }

    render() {
        return (
            <div className='Chat'>
                <MessageList id={this.state.id}
                             text={this.state.text}
                             img={this.state.img}
                             file={this.state.file}
                             updateData={this.updateData.bind(this)} />
                <MessageForm updateData={this.updateData.bind(this)} />
            </div>
        );
    }
}

export default Chat;
