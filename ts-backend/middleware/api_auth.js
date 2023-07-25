// const Users = require('../models/user.model');
const apiUser = require('../models/api.model');
const User = require('../models/user.model');

require('dotenv').config();

const MAX = process.env.API_MAX;

const generateKey = () => {
    return [...Array(30)]
        .map((e) => ((Math.random() * 36) | 0).toString(36))
        .join('');
};

const createUser = async (_email, req) => {
    try {
        const existingUser = await apiUser.findOne({email: _email});
        if (existingUser) {
            const updatedUser = await apiUser.findById(existingUser._id)
                .then(user => {
                    user.api_key = generateKey();
                    user.usageCount = 0;
                    user.status = 1;

                    user.save()
                        .then(() => console.log("API Renewed!"))
                        .catch(err => res.status(400).json(`Error: ${err}`));
                    return user;
                })
            return updatedUser;
        }

        let newUser = new apiUser({
            api_key: generateKey(),
            email: _email,
            status: 1,
            host: req.headers.origin || req.headers.host,
            usageCount: 0,
        });
    
        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        return err;
    }
}

const validateKey = async (req, res, next) => {
    let host = req.headers.origin || req.headers.host;
    // let email = req.body.email;

    let api_key = req.header('x-api-key');
    // console.log(host, api_key)
    let user = await apiUser.findOne({api_key: api_key});

    if (user) {
        let usageIndex = user.usageCount;
        if (user.usageCount >= MAX) {
            user.status = 0;
            user.save()
                .then(() => console.log("API offline"))
                .catch(err => res.status(400).json(`Error: ${err}`));
            
            res.status(429).send({
                error: {
                    code: 429,
                    message: "Max API calls exceeded.",
                },
            });
        } else {
            let newIndex = usageIndex + 1;
            user.usageCount = newIndex;
            user.save()
                .then(() => console.log('API call', user.usageCount))
                .catch(err => res.status(400).json(`Error: ${err}`));
            // await apiUser.findById(api_key)
            //     .then(acc => {
            //         acc.usageCount = newIndex;

            //         acc.save()
            //             .then(() => res.json('API call', acc.usageCount))
            //             .catch(err => res.status(400).json(`Error: ${err}`));
            //     })
            //     .catch(err => res.status(400).json(`Error: ${err}`));
            
            next();
        }
    } else {
        res.status(403).send({error: {
            code: 403,
            message: "You are not allowed!"
        }})
    }
}

module.exports = { createUser, validateKey };