import React,{useState} from 'react';
import {Row, Col,Form,Button} from 'react-bootstrap';
import { sha256 } from 'js-sha256';

import "./register.css";

import creds from "../../../../creds/pass.json";

/**
 * Registration form sends post request with all creditentials if user input is valid 
 * @returns registration form 
 */
export default function RegisterForm() {

    const [validated, setValidated] = useState(false);

    //parameters to send 
    const [username, setUserName] = useState();
    const [password_tmp, setPassword] = useState();
    const [email, setEmail] = useState();
    const [firstName, setFirstname] = useState();
    const [lastName, setLastname] = useState();
    const [age, setAge] = useState();
    

    /**
     * Function handles POST request to backed with user input 
     * @param {*} credentials set in the input
     */
    async function registerUser(credentials) {
      
      fetch("http://"+creds.ip.api+"/register/", {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
      .then(res => alert(res.response))
      .then("Request sent!")
      .catch(err=>console.log(err))
    }
    
    //Turns on input validation 
    const handleClick = () => {
      setValidated(true)
    }

    /**
     * Is triggered on submit, hashes passsword passes all user input to POST function
     * @param {*} event 
     */
    const handleSubmit = async event => {
      
      event.preventDefault();
      
      let password = sha256.hmac(creds.hmac.key,password_tmp);
      await registerUser({username,password,email,firstName,lastName,age})
      alert("Request sent!")

    }
  
  
    return (
      <Form  noValidated validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group  as={Col} md="4" controlId="validationCustom01">
            <Form.Control
              required
              type="text"
              placeholder="First name"
              className="input"
              onChange={e => setFirstname(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              className="input"
              onChange={e => setLastname(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Control
              required
              type="number"
              placeholder="Age"
              className="input"
              onChange={e => setAge(e.target.value)}

            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group  as={Col} md="4" controlId="validationCustomUsername">
         
              <Form.Control
                type="text"
                placeholder="Username"
                required
                className="input"
                onChange={e => setUserName(e.target.value)}

              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
          </Form.Group>
                <Form.Group  as={Col} md="4" controlId="validationCustomPassword">
              
              <Form.Control
                type="password"
                placeholder="Password"
                required
                className="input"
                onChange={e => setPassword(e.target.value)}

              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group  as={Col} md="4" controlId="validationCustomEmail">
         
              <Form.Control
                type="email"
                placeholder="Email"
                required
                className="input"
                onChange={e => setEmail(e.target.value)}

              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter valid email.
              </Form.Control.Feedback>
          </Form.Group>
        </Row>
        
        <Button className="button" color="dark" variant="secondary" type="submit" onClick={handleClick} >Request access</Button>
      </Form>
    );
  }