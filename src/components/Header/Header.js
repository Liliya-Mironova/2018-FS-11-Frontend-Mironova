import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <button className='BackButton'>
                    <Link to='/'>Back</Link>
                    <img className='ArrowBack' src='../img/arrow_back_24_px.png' alt='' />
                </button>
                <div className="Login">
                  <Link to="/login">Login</Link>
                </div>
            </header>
        );
    }
}

export default Header;