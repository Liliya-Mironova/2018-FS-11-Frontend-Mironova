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
            img: '',
            done: false
        };
    }

    updateData (id, value, img, done) {
        this.setState({id: id, text: value, img: img, done: done});
    }

    render() {
        return (
            <div className="App">
                <MessageList id={this.state.id}
                             text={this.state.text}
                             img={this.state.img}  
                             updateData={this.updateData.bind(this)} />
                <MessageForm updateData={this.updateData.bind(this)} />
            </div>
        );
    }
}

export default App;
