//import styles from './index.css';
import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<input type="file"/>
		<button id="location">Geolocation</button>
		<ul class="result"></ul>
		<img id="clip" src="clip.png">
		<form-input name="message_text" placeholder="Введите сообщение" slot="message-input">
			<span slot="icon"></span>
		</form-input>
	</form>
`;

class MessageForm extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
		this._initElements();
		this._addHandlers();
	}

	static get observedAttributes() {
		return [
			"action",
			"method"
		]
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this._elements.form[attrName] = newVal;
	}

	_initElements () {
		var form = this.shadowRoot.querySelector('form');
		var message = this.shadowRoot.querySelector('.result');
		var inputElement = this.shadowRoot.querySelector('input[type=file]');
		var locationButton = this.shadowRoot.getElementById('location');
		var output = this.shadowRoot.getElementById('coords');
		this._elements = {
			form: form,
			message: message,
			inputElement: inputElement,
			locationButton: locationButton,
			output: output
		};
	}

	_addHandlers () {
		this._elements.form.addEventListener('send', this._onSend.bind(this));
		this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
		this._elements.inputElement.addEventListener('change', this._onFileSelect.bind(this));

		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
 		  this._elements.form.addEventListener(eventName, this._onDragOver.bind(this), false)
		})

		this._elements.locationButton.addEventListener('click', this._onClick.bind(this));

		//this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
	}

	_onClick (event) {
		event.preventDefault();
		var output = this._elements.output;
		var li = document.createElement('li');
		var msg = this._elements.message;

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

	_onSend (event) {
		var li = document.createElement('li');
		var msg = this._elements.message;

		li.innerText = Array.from(this._elements.form.elements).map(
			el => el.value
		).join(' ');
		if (li.innerText.length > 2) {
			this._elements.message.appendChild(li);
		}

		var date = new Date();

		var formData = new FormData();
		formData.append("user", 'Liliya');
		formData.append("date", date.toDateString());
		formData.append("text", li.innerText);

		fetch('http://127.0.0.1:8082/message', {  
			method: 'POST',   
			body: formData
		}).then(function(response) {
			var img = document.createElement('img');
			img.id = 'msg_sent';
			img.src = 'done.png';
			msg.lastElementChild.appendChild(img);

			var div = document.createElement('div');
			div.id = 'time';
			div.innerText = date.toTimeString().match('^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?')[0];
			msg.lastElementChild.appendChild(div);
			return response;	
		}).catch(function(err) { 
			console.log(err);
		});

		event.preventDefault();
		return false;
	}

	_onFileSelect (event) {
		event.preventDefault();
		var msg = this._elements.message;

		var files = event.target.files;
		var file_type = files[0].type;

		var reader = new FileReader();

		reader.onload = function(){
			if (file_type.startsWith('image/')) {
				var img = document.createElement('img');
				img.id = 'preview';
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
		formData.append("user", 'Liliya');
		formData.append("date", date.toDateString());
		formData.append("file", event.target.files[0]);

		fetch('http://127.0.0.1:8082/message', {
		    method: 'POST',  
		    body: formData
		}).then(function(response) {
        	var img = document.createElement('img');
			img.id = 'msg_sent';
			img.src = 'done.png';
			msg.lastElementChild.appendChild(img);

			var div = document.createElement('div');
			div.id = 'time';
			div.innerText = date.toTimeString().match('^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?')[0];
			msg.lastElementChild.appendChild(div);
        	return response;
        })
        .catch(function(err) { 
        	console.log(err);
        });

		return false;
	}

	_onDragOver (event) {
		event.preventDefault();
		var msg = this._elements.message;
			 
		var files = event.dataTransfer.files;
		
		for (var i = 0; i < files.length; i++) {
		    var file = files[i];
		    
		    if (file.type.startsWith('image/')) {
			    var img = document.createElement("img");
			    img.id = 'preview';
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
			formData.append("user", 'Liliya');
			formData.append("date", date.toDateString());
			formData.append("file", file);

			fetch('http://127.0.0.1:8082/message', {
			    method: 'POST',  
			    body: formData
			}).then(function(response) {
		        var img = document.createElement('img');
				img.id = 'msg_sent';
				img.src = 'done.png';
				msg.lastElementChild.appendChild(img);

				var div = document.createElement('div');
				div.id = 'time';
				div.innerText = date.toTimeString().match('^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?')[0];
				msg.lastElementChild.appendChild(div);
		        return response;
		    })
		    .catch(function(err) { 
		        console.log(err);
		    });
		}
	}

	_onKeyPress (event) {
		if (event.keyCode == 13) {
			this._elements.form.dispatchEvent(new CustomEvent('send'));
		}
	}
}

customElements.define('message-form', MessageForm);


function getReadableSize(size) {
  const arr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB'];
  let newSize = size;
  for (const item in arr) {
      if (newSize < 1024) {
        return `${Math.ceil(newSize)} ${arr[item]}`;
      }
      newSize /= 1024;
  }
  return `${Math.ceil(newSize)} B`;
}