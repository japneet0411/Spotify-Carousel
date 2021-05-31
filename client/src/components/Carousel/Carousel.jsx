import React, { Component } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import PlayASong from './../Main-Modal/Main-Modal';
import './Carousel.css';
import './Carousel.scss';
import Items from './../Carousel-Items/Carousel-Items';
import Bar from './../Navbar/navbar';
const axios = require('axios');

class DemoCarousel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slideshow: true,
			showModal: false,
			changing: false,
			current: 0,
			carousel: [],
		};
	}
	componentDidMount() {
		const username = sessionStorage.getItem('user');
		var serverUrl;
		if (username) serverUrl = 'http://localhost:5000/' + username + '/carousel';
		else serverUrl = 'http://localhost:5000/guest/carousel';
		axios
			.get(serverUrl)
			.then((response) => {
				this.setState({
					carousel: response.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}
	handleClose = () => {
		this.setState({
			showModal: false,
			slideshow: true,
			changing: false,
		});
	};
	onClickItemEvent = (selectedIndex) => {
		if (this.state.changing === false) {
			this.setState({
				slideshow: false,
				showModal: true,
				current: selectedIndex,
			});
		} else {
			this.setState({
				changing: false,
			});
		}
	};
	onChangeEvent = (selectedIndex) => {
		this.setState({
			changing: true,
			current: selectedIndex,
		});
	};
	render() {
		var items = [];
		for (let item of this.state.carousel) {
			items.push(
				<Items
					key={item}
					src={item.carouselImage}
					title={item.name}
					description={item.description}
				/>
			);
		}

		return (
			<div id='Carousel' className='standard-size'>
				{this.state.showModal && (
					<PlayASong
						isOpen={this.state.showModal}
						onRequestClose={this.handleClose}
						button={this.handleClose}
						index={this.state.carousel[this.state.current].name}
					/>
				)}
				{items.length > 0 && (
					<div>
						<Bar modalOpen={this.state.showModal} />
						<Carousel
							autofocus={true}
							autoPlay={true}
							infiniteLoop={true}
							interval={7000}
							showIndicators={false}
							showThumbs={false}
							showStatus={false}
							transitionTime={5000}
							swipeable={this.state.slideshow}
							onClickItem={this.onClickItemEvent}
							onChange={this.onChangeEvent}
							width='100%'>
							{items}
						</Carousel>
					</div>
				)}
			</div>
		);
	}
}

export default DemoCarousel;
