const {getUser} = require("../services/auth")

function restrictToUserOnly(req, res, next){
 
    const userUid = req.cookies?.uid;
    console.log("This is userUID From midware auth: ",userUid)

    if(!userUid) res.redirect("/login");
    
    const user = getUser(userUid)
    console.log(user)

    if(!user) res.redirect("/login");

    req.user = user
    console.log(req.user)
    
    next()
}

module.exports = {restrictToUserOnly}