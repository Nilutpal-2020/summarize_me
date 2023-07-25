import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

// import Typer from './Typer/Typer';

import './Summarizer.css';

class Summarizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summaries: [],
            paragraph: "",
            summary: "",
            ratio: 0.2,
            sentiment_value: 0,
            userLogin: false,
            word_count: 0,
            sentence_count: 0,
        }
    }

    componentDidMount = async () => {
        // fetch('http://127.0.0.1:8000/api/TR/')
        //     .then(res => res.json())
        //     .then(data => {
        //         this.setState({
        //             summaries: data
        //         })
        //     })
        if (localStorage.getItem('auth-token')) {
            this.setState({
                userLogin: true
            })
        } else {
            this.setState({
                userLogin: false
            })
        }
    }

    startTyper = (data) => {
        const texts = data;
        const speed = 20;
        let count = 0;

        document.getElementById("type_result").innerHTML = " ";

        const type_write = async () => {
            if (count < texts.length) {
                document.getElementById("type_result").innerHTML += texts.charAt(count);
                count += 1
                await setTimeout(type_write, speed);
            }
        }

        if (data.length > 0) {
            type_write();
        }
    }

    summarizeText = async () => {
        if (this.state.paragraph.length > 0) {
            await fetch('http://127.0.0.1:8000/api/TR/summarize', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    summary: this.state.paragraph,
                    ratio: this.state.ratio,
                })
            })
                .then(res => res.json())
                .then(data => {

                    let words = data.summary.split(" ").length;
                    let sentences = data.summary.split(". ").length;
                    this.setState({
                        summaries: data,
                        summary: data.summary,
                        ratio: data.ratio,
                        word_count: words,
                        sentence_count: sentences
                    })
                    // console.log(data);
                    if (this.state.userLogin) {
                        const config = {
                            headers: {
                                "x-auth-token": localStorage.getItem("auth-token")
                            }
                        }

                        const history = {
                            summary: data.summary,
                            sentiment: data.sentiment,
                        }

                        axios.post("/api/history/add", history, config)
                            .then(res => console.log(res.data))
                            .catch(err => console.log(err));
                    }

                    this.startTyper(data.summary);
                }, (err) => {
                    console.log(`Failed! ${err}`)
                })
        }
    }

    changeParagraph = (e) => {
        this.setState({ paragraph: e.target.value })
    }

    changeRatio = (e) => {
        let value = parseFloat(e.target.value) / 100;
        this.setState({ ratio: value })
    }

    showSentiment = async () => {
        // console.log(this.state.summary)
        if (this.state.summary) {
            await fetch('http://127.0.0.1:8000/api/TR/sentiment', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    summary: this.state.summary
                })
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        sentiment_value: data
                    })
                    // console.log(data);
                })
                .catch(err => console.log(err))
        } else {
            alert("No summary to test sentiment!")
        }
    }

    render() {
        return (
            <>
                <h1 className="dash_heading">Summarizer Tool</h1>
                {/* <div className='title_row'>
                    <div className="title_column">
                        <p>Paragraph &#40;s&#41;</p>
                    </div>
                </div> */}
                <div className='container-row'>
                    <div className="ratio_meter">
                        <label htmlFor='ratio_select'>Ratio: </label>
                        <div className="tooltip_sum"><ion-icon name="help-circle-outline"></ion-icon>
                            <span className="tooltiptext_sum">Summary length, in terms of the number of sentences in the paragraph(s).</span>
                        </div>
                        <input type="range"
                            id="ratio_select"
                            className='input_range'
                            min="10"
                            max="100"
                            step="10"
                            defaultValue="20"
                            onChange={this.changeRatio} />
                        <span className='input_range_value'>{this.state.ratio}</span>
                    </div>
                    <div className="title_column">
                        <p>Paragraph &#40;s&#41;</p>
                    </div>
                    <div className="title_column">
                        <div className='summary_title'>
                            <div>
                                <p>Summary</p>
                            </div>
                            <div>
                                <span>{this.state.word_count} Words - </span>
                                <span>{this.state.sentence_count} Sentences</span>
                            </div>
                        </div>
                    </div>
                    <div className='container_column'>
                        <div className='textarea-class'>
                            {/* <label htmlFor='doc_area'>Paragraph(s):</label> */}
                            <textarea
                                className="dash_textarea"
                                placeholder='Enter or paste your text here...'
                                defaultValue={this.state.paragraph}
                                onChange={this.changeParagraph}
                            ></textarea>
                        </div>
                    </div>
                    <div className='container_column'>
                        <div className='textarea-class-result'>
                            {/* <label htmlFor='res_area'>Summary:</label> */}
                            {/* <textarea
                                id="type_result"
                                className="dash_textarea"
                                defaultValue={this.state.summary} disabled></textarea> */}
                            {/* <div id="type_result">{this.state.summary}</div> */}
                            <div id="type_result"></div>
                        </div>
                    </div>
                    <div className="button_column">
                        <div className='custom-btn-content-summary'>
                            <button
                                className='btn_dashboard'
                                type="button"
                                onClick={this.summarizeText}
                            >Summarize</button>
                            <div className="tooltip_sum"><ion-icon name="help-circle-outline"></ion-icon>
                                <span className="tooltiptext_sum">Summarizer reduces paragraphs into a list of key sentences.</span>
                            </div>
                        </div>
                    </div>
                    <div className='button_column'>
                        <div className='custom-btn-content-result'>
                            <div className="sentiment_slider">
                                {this.state.sentiment_value <= -1 ?
                                    <span style={{ color: "red" }}>Negative</span>
                                    :
                                    <span>Negative</span>
                                }
                                {
                                    this.state.sentiment_value > -1 && this.state.sentiment_value < 1 ?
                                        <span style={{ color: "black" }}>Neutral</span>
                                        :
                                        <span>Neutral</span>
                                }

                                {
                                    this.state.sentiment_value >= 1 ?
                                        <span style={{ color: "green" }}>Positive</span>
                                        :
                                        <span>Positive</span>
                                }
                            </div>
                            <div className='sentiment_button'>
                                <div className="tooltip_sum"><ion-icon name="help-circle-outline"></ion-icon>
                                    <span className="tooltiptext_sum">Analyze Sentiment examines the sentiment of the article's summary.</span>
                                </div>
                                <button
                                    className='btn_dashboard'
                                    type="button"
                                    onClick={this.showSentiment}
                                    // disabled={this.state.summary.length > 0 ? "true" : "false"}
                                    >
                                        Analyze Sentiment</button>
                            </div>
                        </div>                        
                    </div>
                </div>
                {
                    this.state.userLogin === false && this.state.summary ?
                    <p className="dash_message"><Link to="/login">Login</Link> to save your result</p>
                    :
                    null
                }
            </>
        )
    }
}

export default Summarizer;