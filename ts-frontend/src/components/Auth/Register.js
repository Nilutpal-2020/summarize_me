import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import ErrorNotice from '../Misc/ErrorNotice';
// import UserContext from '../Context/UserContext';

import './Auth.css';

function Register() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [visible, setVisibility] = useState('password');
    const navigate = useNavigate();

    // const { setUserData } = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();

        const newUser = { username, email, password }
        await axios.post(
            "/api/users/register",
            newUser
        )
        .then(res => {
            console.log(res);
            navigate('/login', { replace: true })
            alert("Account has been created successfully!");
        })
        .catch(err => {
            err.response !== undefined ? setError(err.response.data.msg) : setError("Server Error!");
        })
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
                <div className='form-box register'>
                    <h2>Registration</h2>
                    {error && <ErrorNotice message={error} noticeColor="alert-danger" clearError={() => setError(undefined)} />}
                    <form onSubmit={submit}>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="person"></ion-icon></span>
                            <input type="text"
                                id="reg-username"
                                required
                                onChange={(e) => setUsername(e.target.value)} />
                            <label>Username</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="mail"></ion-icon></span>
                            <input type="email"
                                id="reg-email"
                                required
                                onChange={(e) => setEmail(e.target.value)} />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                            <input type={visible}
                                id="reg-password"
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
                        </div>
                        <button type="submit" className="btn">Register</button>
                        <div className="login-register">
                            <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;