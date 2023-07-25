import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import UserContext from '../Context/UserContext';

function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);
    // const currentUser = localStorage.getItem('auth-token');
    
    const navigate = useNavigate();

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");

        // window.location = "/";
        navigate("/", {replace: true}) 
    };


    return (
        <Aux>
                {/* <Aux>
                    <button className="nav-link btnLogin-popup">Log Out</button> 
                </Aux> */}
                {/* currentUser ? */}
                {
                    userData.user ?
                    <Aux>
                        <span className='auth_container'>
                            {/* <li className="nav-item">
                                <span className="nav-link">Hi, {userData.user.username}</span>
                            </li> */}
                            {/* <li className="nav-item"> */}
                            <span>{userData.user.username}</span>
                            <button className="btnLogin-popup" onClick={logout}>Log Out</button> 
                            {/* </li>  */}
                        </span>
                    </Aux>
                    :
                    <Aux>
                        <span className='auth_container'>
                            <Link to="/register" style={{textDecoration: 'none'}}><button className="btnLogin-popup">Register</button></Link>
                            <Link to="/login" style={{textDecoration: 'none'}}><button className="btnLogin-popup">Login</button></Link>
                        </span>
                    </Aux>
                }
        </Aux>
    );
}

export default AuthOptions;