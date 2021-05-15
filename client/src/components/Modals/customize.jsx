import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Picker from './../colorPicker/colorPicker';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import './customize.css';
import Canvas from './../canvas/canvas';

function Customize(props) {
	// const [color1,setColor1]=useState('#e28f83')
	// const [color2,setColor2]=useState('#3d84b8')
	// const [color3,setColor3]=useState('#c6ffc1')
	// const [color4,setColor4]=useState('#000000')
	// var arr=[]

	// {console.log(props.setColor1,props.color1)}

	return (
		<Modal
			isOpen={props.isOpen}
			onRequestClose={props.onRequestClose}
			contentLabel='customize'
			className='custom'>
			<button className='Btn' onClick={props.onRequestClose}>
				<FontAwesomeIcon icon={faTimes} size='2x' style={{ color: 'black' }} />
			</button>
			<span className='head'>BackgroundColor:</span>
			<Picker
				className='picker1'
				color={props.color1}
				setColor={props.setColor1}
			/>

			<span className='head'> Particle1:</span>
			<Picker color={props.color2} setColor={props.setColor2} />
			<span className='head'> Particle2:</span>
			<Picker color={props.color3} setColor={props.setColor3} />
			<span className='head'> Particle3:</span>
			<Picker color={props.color4} setColor={props.setColor4} />
			<Canvas
				className='preview'
				backgroundColor={props.color4}
				particle1={props.color1}
				particle2={props.color2}
				particle3={props.color3}
			/>
		</Modal>
	);
}
export default Customize;
