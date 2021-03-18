const router = require('express').Router();
const File = require('../Models/file');


// Colon inidicates that this parameter is dynamic and will be different for each file.
router.get('/:uuid', async (req,res) => {
    try{
        /*
            Here we are fetching the file related to the dynamic uuid request and storing in a variable. Find one means fetch 1 row from the DB.
            Now we use filter as, if there is uuid feild in the DB with uuid = req.params.uuid
            Params is an object that stores all the dynamic parameters.
        */
        const file = await File.findOne({uuid: req.params.uuid});
        if(!file){
            // If no file is found (maybe because of false uuid or link expired) then go to the download page and send that link has been expired.
            return res.render('download', {error: 'Sorry, Link has been expired.'});
        }
        // Else if file is found then download page is rendered again but this time send response.
        return res.render('download',{
            // All these fields are fetched from the DB itself.
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            // This is the original download link clicking on which the file will be downloaded. This will attached to the download button.
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
            // http://localhost:8000/files/download/sdhjslfdk-asdfhaslkdjf  --> This is the demo link, to show how our download link will look like.
        })
    }catch(err){
        /*
            If there is some error than go to render the download page. This is there in the views folder.
            Ejs will search the file in the view folder itself.
            The second parameter is used to send data to the front end. Here we will be sending error.
        */
        return res.render('download', {error: 'Something went wrong.'});
    } 
});

module.exports = router;


/* 

    Some of the errors that we face in this is that we used the template engine to render the download page
    But never imported Ejs.
    Thus, we have to install it and import it in server.js

*/
