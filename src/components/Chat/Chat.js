import React, { Component } from 'react';

import './Chat.css';
import MessageList from '../MessageList/MessageList.js';
import MessageForm from '../MessageForm/MessageForm.js';

class Chat extends Component {
    render() {
        return (
            <div className='Chat'>
                <MessageList />
                <MessageForm />
            </div>
        );
    }
}

export default Chat;
