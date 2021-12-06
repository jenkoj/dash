//vključim knjižnice
import React from 'react'
import {Route} from "react-router-dom"
//vključim relativne poti za 3 strani
import Home from "./components/home"
import Rezka from "./components/power"
import Weather from "./components/weather"

//uvozim modul za navigacijo
import NavigationBar from "./components/utils/navbars/navigationBar"

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Route exact path="/" component={Home} />
      <Route exact path="/poraba" component={Rezka}/>
      <Route exact path="/vreme" component={Weather}/>
    </div>
  );
}

export default App;
