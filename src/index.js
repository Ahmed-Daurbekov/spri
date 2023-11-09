import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { Context } from './Context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Context>
);

