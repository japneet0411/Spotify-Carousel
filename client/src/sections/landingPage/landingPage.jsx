import React from "react";
import "./landingPage.scss";
import "./landingPage.css";
import Background from "./../../Images/background.jpg";
import Navbar from "./../../components/Navbar/navbarHome";

import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div id="Home">
      <Navbar />
      <img className="background-Img" alt="background" src={Background}></img>
      <center>
        <h1 className="Heading">Application Name</h1>
      </center>
      <p className="description">
        Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem Ipsum
        Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet.
        Lorem Ipsum Dolor Sit Amet.Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor
        Sit Amet.
      </p>

      <Link to="/login" className="ml-5 Button regular">
        Log In
      </Link>
      <Link to="/signUp" className="Button regular">
        Sign Up
      </Link>
      <Link to="/guest/carousel" className="Button regular">
        Try as Guest
      </Link>
    </div>
  );
}
export default LandingPage;
