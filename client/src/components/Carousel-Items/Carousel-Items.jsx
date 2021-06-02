import React, { useState } from "react";
import "./Carousel-Items.scss";
import "./Carousel-Items.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import Lottie from "react-lottie";
import animationData from "./../../lotties/carousel-loading.json";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function Items(props) {
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);

  const onLoadHandler = async () => {
    const username = sessionStorage.getItem("user");
    var serverUrl;
    if (username)
      serverUrl = "http://localhost:5000/" + username + "/playlistStatus";
    else serverUrl = "http://localhost:5000/guest/playlistStatus";
    await axios
      .post(serverUrl, {
        playlistName: props.title,
      })
      .then((response) => {
        if (response.data.saved) setSaved(true);
        else setSaved(false);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoaded(true);
  };

	const handleClick = async () => {
		const username = sessionStorage.getItem('user');
		if (username) {
			await axios
				.post('http://localhost:5000/' + username + '/setPlaylistStatus', {
					playlistName: props.title,
				})
				.then((response) => {
					if (response.data.saved) {
						setSaved(true);
					} else {
						setSaved(false);
					}
					Swal.fire({
						icon: 'info',
						title: response.data.message});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			Swal.fire({
				icon: 'warning',
				title:'You must be logged in to use this feature'});
		}
	};
  
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      {loaded ? null : (
        <div
          style={{
            background: "white",
            height: "100vh",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Lottie options={defaultOptions} height={700} width={700} />
        </div>
      )}
      <header>
        <img
          style={loaded ? {} : { display: "none" }}
          src={props.src}
          onLoad={onLoadHandler}
          alt="music"
        />
        <section className="header-text">
          <div
            className="playlist-title"
            style={loaded ? {} : { display: "none" }}
          >
            {props.title}
          </div>
          <div
            className="Description"
            style={loaded ? {} : { display: "none" }}
          >
            {props.description}
          </div>
          <div className="savebutton" style={loaded ? {} : { display: "none" }}>
            <OverlayTrigger placement="right-end" delay={{ show:250, hide: 400 }} overlay={ <Tooltip id="tooltip"> Save/Unsave Playlist </Tooltip>}>
            <button className="btn" onClick={handleClick}>
              <FontAwesomeIcon
                icon={saved ? faCheckSquare : faPlusSquare}
                size="2x"
                style={{ color: "white" }}
              />
            </button>
            </OverlayTrigger>
          </div>
        </section>
      </header>
    </div>
  );
}

export default Items;
