const router = require('express').Router();

const multer = require('multer'); // This is installed to allow the download functionality.

const path = require('path'); // This is an inbuilt module of nodeJS. It has many uses. Here in this we will use this to know the extension name of the file uploaded to the server. 

const File = require('../Models/file');

// const {v4: uuid4 } = require('uuid');

const { v4: uuidv4 } = require('uuid');

/* 

After installing multer we will be creating a disk storage.
This is the basic configuration of multer.

Here we will making a storage object with the help of diskStorage function of multer.

1.  First key of the object is the desitination which is an arrow function that takes req, file and callback as
    3 param and returns a callback function.
    Now, inside the function we will call the callback function -> which takes err as the first param 
    and the second param is the desitination path. 'uploads/'

2.  The second key is filename. This is also a function and takes same things i.e. request, file, cb and in here we have
    to generate a non redundant name for the file to reduce conflicts.

    Thus, we will create a way to uniquely name the file.

*/

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'Uploads/'),
    filename: (req,file,cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        // 234276482643-236589235.jpg  --> This is the generated unique file name

        cb(null, uniqueName);
    }
})
// Disk storage is ready now.

/* 
    There are few more multer config to support the upload.

    First we have to define in the multer what is the storage and what is the 
    limit of the uploaded file.

    Then after the object passed in multer, 
    we have to chain it with single('') which tells
    that a single file upload is supported and inside single(''),
    We define the same field which we defined as the key in the form-data in postman.
    i.e. the key that we are getting from the client itself.
    (As while doing the request from the rest-api-platform that we will require this key field on the server to recieve the file.)

    Or if we are submitting form from the frontEnd then the name attribute that we will define should come here inside single.

    In our case it is myfile.

    And multer config is done now.
*/

let upload = multer({
    storage, // This is same as storage: storage;
    limit: {fileSize: 100*1000000}, // For now we made it 100mb
}).single('myfile');




/* 

    Mounting some methods on this router.

    First one is post method. 
    Here we want to post it to a certain url, 
    First making such routes in the server.js so that we get the desired url.


*/

/* 

    Now, in here the first argument is the url which we need to send data to.
    This has been initialized in the server.js file by the use functionality of express.

    The second parameter is the callback function that take request and response as the parameters.

    -------------------------------------

    1.  First we have to validate the request, i.e. check if there is data or not. Or is the data empty.
    2.  Then we have to store the file that is coming.
        -> Making uploads folder to upload this received file to.
    3.  We have to store the received file to the Database too.
    4.  Finally, we have to send the response back, i.e. the link to download the file.
        -> This link will be of an html page which will open and in there will be the link to download, or just click to download. 

    In order to store the file we will be requiring the multer library. Thus, installing it.
*/


// We could have done it this way, by making a function and called it in app.use directly instead of making another route.

// const initRoute = (app)=>{
//     app.post('/api/files', (req, res)=> {
//         upload(req, res, async (err)=>{

//             /* Validating the request and sending a JSON response in case there is no file attached to the request. */
//             if(!req.file){
//                 return res.json({error: 'All fields are required.'})
//             }
    
//             if(err){
//                 return res.status(500).send({error: err.message})
//             }
    
//             /* 
            
//                 Now if there is no error in uploading then we will create a file object
//                 based on the schema defined in the DB.
            
//             */
//             const file = new File({
//                 filename: req.file.filename,
//                 // uuid: uuid4(),
//                 path: req.file.path,
//                 size: req.file.size
//             });
    
//             const response = await file.save();
//             return res.json({file: `${process.env.APP_BASE_URL}/files/123`});
//             // http://localhost:3000/files/234123shfkljasf-2e1243jlksjf  --> This would be download link and using this the client will be sent to another page where he will get the real file to download.
//         })
//     })
// }



router.post('/', (req, res)=>{
    
    /* 
        To upload the file, first we pass 3 arguments in the upload function.  
        But to store in the DB we would require model. Thus, we created a models folder
        and made a new file file.js

        And then we would import mongoose in it.
        And then will take schema function from the mongoose library,

        and then make a variable fileSchema is created from this schema class.

        We will pass an object inside this schema and this will be the blueprint of how will the document look inside the DB.
        Thus, we have to define the fields that we would need in the DB.
    */
    upload(req, res, async (err)=>{

        /* Validating the request and sending a JSON response in case there is no file attached to the request. */
        if(!req.file){
            return res.json({error: 'All fields are required.'})
        }

        if(err){
            return res.status(500).send({error: err.message})
        }

        /* 
        
            Now if there is no error in uploading then we will create a file object
            based on the schema defined in the DB.
        
        */
        const file = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();
        return res.json({file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
        // http://localhost:3000/files/234123shfkljasf-2e1243jlksjf  --> This would be download link and using this the client will be sent to another page where he will get the real file to download.
    })
});


/* 
    This posted file will now be saved to our localStorage path defined as Uploads and the response
    containing the uuid will be sent back to the client.

    Now, client will click on this address provided to him to open up a new page for him
    From where he can download the file that has been uploaded.

    Thus, we have to develop a whole new download page for the client.
    
    We will start this by creating a new route in the server.js file.

*/

module.exports = router;
//module.exports = initRoute;