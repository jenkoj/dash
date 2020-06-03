//vključim knjižnice
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.css"

import * as serviceWorker from './serviceWorker'; 

//Browser router mi omogoča da imam 3 strani
import {BrowserRouter} from "react-router-dom"
//importam appikacijo (vse je napisano tam)
import App from './App';

//renderiram virtualni DOM
ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
