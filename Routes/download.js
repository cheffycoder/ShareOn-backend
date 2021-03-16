const router = require('express').Router();
const File = require('../Models/file');


/* 
    As we have to download this file,
    Thus, a get request will me made.
*/

router.get('/:uuid', async(req,res)=>{
    // First we have to check if the file is present in the DB or not.
    const file = await File.findOne({uuid: req.params.uuid});
    if(!File){
        return res.render('download', {error: 'Link has been expired.'})
    }


    // Found the file then relative path will be generated.
    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath); // In express to download a file you just have to call download with the fileName.
})


module.exports = router;