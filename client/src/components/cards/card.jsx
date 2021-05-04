import React from "react"
import Card from 'react-bootstrap/Card'
import './card.scss'
import './card.css'



function Cards(){
    return(
       
        <Card className="cards">
        <Card.Img  variant="top" src="https://picsum.photos/300" />
        <Card.Body>
        <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
       </Card.Text>
       </Card.Body>
       </Card>
       
    )
}
export default Cards;