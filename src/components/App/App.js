import React, { Component } from 'react';
import './App.css';

import MessageList from '../MessageList/MessageList.js';
import MessageForm from '../MessageForm/MessageForm.js';

class App extends Component {
	constructor(props) {
        super(props);
        this.state = { 
            id: 0,
            text: '',
            time: '',
            img: '',
            done: false
        };
    }

	updateData (id, value, time, img, done) {
		this.setState({id: id, text: value, time: time, img: img, done: done});
	}

    render() {
        return (
            <div className="App">
            	<MessageList id={this.state.id}
                             text={this.state.text}
            				 time={this.state.time}
            				 img={this.state.img}  
                             updateData={this.updateData.bind(this)} />
                <MessageForm updateData={this.updateData.bind(this)} />
            </div>
        );
    }
}

export default App;
