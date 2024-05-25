const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    redirectUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clicks: { type: Number },
    createdTime: { type: Date, default: Date.now },
    userName: { type: String },
});

const URL = mongoose.model('urls', UrlSchema)

module.exports = { URL }