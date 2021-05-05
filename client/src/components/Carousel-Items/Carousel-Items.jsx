import React, { useState } from "react"
import './Carousel-Items.scss'
import './Carousel-Items.css'


function Items(props){
  const [loaded, setLoaded] = useState(false);
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
      </div>
      </section>
      </header>
    </div>
  );
};

export default Items;