import React, { createContext } from 'react';

export const Auth = createContext();

export const Context = ({children}) => {
  const [isAuth, setIsAuth] = React.useState(false);

  React.useEffect(() => {
    const authIs = localStorage.getItem('authIs') || false
    setIsAuth(authIs)
    // Сдеалть кнопку запомнить меня через localStorage
  }, [])
   

  return (
    <Auth.Provider value={{isAuth, setIsAuth}}>
      {children}
    </Auth.Provider>
  );
};