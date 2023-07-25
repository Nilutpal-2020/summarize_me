import React from 'react';

import './About.css';

import sm_logo from '../../photos/summarize_me_logo_black.png';
import sm_video from '../../photos/Summarize_Me_Working_Video.mp4';

function About() {
    return (
        <div className='about_container'>
            <div className='section_one'>
                <h1 className="about_head">About Summarize Me</h1>
                {/* <div className='smlogo_image'></div> */}
                <img className="smlogo_image" src={sm_logo} alt="Summarize Me Logo" />
                <p className='paragraph_one'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>

            <div className='section_two'>
                <div className='two_container'>
                    <video 
                        className="tutorial_video" 
                        controls>
                        <source src={sm_video} type="video/mp4" />
                        Your browser does not support HTML video
                    </video>
                </div>
                <div className='two_container'>
                    <div className="tutorial_text">
                        <h1>How to use?</h1>
                        <p>Please check the video to get help with the summarizer tool. For furthur queries please send a feedback down below.</p>
                    </div>
                </div>
            </div>

            <div className='section_three'>
                <div className='section_three_icons'>
                    <span className='stwo_icons'>
                        <ion-icon name="person-add-outline"></ion-icon>
                    </span>
                    <h4>Users</h4>
                    <h4>0</h4>
                </div>
                <div className='section_three_icons'>
                    <span className='stwo_icons'>
                        <ion-icon name="download-outline"></ion-icon>
                    </span>
                    <h4>API Requests</h4>
                    <h4>0</h4>
                </div>
            </div>

            <div className='section_four'>
                <h3 className='feedback_title'>Feedback!</h3>
                <p className="feedback_p">If you want to ask a question about the tool or simply want to discuss your queries in more details, you can send us a feedback.</p>
                <div className='feedback_form'>
                    <form className='from_handle'>
                        {/* <div className="feedback-email"> */}
                            <input type="email"
                                className='feedback-email'
                                required
                                placeholder='Email Id'/>
                        {/* </div> */}
                        {/* <div className="feedback-note"> */}
                            <textarea id="feedback_msg" 
                                className='feedback-note'
                                rows="5" 
                                placeholder='How can we help you?'
                                required>
                            </textarea>
                        {/* </div> */}
                        <button type="submit" className="feedback-btn">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default About;