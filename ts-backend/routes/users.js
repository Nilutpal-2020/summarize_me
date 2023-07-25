const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const nodemailer = require('nodemailer');

const User = require('../models/user.model');

require('dotenv').config();

router.post("/register", async (req, res) => {
    try {
        const { email, password, username } = req.body;
        // console.log(req.body);

        if (!email || !password) 
            return res
                .status(400)
                .json({msg: "Fields empty!"});
        if (password.length < 5) 
            return res
                .status(400)
                .json({msg: "Password needs 5 characters!"});
        const existingUser = await User.findOne({email: email});
        if(existingUser)
            return res
                .status(400)
                .json({msg: "An account with the email already exists!"});
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        const savedUser = await newUser.save();
        res.status(200).json({msg: "Account Successfully Created!"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res
                .status(400)
                .json({msg: "Fields empty!"});
        
        const user = await User.findOne({email: email});
        
        if (!user) 
            return res
                .status(400)
                .json({msg: "No user with the given email!"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) 
            return res
                .status(400)
                .json({msg: "Invalid Password!"});

        const token = jwt.sign({id: user._id}, process.env.JWT_TOKEN);
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        username: user.username,
        email: user.email,
        id: user._id
    });
});

router.post("/update/:id", async (req, res) => {
    const {password, passwordCheck} = req.body;

    if (!password || !passwordCheck)
        return res
            .status(400)
            .json({msg: "Fields Empty!"});

    if (password.length < 5) 
        return res
            .status(400)
            .json({msg: "Password needs 5 characters"});

    if (password !== passwordCheck) 
        return res.status(400).json({msg: "Enter the same password twice!"});

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    await User.findById(req.params.id)
        .then(user => {
            user.password = passwordHash;

            user.save()
                .then(() => res.json('User Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/forgot-password", async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email: email});
        if (!user) 
            return res
                .status(400)
                .json({msg: "No user with the email!"});
        
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: '587',
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            },
            secureConnection: 'false',
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            }
        });

        const uri = 'http://localhost:5000/api/';
        // const token = jwt.sign({id: user._id}, process.env.RESET_KEY, {expiresIn: '30m'});

        const mailDetails = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Password Reset',
            html:  `
                <div>Dear user,</div>
                <div>A password reset for you account was requested</div>
                <div>Follow the link below to change your password</div>
                <p><a href="${uri}reset-password/${user._id}" target="_blank">Click Here</a></p>
            `
        }

        mailTransporter.sendMail(mailDetails, function(err, data) {
            if (err) {
                console.log("Error")
                res.status(400).json({msg: "Something went wrong!"});
            } else {
                console.log("Email sent successfully!");
                res.status(200).json({msg: "Email sent successfully to " + email});
            }
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;