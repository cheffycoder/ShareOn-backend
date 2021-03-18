const router = require('express').Router();
const File = require('../Models/file');


/* 
    As we have to download this file,
    Thus, a get request will me made.
*/

router.get('/:uuid', async(req,res)=>{
    // First we have to check if the file is present in the DB or not. Save the result in the file variable.
    const file = await File.findOne({uuid: req.params.uuid});
    if(!file){
        // If file is not present then on this page show this error.
        return res.render('download', {error: 'Uhh ho! Link has been expired.'})
    }


    // Found the file then relative path will be generated.
    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath); // In express to download a file you just have to call download with the fileName.
})


module.exports = router;

/* 
    Now, download is happening and we have handled what to do if file is not there.

    Now, the next step is Sending file via email.

    Thus, now we will make a post request again.
    And we will be making a route to send this file via email.

    This route will be created in the file.js file in the Routes
    Because the route will be same i.e. api/files/ and then will make a new post request with
    /send route inside the files.js file.
*/