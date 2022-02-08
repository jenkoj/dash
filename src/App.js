//TODO 
//clean up inputs in register and login! 
//singout button in navbar
//stay signed in checkbox in login page 
// edi

//vključim knjižnice

import React, { useState } from 'react'

import {Route } from 'react-router-dom'

//vključim relativne poti za 3 strani
import Login from "./components/login"
import Home from "./components/home"
import Rezka from "./components/power"
import Weather from "./components/weather"

//uvozim modul za navigacijo
import NavigationBar from "./components/utils/navbars/navigationBar"


import useToken from './components/utils/useToken';


function App() {
  //const [token, setToken] = useState()

  const { token, setToken } = useToken();

  if(token == undefined || token == "undefined" ) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <NavigationBar setToken={setToken}/>
      <Route exact path="/" component={Home} />
      <Route exact path="/power" component={Rezka}/>
      <Route exact path="/weather" component={Weather}/>
    </div>
  );
}

export default App;
