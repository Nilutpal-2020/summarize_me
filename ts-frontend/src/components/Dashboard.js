import React, {Component} from 'react';

// import Navbar from './Navbar/Navbar';
import Summarizer from './Summarizer/Summarizer';

import uni_logo from '../photos/NEHU_Logo.png';

import './Dashboard.css';

class Dashboard extends Component {
    render() {
        return (
            <div className='dashboard_items'>
                <Summarizer />
                <footer className="dash_footer">
                    <div className='footer_contents'>
                        <div className="footer_texts">
                            <p className='footer_text'>Developed by Nilutpal Buragohain (MCA) | Guided by Dr. Rubul Kumar Bania</p>
                            <p className='footer_text'>Dept. of Computer Applications, NEHU, Tura Campus</p>
                        </div>
                        <img className="university_logo" src={uni_logo} height="50px" alt="NEHU logo"/>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Dashboard;