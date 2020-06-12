//vključim knjižnice
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.css"

//browser router mi omogoča da imam 3 strani
import {BrowserRouter} from "react-router-dom"
//importam appikacijo (tam je vse napisano)
import App from './App';

//renderiram DOM 
ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);

