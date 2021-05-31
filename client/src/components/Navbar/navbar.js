import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Switch from "react-switch";
import "./navbar.css";
import "./navbar.scss";
import axios from "axios";
import Swal from "sweetalert2";

function Bar(props) {
  const [checked, handleChange] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const username = sessionStorage.getItem("user");

  function initialize() {
    var serverUrl;
    if (username)
      serverUrl = "http://localhost:5000/" + username + "/explicitStatus";
    else serverUrl = "http://localhost:5000/guest/explicitStatus";
    axios
      .get(serverUrl)
      .then((response) => {
        handleChange(response.data.checked);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function Change() {
    setExpanded(true);
    if (checked === true) handleChange(false);
    else handleChange(true);
    var serverUrl;
    if (username) serverUrl = "http://localhost:5000/" + username + "/explicit";
    else serverUrl = "http://localhost:5000/guest/explicit";
    axios
      .post(serverUrl, {
        explicit: checked,
      })
      .then(() => console.log("Set"))
      .catch((err) => console.log(err));
  }

  function Logout() {
    axios
      .get("http://localhost:5000/logout")
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: response.data.message,
        });
      })
      .catch((err) => console.log(err));
    sessionStorage.removeItem("user");
  }

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="false"
        bg="dark"
        variant="dark"
        expanded={!props.modalOpen && expanded}
        onChange={Change}
      >
        <Navbar.Brand href="#">
          <Link
            to={username ? "/" + username + "/carousel" : "/guest/carousel"}
            className="regular"
          >
            App Name
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            setExpanded(expanded ? false : "expanded");
            if (expanded === false) initialize();
          }}
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <hr class="Line"></hr>
          <Nav className="px-1" style={{ textAlign: "right" }}>
            <Nav.Link href="#" onClick={() => setExpanded(false)}>
              <Link
                className="regular"
                to={username ? "/" + username + "/carousel" : "/guest/carousel"}
              >
                Carousel
              </Link>
            </Nav.Link>
            <Nav.Link href="#" onClick={() => setExpanded(false)}>
              <Link
                className="regular"
                to={
                  username
                    ? "/" + username + "/wallOfMusic"
                    : "/guest/wallOfMusic"
                }
              >
                Wall of Music
              </Link>
            </Nav.Link>
            <Nav.Link href="#" onClick={() => setExpanded(false)}>
              <Link
                className="regular"
                to={
                  username
                    ? "/" + username + "/getRecommendations"
                    : "/guest/getRecommendations"
                }
              >
                Get Recommendations
              </Link>
            </Nav.Link>
            <Nav.Link href="#" onClick={() => setExpanded(false)}>
              <Link
                className="regular"
                to={
                  username
                    ? "/" + username + "/savedPlaylists"
                    : "/guest/savedPlaylists"
                }
              >
                Saved Playlists
              </Link>
            </Nav.Link>
            <Nav.Link
              href="#"
              onClick={() => {
                setExpanded(false);
                Change();
              }}
              style={{ marginLeft: "65%" }}
            >
              Explicit Tracks{" "}
            </Nav.Link>
            <Switch
              checked={checked}
              onChange={Change}
              checkedIcon={false}
              uncheckedIcon={false}
              className="toggle"
              width={50}
              height={25}
              onColor={"#1681FF"}
              offColor={"#CFCFCF"}
            />
            <Nav.Link
              href="#"
              onClick={() => {
                setExpanded(false);
                Logout();
              }}
            >
              <Link className="regular" to="/">
                Logout
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
export default Bar;
