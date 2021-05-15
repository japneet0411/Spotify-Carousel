import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
	faPlusCircle,
	faCheckCircle,
	faMusic,
} from '@fortawesome/free-solid-svg-icons';
import Customize from './customize';
import Canvas from '../Canvas/Canvas';
import Modal from 'react-modal';
import './Main-Modal.scss';
import './Main-Modal.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Lottie from 'react-lottie';
import animationData from './../../lotties/carousel-loading.json';
//import Switch from 'react-switch';

class PlayASong extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: [],
			showModal: false,
			color1: '#ffffff',
			color2: '#ffffff',
			color3: '#ffffff',
			color4: '#000000',
			icon: faPlusCircle,
			text: 'Save Track',
			embed_url: '',
			saved: false,
			loaded: false,
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/guest/modal/' + this.props.index)
			.then((response) => {
				//console.log(response);
				this.setState({
					embed_url: response.data.embed_url,
					saved: response.data.saved,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	handleClose = () => {
		this.setState({
			showModal: false,
		});
	};

	setColor1 = (color1) => {
		this.setState({ color1: color1 });
	};
	setColor2 = (color2) => {
		this.setState({ color2: color2 });
	};
	setColor3 = (color3) => {
		this.setState({ color3: color3 });
	};
	setColor4 = (color4) => {
		this.setState({ color4: color4 });
	};

	onClickEvent = () => {
		this.setState({
			showModal: true,
		});
	};

	trackSaveStatus = () => {
		console.log('In track save status');
		if (this.state.saved) {
			axios.post('http://localhost:5000/guest/removeSavedTrack', {
				trackId: this.state.embed_url.replace(
					'https://open.spotify.com/embed/track/',
					''
				),
			});
			this.setState({
				saved: false,
				text: 'Save Track',
				icon: faPlusCircle,
			});
		} else {
			axios.post('http://localhost:5000/guest/saveTrack', {
				trackId: this.state.embed_url.replace(
					'https://open.spotify.com/embed/track/',
					''
				),
			});
			this.setState({
				saved: true,
				text: 'Saved',
				icon: faCheckCircle,
			});
		}
	};

	getSimilarTracks = () => {
		axios
			.post('http://localhost:5000/getSimilarTracks', {
				trackId: this.state.embed_url.replace(
					'https://open.spotify.com/embed/track/',
					''
				),
			})
			.then((response) => {
				console.log(response.data);
				var html = response.data.name + '<br />' + response.data.artist;
				Swal.fire({
					imageUrl: response.data.album,
					imageHeight: 200,
					imageWidth: 200,
					html: html,
					confirmButtonText: 'Play Track',
					showCloseButton: true,
				})
					.then((result) => {
						if (result.isConfirmed) {
							this.setState({
								embed_url:
									'https://open.spotify.com/embed/track/' +
									response.data.trackId,
							});
						}
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		const customStyles = {
			content: {
				backgroundColor: '#000000',
			},
		};
		const defaultOptions = {
			loop: true,
			autoplay: true,
			animationData: animationData,
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice',
			},
		};
		return (
			<div>
				<Modal
					isOpen={this.props.isOpen}
					onRequestClose={this.props.onRequestClose}
					contentLabel='Song'
					className='Modal'
					style={this.state.loaded ? { customStyles } : { display: 'none' }}>
					{this.state.loaded ? (
						<Canvas
							style={this.state.loaded ? {} : { display: 'none' }}
							className='Modal animation'
							backgroundColor={this.state.color4}
							particle1={this.state.color1}
							particle2={this.state.color2}
							particle3={this.state.color3}
						/>
					) : (
						<div
							style={{
								background: 'white',
								height: '100vh',
								width: '100%',
								textAlign: 'center',
							}}>
							<Lottie options={defaultOptions} height={400} width={400} />
						</div>
					)}

					<button
						className='Btn'
						onClick={this.props.button}
						style={this.state.loaded ? {} : { display: 'none' }}>
						<FontAwesomeIcon
							icon={faTimes}
							size='2x'
							style={{ color: 'white' }}
						/>
					</button>

					<iframe
						className='frame'
						title='Music'
						src={this.state.embed_url}
						width='300'
						height='380'
						frameborder='0'
						allowtransparency='true'
						allow='encrypted-media'
						style={this.state.loaded ? {} : { display: 'none' }}
						onLoad={() => this.setState({ loaded: true })}></iframe>
					<div className='modal-button'>
						<button
							onClick={this.trackSaveStatus}
							style={this.state.loaded ? {} : { display: 'none' }}>
							{console.log(this.state.saved, this.state.text, this.state.icon)}
							<FontAwesomeIcon
								icon={this.state.icon}
								size='1x'
								style={{ color: 'white' }}
							/>
							<br />
							{this.state.text}
						</button>
						<button
							style={this.state.loaded ? {} : { display: 'none' }}
							onClick={this.onClickEvent}>
							<FontAwesomeIcon
								icon={faPalette}
								size='1x'
								style={{ color: 'white' }}
							/>
							<br />
							Customize
						</button>
						<button
							onClick={this.getSimilarTracks}
							style={this.state.loaded ? {} : { display: 'none' }}>
							<FontAwesomeIcon
								icon={faMusic}
								size='1x'
								style={{ color: 'white' }}
							/>
							<br />
							Similar Tracks
						</button>
					</div>
				</Modal>
				<Customize
					isOpen={this.state.showModal}
					onRequestClose={this.handleClose}
					color1={this.state.color1}
					color2={this.state.color2}
					color3={this.state.color3}
					color4={this.state.color4}
					setColor1={this.setColor1}
					setColor2={this.setColor2}
					setColor3={this.setColor3}
					setColor4={this.setColor4}
				/>
			</div>
		);
	}
}
export default PlayASong;
