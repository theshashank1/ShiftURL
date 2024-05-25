const express = require('express')
const mongoose = require('mongoose')
const ShortUniqueId = require('short-unique-id');

const { URL } = require('../models/shiftUrlModel')
const {users} = require('../models/usersModel')

const URLRouter = express.Router()
const uid = new ShortUniqueId({ length: 6 });

const isValidUrl = url => {
    const urlRegex = /^(http|https):\/\/[\w.-]+(?:[:\d]*)?\/?\S*$/;
    return urlRegex.test(url);
  };



URLRouter.post("/shorten", async (req, res) =>{

    const originalURL = req.body.redirectURL;

    if (!isValidUrl(originalURL)) {
        return res.status(400).json({ message: 'It is not a valid URL' });
    }

    console.log(req)

    try{
        
        let newShortId;
        let duplicate = true;

        while (duplicate) {
            newShortId = uid.rnd();
            // Check if the generated short ID already exists in the collection
            const existingUrl = await URL.findOne({ shortUrl: newShortId });
            if (!existingUrl) {
                duplicate = false;
            }
        }
        
        const newShortURL = await URL.create({
            redirectUrl: originalURL,
            shortUrl: newShortId, // Use the generated short ID
            createdTime: Date.now(),
            userName: req.user.userName
        });

        console.log(newShortURL);

        res.redirect('/')

        // res.json({shortId: newShortId})

    }
    catch(error){
        console.log(error)
    }
})

URLRouter.get("/:id", async (req, res) => {
    try{

        const id = req.params.id
        console.log(id)

        if(!id){
            res.status(404).json({message: 'URL is not found'})
        }

        const url = await URL.findOne({ shortUrl: id });
        await URL.updateOne({ shortUrl: id }, { $inc: { clicks: 1 } }); 
        res.redirect(url.redirectUrl)
    }
    catch(error){
        res.status(500).json({ message: 'Internal Server Error: ' + error.message });
    }
}
)



module.exports = {URLRouter}