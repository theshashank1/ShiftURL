const mongoose = require('mongoose');

//  Mongoose Database Schema
const UrlSchema = new mongoose.Schema({
  originalUrl: {type: String,required: true},
  shortId: {type: String,unique: true,required: true},
  clicks: {type: Number,default: 0}
});

// Mongoose Data Model
const URL = mongoose.model('url', UrlSchema);

// Export the Moongoose Model
module.exports = { URL }