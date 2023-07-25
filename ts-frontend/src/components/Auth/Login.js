import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import './Auth.css';

import ErrorNotice from '../Misc/ErrorNotice';
import UserContext from '../Context/UserContext';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [visible, setVisibility] = useState('password');

    const navigate = useNavigate();

    const { setUserData } = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();

        const loginUser = { email, password };

        await axios.post(
            "/api/users/login",
            loginUser
        ).then(res => {
            setUserData({
                token: res.data.token,
                user: res.data.user
            });

            localStorage.setItem("auth-token", res.data.token);

            navigate("/", { replace: true })
        })
        .catch(err => {
            // setError(err.response.data.msg);
            err.response !== undefined ? setError(err.response.data.msg) : setError("Server Error!");
        });
    }

    const toggleVisibility = () => {
        if (visible === 'password') {
            setVisibility('text');
        } else {
            setVisibility('password');
        }
    }

    return (
        <div className="custom-center">
            <div className='wrapper'>
                <div className='form-box login'>
                    <h2>Login</h2>
                    {error && <ErrorNotice message={error} noticeColor="alert-danger" clearError={() => setError(undefined)} />}
                    <form onSubmit={submit}>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="mail"></ion-icon></span>
                            <input type="email"
                                id="login-email"
                                required
                                onChange={(e) => setEmail(e.target.value)} />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                            <input type={visible}
                                id="login-password"
                                minLength="5"
                                required
                                onChange={(e) => setPassword(e.target.value)} />
                            <label>Password</label>
                        </div>
                        <div className="forgot-password">
                            <label>
                                <input type="checkbox"
                                    onClick={toggleVisibility} />
                                Show Password
                            </label>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                        <button type="submit" className="btn">Login</button>
                        <div className="login-register">
                            <p>Don't have an account? <Link to="/register" className="register-link">Register</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;