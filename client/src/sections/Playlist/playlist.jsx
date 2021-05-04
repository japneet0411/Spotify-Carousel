import {CardDeck} from 'react-bootstrap'
import React from "react"
import Card from "../../components/cards/card"
import './playlist.scss'
import './playlist.css'


function YourPlaylist()
{
    return (
        <CardDeck className="deck">
        <Card />
        <Card />
        <Card />
        <Card />
        </CardDeck>
    )
}
export default YourPlaylist;