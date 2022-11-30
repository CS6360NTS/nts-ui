import React from 'react';
import logo from './logo.PNG';
import './Header.css';

const Header = () => {
  return (
    <div>
      <img className='img-fluid' src={logo} alt=''></img>
    </div>
  )
}

export default Header;
