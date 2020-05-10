import React from 'react'
import {Route, Link} from "react-router-dom"
import Home from "./components/home"
import Rezka from "./components/rezka/rezka"
import Weather from "./components/weather"

import NavigationBar from "./components/utils/navbars/navigationBar"
import LightSwitch from "./components/utils/buttons/LightSwitch"

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Route exact path="/" component={Home} />
      <Route exact path="/rezka" component={Rezka}/>
      <Route exact path="/vreme" component={Weather}/>
    </div>
  );
}

export default App;
