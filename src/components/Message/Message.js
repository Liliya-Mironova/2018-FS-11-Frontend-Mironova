import React, { Component } from 'react';

import './Message.css';
import {getReadableSize, getTime, sendToServer} from '../../library.js';

class Message extends Component {
    constructor (props) {
        super(props);
        this.state = {
            delivered: 'not yet',
            timeAndState: ''
        };
    }

    // <img className='ResultImg' src='../img/done.png' alt=''/>
    sendAndUpdate(text, file) {
        var timeAndState = <div>
                               <div className='ResultTime'>{getTime()}</div>

                           </div>;
        if (this.state.delivered === 'not yet') {
            this.setState({delivered: 'pending'});
            sendToServer(text, file).then (response => {
                if (response) {
                    this.setState({delivered: 'true', timeAndState: timeAndState});
                } else {
                    this.setState({delivered: 'false'});
                }
            });
        }
    }

    render() {
        var text = '';
        var file = this.props.file;
        if (file) {
            this.sendAndUpdate('', file);
            if (this.props.img) {
                return (
                    <img className='Img' src={this.props.img} alt=''/>
                );
            } else {
                text =`${file.name}, ${file.type}, ${getReadableSize(file.size)}`;
            }
        } else {
            text = this.props.text;
            this.sendAndUpdate(text, '');
        }
        return (
            <li className='Message'>
                {text}
                {this.state.timeAndState}
            </li>
        );
    }
}

export default Message;