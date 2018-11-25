import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import messageListReducer from './store/reducers/messageList';
import userReducer from './store/reducers/user';
import chatListReducer from './store/reducers/chatList';


const rootReducer = combineReducers({
	msgRed: messageListReducer,
	usrRed: userReducer,
	сhatRed: chatListReducer
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
