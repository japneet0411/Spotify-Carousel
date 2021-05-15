import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import './Color-Picker.css';
import './Color-Picker.scss';

function Color(props) {
	const [open, setOpen] = useState(false);
	function show() {
		if (open === true) setOpen(false);
		else setOpen(true);
	}
	function colorPicker(color) {
		console.log(color);
		props.setColor(color.hex);
	}
	return (
		<div style={{ margin: '10%' }}>
			<div style={{ display: 'inline-block', fontSize: '1.5rem' }}>
				{props.text}
			</div>
			&nbsp;&nbsp;&nbsp;
			<div
				onClick={show}
				style={{ backgroundColor: props.color, display: 'inline-block' }}
				className='color-picker'>
				{open && <SketchPicker color={props.color} onChange={colorPicker} />}
			</div>
			&nbsp;&nbsp;&nbsp;
			<div style={{ display: 'inline-block', fontSize: '1rem' }}>
				{props.color}
			</div>
		</div>
	);
}
export default Color;
