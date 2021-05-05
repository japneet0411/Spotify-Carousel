import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPalette, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Canvas from '../Canvas/Canvas';
import Modal from 'react-modal';
import './Main-Modal.scss'
import './Main-Modal.css'
import axios from "axios";
import { Button } from "react-bootstrap";

class PlayASong extends Component{
  constructor(props){
    super(props);
    this.state = {
      embed_url: '',
      saved: false
    }
  }

  componentDidMount(){
    axios
      .get('http://localhost:5000/modal/'+this.props.index)
      .then((response) => {
        this.setState({
          embed_url: response.data.embed_url,
          saved: response.data.saved
        });
      })
      .catch((err) => {
        console.log(err)
      });
    }

    saveTrack = () => {
      console.log("Save track");
      axios
        .post('http://localhost:5000/guest/saveTrack', {
          trackId: this.state.embed_url.replace("https://open.spotify.com/embed/track/", "")
        })
        .then(() => {
          this.setState({
            saved: true
          });
          console.log(this.state.saved);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    unsaveTrack = () => {
      console.log("Unsave track");
        axios
          .post('http://localhost:5000/guest/saveTrack', {
            trackId: this.state.embed_url.replace("https://open.spotify.com/embed/track/", "")
          })
          .then(() => {
            this.setState({
              saved: false
            });
          })
          .catch((err) => {
            console.log(err);
          });
        }

  render(){
    const customStyles = {
      content : {
        backgroundColor: '#000000'
      }
    };
  return(
    <div>
    <Modal
    isOpen={this.props.isOpen}
    onRequestClose={this.props.onRequestClose}
    contentLabel="Song"
    className="Modal"
    style={customStyles}
    >

    <Canvas className='Modal animation' />
    <button className="Btn" onClick={this.props.button}>
      <FontAwesomeIcon icon={faTimes} size="2x" style={{color: "white"}}/>
    </button>

    

    <iframe className="frame"
      title="Music" 
      src={this.state.embed_url}
      width="300" 
      height="380" 
      frameborder="0" 
      allowtransparency="true" 
      allow="encrypted-media"
      
    > 
  </iframe>
  
  <button className="add" onClick={this.saveTrack}>
    <FontAwesomeIcon icon={faPlusCircle} size="2x" style={{color: "white"}} /> 
    <br></br>        
     <strong>Save Track</strong>
     </button>
    

  <button className="customise">
    <FontAwesomeIcon icon={faPalette} size="2x" style={{color: "white"}} /> 
    <br></br>        
     <strong>Customize</strong>
     </button>

    </Modal>
    </div>
 
  )
}
}
export default PlayASong;