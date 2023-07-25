import React from 'react';
import {Link} from 'react-router-dom';

import './Auth.css';

function Login() {
    return (
        <div className="custom-center">
            <div className='wrapper'>
                <div className='form-box password-reset'>
                    <h2>Forgot Password?</h2>
                    <form action="#">
                        <div className="input-box">
                            <span className="icon"><ion-icon name="mail"></ion-icon></span>
                            <input type="email" required />
                            <label>Email</label>
                        </div>
                        <button type="submit" className="btn">Reset Password</button>
                        <div className="login-register">
                            <p>Go Back? <Link to="/login" className="login-link">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;