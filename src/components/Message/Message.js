import React from 'react';

import './Message.css';
import {getReadableSize} from '../../library.js';


function Message (props) { 
    var text = '';
    var file = props.file;
    if (file) {
        if (props.img) {
            return (
                <img className='Img' src={props.img} alt=''/>
            );
        } else {
            text =`${file.name}, ${file.type}, ${getReadableSize(file.size)}`;
        }
    } else {
        text = props.text;
    }
    return (
        <li className='Message'>
            {text}
        </li>
    )
}

export default Message;
