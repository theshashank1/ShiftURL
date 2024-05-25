const express = require('express')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');


const {users} = require('../models/usersModel')
const {setUser} = require('../services/auth')

const userRouter = express.Router()


userRouter.post("/signup", async (req, res) => {
    
    try{
        const userN = req.body.userName
        const pass = req.body.password
        const mail = req.body.email
        console.log(req.body)

        const user = await users.findOne({userName: userN, password:pass, email:mail})
        if ( user ){
            res.redirect("http://localhost:8080/")
        }

        const newUser = new users({
            userName: userN,
            password: pass,
            email : mail
        })

        await newUser.save()

        res.redirect("/login")
        
    }

    catch( error ){
        res.status(500).json({ "msg": `Internal Server Error`, "error": error})
    }
})

userRouter.post("/login", async (req, res) => {
    try{
        const userN = req.body.userName
        const pass = req.body.password
        

        const user = await users.findOne({userName:userN, password:pass})
        console.log(user);

        if(!user){
            res.redirect("http://localhost:8080/")
        }

        console.log(user);
         
        const sessionId = uuidv4()

        setUser( sessionId, user )
        res.cookie('uid', sessionId)
        res.redirect("/")

    }
    catch(error){
        res.status(500).json({ "msg": `Internal Server Error`, "error": error})
    }
})

module.exports = {userRouter}