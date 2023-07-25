// import fetch from 'node-fetch';
const fetch = require("cross-fetch");

const fetchSentiment = async (sentence) => {
    let likelihood;

    await fetch('http://127.0.0.1:8000/api/TR/sentiment', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            summary: sentence
        })
    })
    .then(res => res.json())
    .then(data => {
        likelihood = data
    })

    return likelihood;
}

module.exports = fetchSentiment;