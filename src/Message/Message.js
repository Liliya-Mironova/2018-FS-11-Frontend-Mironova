import React, { Component } from 'react';

import './Message.css';

class Message extends Component {
    constructor (props) {
        super(props);
        this.state = { 
            done: false
        };
    }

    render() {
        if (this.props.img !== '') {
            return (
                <img className='Img' src={this.props.img} />
            );
        } else {
            return (
                <li className='Message'>{this.props.text}</li>
            );
        }
    }
}

export default Message;