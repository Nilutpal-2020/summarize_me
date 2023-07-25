import React, { useState, useEffect, useContext} from 'react';

import UserContext from '../Context/UserContext';

import "./API.css";

function API() {
    const { userData } = useContext(UserContext);
    const [ api, setAPI ] = useState();
    const [ usage, setUsage ] = useState();
    const [ status, setStatus ] = useState();
    const [ limit, setLimit ] = useState();
    const [ copyFeedback, setFeedback ] = useState("Copy to Clipboard!")
    const baseURL = "http://localhost:5000/api/ml";

    // console.log(userData);

    useEffect(() => {
        if (userData.token) {
            const headers = {
                "Content-type": 'application/json',
                "x-auth-token": userData.token
            };
    
            // console.log(headers);

            const getAPI = async() => {
                await fetch(baseURL + '/apiuser', {
                    method: "GET",
                    headers
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setAPI(data.api_key);
                    setUsage(data.usageCount);
                    setStatus(data.status);
                    setLimit(data.limit);
                })
                .catch(err => console.log(err));
            }

            getAPI();
        }
    }, [userData, setAPI]);

    // console.log(api);

    const generateAPIKEY = async (e) => {
        e.preventDefault();

        const email = userData.user.email;

        await fetch(baseURL + '/register', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setAPI(data.api_key);
            setUsage(data.usageCount);
            setStatus(data.status);
            setLimit(data.limit);
        })
        .catch(err => {
            console.log(err);
        })

    }

    const copyFunction = () => {
        navigator.clipboard.writeText(api); 
        
        setFeedback("Done!");
    }

    return (
        <div className='api_container'>
            <h1 className='dash_heading'>
                {/* Under Development! <ion-icon name="alert-circle-outline" style={{color: "red"}}></ion-icon> */}
                API_KEY DASHBOARD
            </h1>
            <div className='api_table_contents'>
                <table className="api_table">
                    <thead>
                        <tr>
                            <th>API Key</th>
                            <th>Status</th>
                            <th>Usage</th>
                            <th>Create key</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {api}
                                {
                                    api ?
                                    <span className='copy_key' onClick={() => copyFunction()}>
                                        <span className="copy_tooltip" id="copy_texts">{copyFeedback}</span>
                                        <ion-icon name="clipboard-outline"></ion-icon>
                                    </span>
                                    :
                                    null
                                }
                            </td>
                            <td>{
                                status ?
                                <ion-icon name="wifi-outline" style={{"color": "green", "fontSize": "1.6em"}}></ion-icon>
                                :
                                <ion-icon name="warning-outline" style={{"color": "red", "fontSize": "1.6em"}}></ion-icon>
                                }</td>
                            <td>{usage} / {limit}</td>
                            <td>
                                <button 
                                    className="btn_api"
                                    onClick={(e) => generateAPIKEY(e)}
                                    >Generate</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default API;