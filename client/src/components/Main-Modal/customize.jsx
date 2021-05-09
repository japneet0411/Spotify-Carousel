import React,{useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Picker from './../Color-Picker/Color-Picker';
import {faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import './customize.css'
import Canvas from './../canvas/canvas';


function Customize(props)
{
    const [color1,setColor1]=useState(props.color1)
    const [color2,setColor2]=useState(props.color2)
    const [color3,setColor3]=useState(props.color3)
    const [color4,setColor4]=useState(props.color4)
    // var arr=[]

    // {console.log(props.setColor1,props.color1)}
      
  const onClickEvent = () => {
    props.setColor1(color1);
    props.setColor2(color2);
    props.setColor3(color3);
    props.setColor4(color4);
    props.onRequestClose();
  }
    

    
    return(
        <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        contentLabel="customize"
        className="custom"
        >
        <button className="Btn" onClick={onClickEvent}>
        <FontAwesomeIcon icon={faTimes} size="2x" style={{color: "black"}}/>
       </button>

       <div style={{ display: 'inline-block', width: '20%', marginTop: '10%'}}>
       <Picker
          color={color1}
          setColor={setColor1}
          text={'Color 1: '}
        />
        <Picker
           color={color2}
          setColor={setColor2} 
          text={'Color 2: '}
        />
        </div>
        <div style={{ display: 'inline-block', width: '20%'}}>
        <Picker
           color={color3}
          setColor={setColor3} 
          text={'Color 3: '} 
        />
        <Picker
            color={color4}
          setColor={setColor4} 
          text={'Color 4:'}
        />
        </div>
        <Canvas className='preview'
            backgroundColor={color4}
            particle1={color1}
            particle2={color2}
            particle3={color3}
        />
        </Modal>
        
    )
}
export default Customize;