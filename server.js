require('dotenv').config();
const path = require('path');

/* 
    Below 2 lines
    Creates an Express application. 
    The express() function is a top-level function exported by the express module.
*/
const express = require('express');
const app = express();
/* 
    Now app variable has the object express now.
    The app object conventionally denotes the Express application. 
    Create it by calling the top-level express() function exported by the Express module.

    The app object has methods for

    1.   Routing HTTP requests; see for example, app.METHOD and app.param.
    2.   Configuring middleware; see app.route.
    3.   Rendering HTML views; see app.render.
    4.   Registering a template engine; see app.engine.
*/


/*  
    This line of code comes real later when we have to render the download page.
    Template Engine:
    app.set(name, value)
    Assigns setting name to value.
*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Views'));



// Running this server on a port
// Creating a port first
const PORT = process.env.PORT || 8000; // Will check if our env variable has the port, if not then take the port 3000


app.use(express.json());
// This line of code tells express to parse json data as file format.

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

/*  

    Now, we have to make API's i.e. endpoints so that the frontEnd can call the API and send the request and data to our server.
    
    1. Making upload file endpoint. --> This will be a post request because use is sending data to the server which he wants to share.

    Installed post man to check the api response.

    This is a POST request and we gave the url and now we selected from-data.
    Key is taken as 'myfile' and file is selected. Then select the file you want to upload in the value input.

    And click send to test the response.

    You have to now, make the route just like which you passed in the post url in Postman for checking http response on that link.
    There is no such route, thus it throws a 404 error because such route isn't there in the server.
*/

/* 
    Routes-->

    This thing is done at the time of requesting api.
    
    Here we will be creating routes and then mount them to express-router in the routes folder.

    Thus, api/files is the desired url and then we are requiring it to send this url to ./Routes/files.
    Go to files.js and inside the post request now change the url to / only.

    Anything added beyond / will be interpreted like api/files/something.
*/


/* 
    app.engine(ext, callback) -->
    This registers the given template engine callback as ext.
    By default, Express will require() the engine based on the file extension.
*/

app.use('/api/files', require('./Routes/files'));
app.use('/files',require('./Routes/show'));
// Route for starting the download --> After this we have to make download.js file in the Routes folder.
app.use('/files/download', require('./Routes/download'));


app.use(express.static('Public'));

/*  
    This is a good way to check for post request directly, by sending response.
    app.post('/', (req, res) =>{
        res.status(200).json({ success: 'True'});
    });
*/

// initRoute(app);


/* 
    app.listen([port[, host[, backlog]]][, callback])   --->
    This Binds and listens for connections on the specified host and port. 
    This method is identical to Node’s http.Server.listen().



    The app returned by express() is in fact a JavaScript Function, 
    designed to be passed to Node’s HTTP servers as a callback to handle requests. 
    This makes it easy to provide both HTTP and HTTPS versions of your app with the same code base, 
    as the app does not inherit from these (it is simply a callback).

    var express = require('express')
    var https = require('https')
    var http = require('http')
    var app = express()

    http.createServer(app).listen(80)
    https.createServer(options, app).listen(443)

*/
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})

/*
    To run the above made server we have to make some changes in the package.json file and make some scripts.
    As we have installed nodemon to carry out any changes that we make and so that we don't have to restart the 
    server again and again everytime a file is changed.
*/