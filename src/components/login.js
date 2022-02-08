import styles  from './login.module.css';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Container, Row , Form, Button} from 'react-bootstrap';
import { sha256 } from 'js-sha256';

import Register from "./utils/modals/registration/register"

import creds from "../creds/pass.json";

/**
 * 
 * @param {*} credentials - user input to be send 
 * @returns POST request response
 */

//sends POST request to backend with login creds
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

/**
 * 
 * @param {*} setToken - State for setting token (saves it to local storage) 
 * @returns Login page 
 */

export default function Login({setToken}) {
  
  //define creds 
  const [username, setUserName] = useState();
  const [password_tmp, setPassword] = useState();
  
  //for handling modal 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  /**
   * Is triggered on submit, hashes passsword passes all user input to POST function
   * @param {*} event 
   * @returns 
   */
  const handleSubmit = async e => {
    
    e.preventDefault();
    
    //return 0 if user submits empty bars 
    if (!password_tmp  || !username ){
      alert("no input!")
      return 0
    }

    //hash pasword 
    let password = sha256.hmac(creds.hmac.key,password_tmp);

    //send POST request and wait for response 
    const token = await loginUser({
      username,
      password
    });

    //handle POST response 
    if (token.token === "True"){
        setToken(token)
    }
    else if(token.token === "False"){
        let msg = "Incorrect username or password! " + (token.retries) + " retries left"
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
    setToken: PropTypes.func.isRequired,
  }