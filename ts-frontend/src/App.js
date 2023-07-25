import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';

import Dashboard from './components/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import API from './components/API/API';
import History from './components/History/History';

import Aux from './hoc/Auxiliary/Auxiliary';

import UserContext from './components/Context/UserContext';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  const [ userData, setUserData ] = useState({
    token: undefined,
    user: undefined,
  });

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }

    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "/api/users/tokenIsValid",undefined,
        { 
          headers: {"x-auth-token": token}
        });
      
      if (tokenRes.data) {
        const userRes = await axios.get("/api/users/", 
          {
            headers: {"x-auth-token": token}
          }
        );
        setUserData({
          token,
          user: userRes.data
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{userData, setUserData}}>
        <Aux>
          <header className={scroll ? "nav_header floatingNav":"nav_header"}>
              <Navbar />
          </header>
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" exact element={<Register />} />
              <Route path="/forgot-password" exact element={<ForgotPassword />} />
              <Route element={<PrivateRoute />}>
                <Route path="/api_keys" element={<API />} />
                <Route path="/history" element={<History />} />
              </Route>
          </Routes>
        </Aux>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
