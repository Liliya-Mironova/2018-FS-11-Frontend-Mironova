import React from 'react';
import ReactDOM from 'react-dom';

import {FormInput} from '../form/-input/index.js';
import {getReadableSize} from './getreadablesize.js';

import './shadow.css';

const slotName = 'message-input';


export class MessageForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            timeRegex: '^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?'
        };
    }

    _onSend (event) {
        if (event.key == 'Enter') {
            var li = document.createElement('li');
            var msg = this.refs.Ul;

            li.innerText = this.refs.FormInput.state.val;
            if (li.innerText.length > 2) {
                msg.appendChild(li);
            }

            var date = new Date();

            var formData = new FormData();
            var tRegex = this.state.timeRegex;
            formData.append("user", 'Liliya');
            formData.append("date", date.toDateString());
            formData.append("text", li.innerText);

            fetch('http://127.0.0.1:8082/message', {  
                method: 'POST',   
                body: formData
            }).then(function(response) {
                var img = document.createElement('img', {className: 'Msg_send'});
                img.src = 'done.png';
                msg.lastElementChild.appendChild(img);

                var div = document.createElement('div');
                div.id = 'time';
                div.innerText = date.toTimeString().match(tRegex)[0];
                msg.lastElementChild.appendChild(div);
                return response;    
            }).catch(function(err) { 
                console.log(err);
            });

            event.preventDefault();
            return false;
        }
    }

    _onFileSelect (event) {
        event.preventDefault();
        var msg = this.refs.Ul;

        var files = event.target.files;
        var file_type = files[0].type;

        var reader = new FileReader();

        reader.onload = function(){
            if (file_type.startsWith('image/')) {
                var img = document.createElement('img');
                img.src = reader.result;
                msg.appendChild(img);
            } else {
                var li = document.createElement('li');
                li.innerText=`${files[0].name}, ${files[0].type}, ${getReadableSize(files[0].size)}`;
                msg.appendChild(li);
            }
        };
        reader.readAsDataURL(event.target.files[0]);

        var date = new Date();
        var formData = new FormData();
        var tRegex = this.state.timeRegex;
        formData.append("user", 'Liliya');
        formData.append("date", date.toDateString());
        formData.append("file", event.target.files[0]);

        fetch('http://127.0.0.1:8082/message', {
            method: 'POST',  
            body: formData
        }).then(function(response) {
            var img = document.createElement('img', {className: 'Msg_sent'});
            img.src = 'done.png';
            msg.lastElementChild.appendChild(img);

            var div = document.createElement('div');
            div.id = 'time';
            div.innerText = date.toTimeString().match(tRegex)[0];
            msg.lastElementChild.appendChild(div);
            return response;
        })
        .catch(function(err) { 
            console.log(err);
        });

        return false;
    }

    _onLocationClick (event) {
        event.preventDefault();
        var output = this.refs.Coords;
        var li = document.createElement('li');
        var msg = this.refs.Ul;

        if (!navigator.geolocation) {
            output.innerText = "Geolocation is not supported by your browser";
            return;
        }

        function success(position) {
            li.innerText = `${position.coords.latitude}, ${position.coords.longitude}`;
            msg.appendChild(li);
        };

        function error() {
            output.inner = "Unable to retrieve your location";
        };

        navigator.geolocation.getCurrentPosition(success);
    }

    _onDragOver (event) {
        event.preventDefault();
        var msg = this.refs.Ul;
             
        var files = event.dataTransfer.files;
        
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            
            if (file.type.startsWith('image/')) {
                var img = document.createElement("img", {className: 'Msg_sent'}); 
                img.file = file;
                msg.appendChild(img);
                
                var reader = new FileReader();
                reader.onload = (function(aImg) {
                    return function(e) { 
                        aImg.src = e.target.result; 
                    }; 
                })(img);
                reader.readAsDataURL(file);
            } else {
                var li = document.createElement('li');
                li.innerText=`${file.name}, ${file.type}, ${getReadableSize(file.size)}`;
                msg.appendChild(li);
            }

            var date = new Date();
            var formData = new FormData();
            var tRegex = this.state.timeRegex;
            formData.append("user", 'Liliya');
            formData.append("date", date.toDateString());
            formData.append("file", file);

            fetch('http://127.0.0.1:8082/message', {
                method: 'POST',  
                body: formData
            }).then(function(response) {
                var img = document.createElement('img', {className: 'Msg_sent'});
                img.src = 'done.png';
                msg.lastElementChild.appendChild(img);

                var div = document.createElement('div');
                div.id = 'time';
                div.innerText = date.toTimeString().match(tRegex)[0];
                msg.lastElementChild.appendChild(div);
                return response;
            })
            .catch(function(err) { 
                console.log(err);
            });
        }
    }

    render() {
        return (
            <div className="Wrap">
                <ul className="Result" ref="Ul"
                                        onDrop={this._onDragOver.bind(this)}
                                        onDragEnter={this._onDragOver.bind(this)}
                                        onDragOver={this._onDragOver.bind(this)}
                                        onDragLeave={this._onDragOver.bind(this)}></ul>
                <form className="FInput" onKeyPress={this._onSend.bind(this)}>
                    <input type="file" className="File" onChange={this._onFileSelect.bind(this)} />
                    <button className="Location" onClick={this._onLocationClick.bind(this)}>Geolocation</button>
                    <img className="Clip" src="clip.png" />
                    <div className="Coords" ref="Coords" />
                    <FormInput ref="FormInput" placeholder="Введите сообщение" slot="message-input">
                        <span slot="icon"></span>
                    </FormInput>
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <MessageForm action="/"></MessageForm>, document.querySelector('div')
);