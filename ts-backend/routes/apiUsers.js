const router = require("express").Router();
// const fetch = require("node-fetch");

const auth = require("../middleware/auth");
const API = require('../middleware/api_auth');
const User = require('../models/user.model');
const apiUser = require('../models/api.model');
const fetchSummarize = require('../misc/summarize');
const fetchSentiment = require('../misc/sentiment');

require('dotenv').config();

router.post('/register', async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res
            .status(400)
            .json({message: "Fields empty!"});
    }

    const user = await API.createUser(email, req);

    // console.log(user);
    // res.status(201).send({data: user});
    res.status(201).json({
        api_key: user.api_key,
        status: user.status,
        usageCount: user.usageCount,
        limit: process.env.API_MAX
    });
});

router.get('/apiuser', auth, async (req, res) => {
    // console.log(req.headers.origin, req.headers.host, req.user);
    const user = await User.findById(req.user);

    if (user) {
        // console.log(user);

        const user_api = await apiUser.findOne({email: user.email});

        if (user_api) {
            // const sendData = {
            //     api_key: user_api.api_key,
            //     status: user_api.status,
            //     usageCount: user_api.usageCount,
            //     limit: process.env.API_MAX
            // }

            res.status(201).json({
                api_key: user_api.api_key,
                status: user_api.status,
                usageCount: user_api.usageCount,
                limit: process.env.API_MAX
            });
        } 
        // else {
        //     res.status(400).json({msg: "API not created!"})
        // }
    }
});

router.post('/summarize', API.validateKey, async (req, res) => {
    console.log("Summarizer Tool Requested!");
    // console.log(req.body);

    const { summary, ratio } = req.body;

    if (!summary) {
        return res
            .status(400)
            .json({message: "Please provide a valid paragraph!"});
    }

    // console.log(summary, ratio);

    const data = await fetchSummarize(summary, ratio);

    // console.log(data);

    res.status(200).send({
        data
    })
});

router.post("/sentiment", API.validateKey, async (req, res) => {
    console.log("Sentiment Analysis Tool Requested!");

    const { sentence } = req.body;

    if (!sentence) {
        return res
            .status(400)
            .json({message: "Please provide a valid sentence to test the sentiment!"});
    }

    const data = await fetchSentiment(sentence);

    res.status(200).send({
        data
    })
})

module.exports = router;