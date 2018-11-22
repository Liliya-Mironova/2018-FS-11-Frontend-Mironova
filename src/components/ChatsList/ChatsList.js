import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './ChatsList.css';

class ChatsList extends Component {
    render() {
        return (
            <ul className="ChatsList">
                <li className="Chat">
                  <Link to="/chat1">Chat1</Link>
                </li>
                <li className="Chat">
                  <Link to="/chat2">Chat2</Link>
                </li>
            </ul>
        );
    }
}

export default ChatsList;