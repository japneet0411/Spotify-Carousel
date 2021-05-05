import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Picker from './../colorPicker/colorPicker'
import {faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import './customize.css'
import Canvas from './../canvas/canvas';


function Customize(props)
{
    return(
        <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        contentLabel="customize"
        className="custom"
        >
       
        <button className="Btn" onClick={props.onRequestClose}>
        <FontAwesomeIcon icon={faTimes} size="2x" style={{color: "black"}}/>
       </button>
       <Picker/>
        <Picker/>
        <Picker/>
        <Picker/>
        <Canvas className="preview"/>
        
      
       
       
       

        </Modal>
    )
}
export default Customize;