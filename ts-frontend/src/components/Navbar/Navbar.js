import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthOptions from '../Auth/AuthOptions';
import './Navbar.css';

// import logo from '../../photos/summarize_me_logo_white.png'

class Navbar extends Component {
    render() {
        return (
            <>
                <nav className="nav-content navbar navbar-expand-xl">
                    <div className="container-fluid">
                        {/* <img src={logo} alt='Logo of Summarize Me' height="30px" /> */}
                        {/* <span className="summarize_logo"></span> */}
                        <Link to="/" className="logo_link navbar-brand"><h2 className='logo'>
                            <span className="summarize_logo"></span>
                            <span>Summarize Me</span></h2>
                        </Link>
                        <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"><i className="bi bi-stack"></i></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto navigation">
                                <li className="nav-item mt-2">
                                    <Link to="/" className="route-link">Dashboard</Link>
                                </li>
                                <li className="nav-item mt-2">
                                    <Link to="/api_keys" className="route-link">API</Link>
                                </li>
                                <li className="nav-item mt-2">
                                    <Link to="/about" className="route-link">About</Link>
                                </li>
                                <li className="nav-item mt-2">
                                    <Link to="/history" className="route-link">History</Link>
                                </li>
                                <li className='nav-item mt-2'>
                                    <span className='auth-options'>
                                        <AuthOptions />
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <nav className='nav-content navbar navbar-expand-lg'>
                    <Link to="/" className="logo_link"><h2 className='logo'>Summarize Me</h2></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#custom-navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navigation" id="custom-navigation">                       
                        <Link to="/" className="route-link">Dashboard</Link>
                        <Link to="/api_keys" className="route-link">API</Link>
                        <Link to="/about" className="route-link">About</Link>
                        <Link to="/history" className="route-link">History</Link>
                        <span className='auth-options'>
                            <AuthOptions />
                        </span>
                    </div>
                </nav> */}
            </>
        )
    }
}

export default Navbar;