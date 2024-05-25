const express = require("express");
const router = express.Router()
const shortId = require('short-unique-id');
const mongoose = require('mongoose')
const { URL } = require('../models/urlModel');


const isValidUrl = url => {
    const urlRegex = /^(http|https):\/\/[\w.-]+(?:[:\d]*)?\/?\S*$/;
    return urlRegex.test(url);
  };

const uid = new ShortUniqueId({ length: 6 });
  

// GET Home Page
router.get('/', (req, res) => {
res.send('<h1>SHIFT URL</h1>');
});
  
// Creating a shorten URL
router.post('/shorten', async (req, res) => {
const { originalURL } = req.body;

if (!isValidUrl(originalURL)) {
    return res.status(400).json({ message: 'It is not a valid URL' });
}

try {
    const existingURL = await URL.findOne({ originalUrl: originalURL });

    if (existingURL) {
    return res.json({ shortId: existingURL.shortId });
    }

    const shortId = uid.rnd();
    const newURL = new URL({ originalUrl: originalURL, shortId });
    await newURL.save();

    res.json({ shortId });
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error: ' + error.message });
}
});
  
router.get('/:shortId', async (req, res) => {
const { shortId } = req.params;

try {
    const url = await URL.findOne({ shortId });

    if (url) {
    await URL.updateOne({ shortId }, { $inc: { clicks: 1 } });
    return res.redirect(url.originalUrl);
    }

    res.status(404).json({ message: 'URL not found' });
} catch (error) {
    res.status(500).json({ message: 'Internal Server Error: ' + error.message });
}
});


module.exports = router