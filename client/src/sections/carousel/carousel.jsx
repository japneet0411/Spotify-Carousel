import React from "react"
import './carousel.scss'
import './carousel.css'
import Carousel from './../../components/Carousel/Carousel';
import Navbar from '../../components/Navbar/navbar'

function Slider() {
  return(
    <div>
        <Navbar/>
        <Carousel />
    </div>
  )
}
export default Slider;