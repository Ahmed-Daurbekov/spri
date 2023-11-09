import React from 'react';
import { routes } from "./index";
import Header from '../Components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

const AppRoutes = () => {
  return (
    <>
      <Header />
      <main className='main'>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;