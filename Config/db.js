require('dotenv').config(); 
/*  
    This is used to access the env variables. 
    --> To access the env variables inside the .env file you use process.env.variableName 
        Like here for url we used process.env.MONGO_CONNECTION_URL
*/

const mongoose = require('mongoose');


function connectDB(){
    // Data base connection, the same snippet will be used for database connection everytime.
    /* 

    mongoose.connect(url, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true, 
    useFindAndModify: true}); 

    This url is the connection string that will be provided if we create cloud DB.

    Now, this connection will be stored in a variable. So that we can call methods on it later.


    NOTE:   This url will be highly secret, because it will have a username and the password,
            because it can cause breaches once you push it online.

            Thus, we just save this url in our env file. i.e. save it as env variables.
            Every secret information is saved in that file and later we can import it here.
    */

    mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true, 
    useFindAndModify: true});

    const connection = mongoose.connection;

    /* 
        As soon as our DB is connected this callback function inside the connection.once will run.

        i.e. It works exactly as event listeners.
        As soon as the DB is connected, then call this callback.

        In case of any err we will catch the err using catch block.

        And finally we just export this whole module.
    */
    connection.once('open', ()=>{
        console.log('Database connected!')
    }).catch(err=>{
        console.log('Connection failed.')
    })

}


module.exports = connectDB;

/* 

    Now, go to the online cloud DB. Which is mongo in our case.
    And now we have to make a new cluster. 
    --------------------------------------
    Leave the things as default and click create cluster.
    --------------------------------------
    Now, you have to whitelist your ip address.
    You get 3 options, whitelist your current, or add a different IP address manually or allow access from anywhere.

    We are going with whitelist your current IP address.
    ---------------------------------------

    Now we have to create database users.

    And now move to the next step i.e. connecting your application.
    ----------------------------------------

    Now we go to 

    and then we go to create your own data.
    Then create your first DB name and then by default you have to make a collection in mongo DB while you are creating your db.
    ------------------------------------------



    Now our DB is created and now if we have done everything right, we should see
    Database connected in the terminal.
    But this is not done because till now we did all the things inside the DB.js itself and server.js
    knows nothing about the db.

    The entry point for the server is server.js and it knows nothing about db.js so we should import it.





*/