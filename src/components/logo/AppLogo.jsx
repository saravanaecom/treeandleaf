import React from 'react';
import Logo from './logo.png';
const AppLogo = ({ children }) => {
  return (
    <img src={Logo} alt="logo" style={{width: '160px', height: '40px'}}/>
  );
};

export default AppLogo;
