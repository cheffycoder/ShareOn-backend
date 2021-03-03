const express = require('express');
const app = express();

// Now app variable has the object express now.


// Running this server on a port
// Creating a port first
const PORT = process.env.PORT || 3000; // Will check if our env variable has the port, if not then take the port 3000


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}!`);
})

/*
    To run the above made server we have to make some changes in the package.json file and make some scripts.
    As we have installed nodemon to carry out any changes that we make and so that we don't have to restart the server again and again everytime a file is changed.
*/


/* 

    Now we have to connect to database, what are our options?

    1. We can use local mongoDB, or mySQL or SQL-lite

    We would be using cloud based mongoDB.

    Let's see how to use the cloud database and how to set it up
    and use it later on our local machine
    but first we should setup all the things here.

    We can do the DB config in the server file itself but the app that we are creating
    will be requiring the DB connection in multiple files, (like scheduler which will automatically delete files)
    
    Thus, we will make it using module and use it later in muliples files.
    
    Making a folder config and inside it we will make db.js 

*/


const connectDB = require('./Config/db'); // As we have exported a function from the db.js file thus we have it stored inside the variable.
connectDB();

