import React from 'react';
import {Button,Modal} from 'react-bootstrap';

import "./register.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import RegisterForm from './registerForm';


export default function Register(props) {

     return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="my-modal"
        dialogClassName="border-radius-2"
      >
      
        <Modal.Header closeButton>
          <Modal.Title className="title" id="contained-modal-title-vcenter">
            Please enter required information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <RegisterForm></RegisterForm>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button" color="dark" variant="secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        
      </Modal>
    );
  }


