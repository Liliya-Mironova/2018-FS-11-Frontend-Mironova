import React from 'react';


const input = (props) => {
	let inputElement;
	switch (props.elementType) {
		case 'input':
			inputElement = <input 
				value={props.value}
				onChange={props.changed}
				placeholder={props.placeholder} />;
			break;
		case 'textarea':
			inputElement = <textarea 
				value={props.value}
				onChange={props.changed}
				placeholder={props.placeholder} />;
			break;
		default:
			inputElement = <input 
				value={props.value}
				onChange={props.changed}
				placeholder={props.placeholder} />;
			break;
	}
	return (
		<div>
			{inputElement}
		</div>
	);
};

export default input;