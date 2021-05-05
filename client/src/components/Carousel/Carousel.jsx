import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PlayASong from './../Main-Modal/Main-Modal';
import './Carousel.css';
import './Carousel.scss';
import Items from './../Carousel-Items/Carousel-Items';
//import Image1 from './../../images/Image1.jpg';

const axios = require('axios');

class DemoCarousel extends Component {
    constructor(props){
        super(props);
        this.state= {
            slideshow: true,
            showModal: false,
            changing: false,
            current: 0,
            carousel: [],
        }
    }
    componentDidMount(){
        axios
            .get('http://localhost:5000/carousel')
            .then((response) => {
                this.setState({
                    carousel: response.data
                })
                console.log("Mounted");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    handleClose = () => {
        this.setState({
            showModal: false,
            slideshow: true,
            changing: false
        });
        console.log("Handled close");
    }
    onClickItemEvent = (selectedIndex) => {
        if(this.state.changing===false){
            this.setState({
                slideshow: false,
                showModal: true,
                current: selectedIndex
            });
        }
        else{
            this.setState({
                changing: false
            });
        }
    }
    onChangeEvent = (selectedIndex) => {
        this.setState({
            changing: true,
            current: selectedIndex
        })
    }
    render(){
        var items = [];
        for(let item of this.state.carousel){
            items.push(
                <Items key={item}
                    src={item.carouselImage}
                    title={item.name}
                    description={item.description}
                    />)
        }

        return (
            <div>
            {this.state.showModal && (
            <PlayASong 
            isOpen={this.state.showModal}
            onRequestClose={this.handleClose}
            button={this.handleClose}
            index={this.state.carousel[this.state.current].name}
            />)}
            {items.length>0 && (
            <Carousel 
            autofocus = {true}
            autoPlay = {true}
            infiniteLoop = {true}
            interval={7000}
            showIndicators = {false}
            showThumbs = {false}
            showStatus={false}
            transitionTime={5000}
            swipeable={this.state.slideshow}
            onClickItem = {this.onClickItemEvent}
            onChange = {this.onChangeEvent}
            width='100%'
            >
                {items}
            </Carousel>
            )}
            </div>
        );
    }
};

export default DemoCarousel;