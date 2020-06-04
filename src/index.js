//vključim knjižnice
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.css"

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

