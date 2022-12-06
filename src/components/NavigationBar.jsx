import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css'
function NavigationBar() {
    return (
        
        <div className='navigationbar'>
            <nav className='navbar navbar-expand navbar-dark bg-dark'>
                <div className='container'>
                   <ul className='navbar-nav mx-auto'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/about'>
                            About
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/login'>
                            Login
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to='/register'>
                            Register
                        </NavLink>
                    </li>
                    {/* <li className='nav-item'>
                        <NavLink className='nav-link' to='/contact'>
                            Contact Us
                        </NavLink>
                    </li> */}
                   </ul>
                </div>
            </nav>
        </div>
    ); 
}

export default NavigationBar;