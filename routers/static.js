const express = require("express");
const staticRouter = express.Router()
const mongoose = require('mongoose')
const { URL } = require('../models/urlModel');


staticRouter.get("/signup", (req, res) => {
    res.render("signup")
  })
  
staticRouter.get("/login", (req, res) => {
    res.render("login")
})

staticRouter.get('/', async (req, res) => {
    try {
        // Fetch all URLs (you might want to fetch URLs specific to a user in a real application)
        const urls = await URL.find();
        res.render('index', { urls });
    } catch (error) {
        res.status(500).send('Error loading the home page.');
    }
});




module.exports = { staticRouter }

