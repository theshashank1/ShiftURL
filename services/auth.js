const sessionIdToUsermap = new Map(); // Add parentheses to initialize the Map

function setUser(id, user) {
    sessionIdToUsermap.set(id, user);
}

function getUser(id) {
    const user = sessionIdToUsermap.get(id); // Retrieve the user from the map
    console.log(user);
    return user; // Ensure the function returns the user
}

module.exports = { setUser, getUser };
