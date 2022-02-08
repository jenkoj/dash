
import styles  from './login.module.css';
import React, { useState, render } from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col,Form,Button,Alert,Modal,InputGroup} from 'react-bootstrap';

import Register from "./utils/modals/registration/register"

//import 'bootstrap/dist/css/bootstrap.min.css';


import creds from "../creds/pass.json";

import { sha256 } from 'js-sha256';

async function loginUser(credentials) {
    return fetch("http://"+creds.ip.api+"/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }


export default function Login({setToken}) {
  
  const [username, setUserName] = useState();
  const [password_tmp, setPassword] = useState();
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit = async e => {
    alert("submit")
    e.preventDefault();

    let password = sha256.hmac(creds.hmac.key,password_tmp);
    const token = await loginUser({
      username,
      password
    });
    console.log(token.token)

    if (token.token == "True"){
        setToken(token)
    }
    else if(token.token == "False"){
        let msg= "Incorrect username or password! " + (token.retries) + " retries left"
        alert(msg)
        
    }
    else{
        alert("Server error, can't connect")
    }
  }


  return(
    
    <Container  className={styles.loginWrapper}>

        <Container className={styles.loginBlock}>
            
            <Row> 
                <h1 className={styles.logo}>|DASH|</h1>
            </Row>
            
            <Container className={styles.loginForm}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formBasicUsername"> 
                            <Form.Control className={styles.input}  onChange={e => setUserName(e.target.value)} type="username" placeholder="username" />     
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Control className={styles.input}  onChange={e => setPassword(e.target.value)} type="password" placeholder="password" />
                    </Form.Group>
                
                    <Button  className={styles.button} color="dark" variant="secondary" type="submit">
                        Login
                    </Button>

                   
                </Form>
                <Button onClick={handleShow} className={styles.button} color="dark" variant="secondary">
                        Request access
                </Button>

                <Form.Check
                  label="Keep me signed in"
                  name="group1"
                  type="checkbox"
                  className={styles.checkBox}
                />
                    
            </Container>
           
        </Container>
        <Register
        show={show}
        onHide={() => handleClose(false)}
        />
      
    </Container>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }