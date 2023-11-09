import './App.scss';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

import About from './Components/About/About'
import AboutProjects from './Components/AboutProjects/AboutProjects'
import AboutWorks from './Components/AboutWorks/AboutWorks'
import AboutWriters from './Components/AboutWriters/AboutWriters'
import AppRoutes from './routes/AppRoutes';
import React from 'react';
import axios from 'axios';

// import React from "react";
import firebase from 'firebase/app';
import 'firebase/storage';

function App() {
  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
}

export default App;
