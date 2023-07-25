// import fetch from 'node-fetch';
const fetch = require("cross-fetch");

const fetchSummarize = async (summary, ratio) => {
    let new_summary, new_ratio;

    await fetch('http://127.0.0.1:8000/api/TR/summarize', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            summary,
            ratio
        })
    })
    .then(res => res.json())
    .then(data => {
        new_summary = data.summary,
        new_ratio = data.ratio
    })

    let data = {
        summary: new_summary,
        ratio: new_ratio
    }

    return data;
}

module.exports = fetchSummarize;