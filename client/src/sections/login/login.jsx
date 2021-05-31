import React, { useState } from "react";
import "./login.scss";
import "./login.css";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import Navbar from "./../../components/Navbar/navbarHome";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        Swal.fire({
          icon: 'info',
          title: response.data.message}).then((result) => {
          if (result.isConfirmed) {
            if (response.data.message === "Success") {
              sessionStorage.setItem("user", response.data.username);
              history.push("/" + response.data.username + "/carousel");
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <Navbar />
      <Form className="form">
        <center>
          <h2 className="head">LOGIN</h2>
        </center>
        <Form.Group controlId="formGroupEmail">
          <Form.Label className="label">Username</Form.Label>
          <Form.Control
            className="inputs"
            type="text"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label className="label">Password</Form.Label>
          <Form.Control
            className="inputs"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <p className="text-muted text">
          Don't have an account yet?<Link to="/signUp">Sign Up</Link>
        </p>
        <button className="btns" onClick={(e) => loginUser(e)}>
          Log In
        </button>
      </Form>
    </div>
  );
}
export default Login;
