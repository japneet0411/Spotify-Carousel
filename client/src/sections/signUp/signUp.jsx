import React, { useState } from "react";
import "./signUp.css";
import "./signUp.scss";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Navbar from "./../../components/Navbar/navbarHome";
import { Container } from "react-bootstrap";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const registerUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/signUp", {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((response) => {
        Swal.fire(response.data.message).then((result) => {
          if (result.isConfirmed) {
            if (response.data.message === "Successfully created account") {
              console.log("created account");
              history.push("/login");
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="parent">
      <Navbar />
      <Form className="Form">
        <center>
          <h2 className="sign">SIGN UP</h2>
        </center>
        <Form.Group controlId="formGroupUsername">
          <Form.Label className="labels">Username</Form.Label>
          <Form.Control
            className="box"
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label className="labels">Email address</Form.Label>
          <Form.Control
            className="box"
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formGroupPassword">
          <Form.Label className="labels">Password</Form.Label>
          <Form.Control
            className="box"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formGroupConfirmPassword">
          <Form.Label className="labels">Confirm Password</Form.Label>
          <Form.Control
            className="box"
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <p className="text-muted text">
          Already have an account yet? <Link to="/login">Sign In</Link>
        </p>
        <button
          className="btns"
          onClick={(e) => {
            registerUser(e);
          }}
        >
          Sign Up
        </button>
      </Form>
    </div>
  );
}
export default SignUp;
