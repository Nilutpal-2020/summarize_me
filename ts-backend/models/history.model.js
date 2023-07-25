const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const historySchema = new Schema({
    userId: {
        type: String,
        required: true
    }, 
    summary: {
        type: String,
        required: true
    },
    sentiment: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const History = mongoose.model("History", historySchema);

module.exports = History;