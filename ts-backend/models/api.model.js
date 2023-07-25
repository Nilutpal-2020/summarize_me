const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const apiSchema = new Schema({
    api_key: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Number,
        required: true
    },
    host: {
        type: String
    },
    usageCount: {
        type: Number
    },
}, {
    timestamps: true
});

const userAPI = mongoose.model('userAPI', apiSchema);

module.exports = userAPI;