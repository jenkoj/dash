import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.css"

//enables multi-page website
import {BrowserRouter} from "react-router-dom"

//the meat of website
import App from './App';

//renderiram DOM 
ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);
