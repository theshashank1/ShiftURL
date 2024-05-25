const express = require('express');

const { URL } = require('./models/shiftUrlModel')
const { connectDB } = require('./db')


const app = express()
connectDB()

app.use(express.urlencoded({extended : false}))

// app.use("/user")





// Connecting to server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`The server is listening at PORT: ${PORT}`);
});
