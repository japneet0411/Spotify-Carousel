import React,{ useState } from 'react';
import { SketchPicker } from 'react-color';
import './colorPicker.css'



function Color()
{
    const [open,setOpen]=useState(false);
    const [color,setColor]=useState({r:'199',g:'21',b:'133',a:'1'})
    function show()
    {
        if((open)===true)
        setOpen(false)
    else
        setOpen(true)
    }
    function colorPicker(color)
    {
        console.log(color)
        setColor(color.rgb)
       
    }
    
    return(
     <div className="color-picker" onClick={show}
      style={{backgroundColor: `rgba(${color.r }, ${color.g }, ${color.b }, ${color.a })`}}>
      {open && <SketchPicker color={color} onChange={colorPicker}/>}
       </div>
     
    )
}
export default Color;