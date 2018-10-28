//import styles from './index.css';
import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<input type="file"/>
		<div id="drop_zone">Drop</div>
		<button id="location">Geolocation</button>
		<div id="coords"></div>
		<ul class="result"></ul>
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
		var dropZone = this.shadowRoot.getElementById('drop_zone');
		var locationButton = this.shadowRoot.getElementById('location');
		var output = this.shadowRoot.getElementById('coords');
		this._elements = {
			form: form,
			message: message,
			inputElement: inputElement,
			dropZone: dropZone,
			locationButton: locationButton,
			output: output
		};
	}

	_addHandlers () {
		this._elements.form.addEventListener('send', this._onSend.bind(this));
		this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
		this._elements.inputElement.addEventListener('change', this._onFileSelect.bind(this));

		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
 		  this._elements.dropZone.addEventListener(eventName, this._onDragOver.bind(this), false)
		})

		this._elements.locationButton.addEventListener('click', this._onClick.bind(this));

		//this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
	}

	_onClick (event) {
		event.stopPropagation();
		event.preventDefault();
		var output = this._elements.output;

		if (!navigator.geolocation) {
			output.innerText = "Geolocation is not supported by your browser";
			return;
  		}

		function success(position) {
			var latitude  = position.coords.latitude;
			var longitude = position.coords.longitude;
			output.innerText = `${position.coords.latitude}, ${position.coords.longitude}`;
		};

		function error() {
			output.inner = "Unable to retrieve your location";
		};

		navigator.geolocation.getCurrentPosition(success);
	}

	_onSend (event) {
		var li = document.createElement('li');
		li.innerText = Array.from(this._elements.form.elements).map(
			el => el.value
		).join(' ');
		if (li.innerText.length > 2) {
			this._elements.message.appendChild(li);
		}
		/*this._elements.form._elements.input.value = "";*/

		event.preventDefault();
		return false;
	}

	_onFileSelect (event) {
		event.stopPropagation();
		event.preventDefault();

		var files = event.target.files;

		if (files[0].type.match("image\/.*")) {
			var img = document.createElement('img');
			img.src = files[0].value;
			this._elements.message.appendChild(img);
		} else {
			var li = document.createElement('li');
			li.innerText=`${files[0].name}, ${files[0].type}, ${getReadableSize(files[0].size)}`;
			this._elements.message.appendChild(li);
		}

		return false;
	}

	_onDragOver (event) {
		event.stopPropagation();
		event.preventDefault();

		var dt = event.dataTransfer;
		var files = dt.files;
		var li = document.createElement('li');
		li.innerText=`${files[0].name}, ${files[0].type}, ${getReadableSize(files[0].size)}`;
		this._elements.message.appendChild(li);
		//event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
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