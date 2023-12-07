import React from 'react';
import MainPage_bg from './MainPage_bg/MainPage_bg'
import './MainPage.scss'
import AboutSP from './AboutSP/AboutSP';
import Premie from './Premie/Premie';
import Gallery from './Gallery/Gallery';

const MainPage = () => {

  return (
    <main className='main-page'>
      <MainPage_bg />
      <AboutSP />
      <Premie />
      <Gallery />
    </main>
  );
};

export default MainPage;