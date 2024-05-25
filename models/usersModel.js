const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    password:{ type: String, require:true },
    email:{type: String, require: true, unique: true}
});

const users = mongoose.model('users', userSchema)

module.exports = { users }





    // urls: [{
    //     originalUrl: { type: String, required: true },
    //     shortUrl: { type: String, unique: true, required: true },
    //     clicks: { type: Number, default: 0 },
    //     createdTime: { type: Date, default: Date.now }
    // }]