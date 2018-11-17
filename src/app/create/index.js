import React from 'react';
import ReactDOM from 'react-dom';

import {MessageForm} from '../../lib/components/message-form';

ReactDOM.render(
    <MessageForm action="/" />, 
    document.getElementById('app')
);