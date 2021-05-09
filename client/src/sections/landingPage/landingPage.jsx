import React from "react";
import "./landingPage.scss";
import "./landingPage.css";
import Background from "./../../Images/background.jpg";
import Navbar from "./../../components/Navbar/navbarHome";
import {Button} from 'react-bootstrap'
function LandingPage() {
  return (
    <div id="Home">
      <Navbar />

      <img className="background-Img" src={Background}></img>
      <center>
        <h1 className="Heading">Application Name</h1>
      </center>
      <p className="description">
        Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem Ipsum
        Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet.
        Lorem Ipsum Dolor Sit Amet.Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor
        Sit Amet.
      </p>
    <Button className="button" variant="dark">LogIn</Button>
    <Button className="button" variant="dark">Sign Up</Button>
    <Button className="button" variant="dark">Try as Guest</Button>
    </div>
  );
}
export default LandingPage;
