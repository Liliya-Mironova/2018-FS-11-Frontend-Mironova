import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import messageListReducer from './store/reducers/messageList';
import userReducer from './store/reducers/user';
import chatListReducer from './store/reducers/chatList';
import authReducer from './store/reducers/auth';


const rootReducer = combineReducers({
	msgRed: messageListReducer,
	usrRed: userReducer,
	сhatRed: chatListReducer,
	auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
