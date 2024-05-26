// const sessionIdToUsermap = new Map(); // Add parentheses to initialize the Map
const jwt = require('jsonwebtoken');


const secret = "TESH@123"

function setUser(user) {

    const playload = {
        _id: user._id,
        userName : user.userName
    }
 
    return jwt.sign(playload , secret);
}

function getUser(token) {

    if( !token ){
        return null
    }

    return jwt.verify(token, secret);
    // const user = sessionIdToUsermap.get(id); // Retrieve the user from the map
    // console.log(user);
    // return user; // Ensure the function returns the user
}

module.exports = { setUser, getUser };
