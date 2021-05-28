import React from "react";
import "./contactUs.scss";
import "./contactUs.css";
import Navbar from "./../../components/Navbar/navbarHome";
import { Button, Form } from "react-bootstrap";
function Contact() {
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
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="Label">Email address</Form.Label>
            <Form.Control
              className="Input"
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your data with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="ControlTextarea1">
            <Form.Label className="Label">Feedback/Queries</Form.Label>
            <Form.Control className="Input-Area" as="textarea" rows={3} />
          </Form.Group>

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Contact;
