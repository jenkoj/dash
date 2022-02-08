import React from 'react'
import {Route} from 'react-router-dom'

import NavigationBar from "./components/utils/navbars/navigationBar"
import useToken from './components/utils/handleTokens/useToken';

//import all main pages 
import Login from "./components/login"
import Home from "./components/home"
import Rezka from "./components/power"
import Weather from "./components/weather"

function App() {

  const { token, setToken } = useToken();
  
  if(token === undefined || token === "undefined" ) {
    return <Login setToken={setToken}/>
  }

  return (
    <div className="wrapper">
      <NavigationBar setToken={setToken} />
      <Route exact path="/" component={Home} />
      <Route exact path="/power" component={Rezka}/>
      <Route exact path="/weather" component={Weather}/>
    </div>
  );
}

export default App;
