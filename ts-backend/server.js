const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true})
    .catch(err => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Connected!");
});

const userRouter = require("./routes/users");
const historyRouter = require("./routes/history");
const apiRouter = require("./routes/apiUsers");

app.use("/api/users", userRouter);
app.use("/api/history", historyRouter);
app.use("/api/ml", apiRouter);

const path = require('path');

app.get('/api/reset-password/:id', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});