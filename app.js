const express = require('express');
const mongoose = require('mongoose');
const shortId = require('short-unique-id');
const bodyParser = require('body-parser');

// Local Modules
const { connectDB } = require('./db');
const { URL } = require('./models/urlModel');

const app = express();
const uid = new shortId({ length: 6 });
connectDB();

// Middlewares Used
app.use(bodyParser.json());

const isValidUrl = url => {
  const urlRegex = /^(http|https):\/\/[\w.-]+(?:[:\d]*)?\/?\S*$/;
  return urlRegex.test(url);
};

app.get('/', (req, res) => {
  res.send('<h1>SHIFT URL</h1>');
});

// Creating a shorten URL
app.post('/shorten', async (req, res) => {
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

app.get('/:shortId', async (req, res) => {
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





// Connecting to server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`The server is listening at PORT: ${PORT}`);
});
