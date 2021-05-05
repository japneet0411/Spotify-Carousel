import React, { useState } from "react"
import './Carousel-Items.scss'
import './Carousel-Items.css'
import { Button } from 'react-bootstrap';
import axios from 'axios';


function Items(props){
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(props.saved);
  const [saveText, setSaveText] = useState('Save Track');

  const savePlaylist = () => {
    if(saved){
      setSaved(false);
      setSaveText('Save Track');
      axios
        .post('http://localhost:5000/:username/removeSavedPlaylist', {
          playlistName: props.title
        });
    }
    else{
      setSaved(true);
      setSaveText('Saved');
      axios
        .post('http://localhost:5000/:username/savePlaylist', {
          playlistName: props.title
        });
    }
  }

return(
  
    <div>
      {loaded ? null : (
        <div
          style={{
            background: 'black',
            height: '100vh',
            width: '100%'
          }}
        />
      )}
      <header>
      <img
        style={loaded ? {} : { display: 'none' }}
        src={props.src}
        onLoad={() => setLoaded(true)}
        alt='music'
      />
      <section className='header-text'>
      <div className='playlist-title' style={loaded ? {} : { display: 'none' }}>
        {props.title}
      </div>
      <div className='description' style={loaded ? {} : { display: 'none' }}>
        {props.description}
        <br />
      </div>
      <div className='savebutton' style={loaded ? {} : { display: 'none' }}>
      <Button onClick={savePlaylist} >{saveText}</Button>
      </div>
      </section>
      </header>
    </div>
  );
};

export default Items;