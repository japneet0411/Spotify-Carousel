import React from "react"
import { useState } from 'react';
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import './Card.scss'
import './Card.css'
import TrackModal from './../Track-Modal/Track-Modal';
import PlayASong from './../Main-Modal/Main-Modal';
import axios from "axios";
import Swal from 'sweetalert2';
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';



function Cards(props){
    const [showModal, setShowModal] = useState(false);
    const [embedUrl, setEmbedUrl] = useState('');
    const [details, setDetails] = useState([]);
    const [showSpotifyModal, setShowSpotifyModal] = useState(false);

  const handleCloseSpotifyModal = () => setShowSpotifyModal(false);
  const handleShowSpotifyModal = () => setShowSpotifyModal(true);

    const play = () => {
        setEmbedUrl(props.id);
        setShowModal(true);
    }

    const handleClose = () => setShowModal(false);

    const deleteFunction = () => {
        if(props.type==='track' && props.delete){
            axios
            .post('http://localhost:5000/guest/removeSavedTrack', {
                trackId: props.id
            });
            Swal
                .fire('Deleted track')
                .then((result) => {
                    if(result.isConfirmed){
                        window.location.reload();
                    }
                })


        }
        else if(props.type==='playlist' && props.delete){
            axios
                .post('http://localhost:5000/guest/removeSavedPlaylist', {
                    playlist: props.id
                });
            Swal
                .fire('Deleted playlist')
                .then((result) => {
                    if(result.isConfirmed){
                        window.location.reload();
                    }
                })
        }
    }

    const loginWithSpotify = () => {
        axios.get('http://localhost:5000/guest/isAuthenticatedWithSpotify')
            .then((response) => {
                if(response.data.message==='Success'){
                    Swal.fire("Your have already connected to your spotify account");
                }
                else{
                    Swal.fire({
                        icon: 'question',
                        title: "Connect to your Spotify account?",
                        showCloseButton: true,
                        text: "This will allow you to create & modify your spotify playlists"
                        })
                        .then((result) => {
                            if(result.isConfirmed){
                                axios
                                    .get('http://localhost:5000/guest/authenticateWithSpotify')
                                    .then((response) => {
                                        window.open(response.data.url);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }
                        })
                }
            });
        }

    const addToSpotify = () => {
        axios.get('http://localhost:5000/guest/isAuthenticatedWithSpotify')
            .then((response) => {
                if(response.data.message==='Success'){
                    handleShowSpotifyModal();
                    axios.get('http://localhost:5000/guest/addToMyLibrary')
                        .then((response) => {
                            setDetails(response.data.details);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                else{
                    Swal.fire("You must be signed in with Spotify to use this feature");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    
    const addToPlaylist = (id) => {
        axios
            .post('http://localhost:5000/guest/addToUserPlaylist', {
            trackId: props.id,
            playlist: id
        })
            .then((response) => {
                Swal.fire(response.data.message);
            })
            .catch((err) => {
                console.log(err);
            })
    }
        var items = [];
        for(let item of details){
            items.push(
                <div>
                    {/*<ListGroupItem style={{ height: '3rem'}}>*/}
                    <Button variant='light' style={{ margin: '0px', width: '100%', textAlign: 'left'}} onClick={() => addToPlaylist(item.id)}>{item.name}</Button>
                    {/*</ListGroupItem>*/}
                </div>
            )
        }
    return(
        <div>
        {(showModal && props.type==='track') ? (
            <TrackModal 
            isOpen={showModal}
            onRequestClose={handleClose}
            button={handleClose}
            embedUrl={'https://open.spotify.com/embed/track/'+embedUrl}
            />): null}
        {(showModal && props.type==='playlist') ? (
            <PlayASong 
            isOpen={showModal}
            onRequestClose={handleClose}
            button={handleClose}
            index={props.id}
            />): null}
        <Modal show={showSpotifyModal} onHide={handleCloseSpotifyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ListGroup>
            {items}
            </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSpotifyModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseSpotifyModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        <Card style={{ width: '20rem' }} className="cards">
        <Card.Img variant="top" src={props.src} className="card-img" onClick={play}/>
        <Card.Body>
            <Card.Text className='card-text-style'>
                <span style={{ fontSize: '1.5rem'}}>{props.main}</span> <br />
                <span style={{ fontSize: '1rem', color: 'gray'}}>{props.subtext}</span>       
            </Card.Text>
            <div className='icons'>
            <FontAwesomeIcon icon={faPlusCircle} onClick={addToSpotify} />
            &nbsp;&nbsp;&nbsp;
            {props.delete ? (
            <FontAwesomeIcon icon={faTrash} onClick={deleteFunction} />) : null} 
            &nbsp;&nbsp;&nbsp;
            {props.loginWithSpotify ? (
            <FontAwesomeIcon icon={faSpotify} onClick={loginWithSpotify}/>) : null}
            </div>
       </Card.Body>
       </Card>
       </div>
    )
}

export default Cards;