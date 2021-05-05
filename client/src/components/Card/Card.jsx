import React from "react"
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import './Card.scss'
import './Card.css'



function Cards(props){
    return(
       
        <Card style={{ width: '18rem' }} className="cards" >
        <Card.Img variant="top" src={props.src} className="card-img" />
        <Card.Body>
            <Card.Text className='card-text-style'>
                {props.main} <br />
                {props.subtext}       
            </Card.Text>
            <div className='icons'>
            <FontAwesomeIcon icon={faTrash} />
                &nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={faSpotify} />
            </div>
       </Card.Body>
       </Card>
       
    )
}
export default Cards;