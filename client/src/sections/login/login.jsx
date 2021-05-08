import React from "react";
import './login.css'
import './login.scss'
import {Form} from 'react-bootstrap'

function Login() {
  return (
  <div className="parent">
 
  <Form className="Form">
  <center><h2>LOGIN</h2></center>
  <Form.Group controlId="formGroupEmail">
    <Form.Label className="label pos">Email address</Form.Label>
    <Form.Control className="box" type="email" placeholder="Enter email" />
  </Form.Group>
  <Form.Group controlId="formGroupPassword">
    <Form.Label className="label">Password</Form.Label>
    <Form.Control className="box" type="password" placeholder="Password" />
  </Form.Group>
  <p className="text-muted text">Dont have an account yet? <a className="link">Sign Up</a></p>
  <button className="btns">Log In</button>
  
</Form>

</div>
  );
}
 export default Login;