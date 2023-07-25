import React, {Component} from 'react';
import axios from 'axios';

import './History.css';

class History extends Component {
    state = {
        summaries: [],
        summary: '',
        date: '',
    }

    getHistory = async () => {
        const config = {
            headers: {
                "x-auth-token": localStorage.getItem("auth-token")
            }
        };

        await axios.get('/api/history/', config)
            .then(res => {
                // console.log(res)
                this.setState({
                    summaries: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getHistory();
    }

    deleteHistory = async (id) => {
        // console.log(id)

        if (window.confirm("Are you sure?")) {
            const config = {
                headers: {
                    "x-auth-token": localStorage.getItem('auth-token')
                }
            }

            await axios.delete('/api/history/delete/' + id, config)
                .then(res => {
                    // console.log(res);
                    this.getHistory();
                })
                .catch(err => console.log(err))
        }

    }
    render() {
        // console.log(this.state.summaries[0].summary);
        
        return (
            <div className='history_container'>
                <h1 className='history_heading'>Previous Summaries</h1>
                {
                    !this.state.summaries.length ?
                    <div className='history_notice'>
                        <p>Use the summarizer tool, to get the your saved summaries!</p>
                    </div>
                    :
                    null
                }
                {
                    this.state.summaries.reverse().map((history, index) => {
                        return (
                            <div className="card summary_card" key={index}>
                                <div className='card-header'>
                                    {history.createdAt.slice(0, 10)}
                                    <span className='delete_button'
                                        onClick={() => this.deleteHistory(history._id)}
                                        ><ion-icon name="trash-outline"></ion-icon></span>
                                </div>
                                <div className='card-body'>
                                    <blockquote className='blockquote mb-0'>
                                        <p id={history._id}>{history.summary}</p>
                                        <footer className="blockquote-footer">Sentiment: &nbsp;
                                            <cite title="Source Title">
                                                {history.sentiment <= -1 ?
                                                    <span style={{ color: "red" }}>Negative</span>
                                                    :
                                                    history.sentiment > -1 && history.sentiment < 1 ?
                                                        <span style={{ color: "black" }}>Neutral</span>
                                                        :
                                                        <span style={{ color: "green" }}>Positive</span>
                                                }
                                            </cite>
                                        </footer>
                                    </blockquote>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}



export default History;