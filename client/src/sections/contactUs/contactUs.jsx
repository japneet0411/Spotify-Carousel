import React, { useState } from "react";
import "./contactUs.scss";
import "./contactUs.css";
import Navbar from "./../../components/Navbar/navbarHome";
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import Swal from "sweetalert2";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const contactUs = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Successfully Recorded your Feedback',
      text: "You can expect a reply from us soon!"
    });
    axios
      .post("http://localhost:5000/contactUs", {
        name: name,
        email: email,
        feedback: feedback
      })
      .then(() => {})
      .catch((err) => console.log(err));
  }
  return (
    <div className="contact">
      <Navbar />
      <div className="contact-Us">
        <p className="header p-3">Contact Us</p>
        <hr />
        Having any Queries?<br></br>
        Provide your Details below, we will reach to you Asap!
        <br />
        <br />
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label className="Label">Name</Form.Label>
            <Form.Control
              className="Input"
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="Label">Email address</Form.Label>
            <Form.Control
              className="Input"
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your data with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="ControlTextarea1">
            <Form.Label className="Label">Feedback/Queries</Form.Label>
            <Form.Control className="Input-Area" as="textarea" rows={3} onChange={(e) => setFeedback(e.target.value)}/>
          </Form.Group>

          <Button variant="dark" type="submit" onClick={(e) => contactUs(e)}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Contact;
