const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/* 

    Here, we will define 
    The first required field as filename and we have to define type: and required: for each field
    The second required field as path, this will store the path till uploads folder. Showing the path till where the file is stored
    The third field that we will store in DB is the size of the file.
    Fourth field is the uuid, which is
        {


        }
    Fifth field is sender, and this field will have the sender's email if he wants to send this file via email. This would not be mandatory, as one can send via link too.
        
    After this object we pass the second argument to Schema as another object which has timestamps key set to true.
    This is used for fields created at and updated at will be generated because of this.

*/

const fileSchema = new Schema({
    filename: {type: String, required: true},
    path: {type: String, required: true},
    size: {type: Number, required: true},
    uuid: {type: String, required: true},
    sender: {type: String, required: false},
    reciever: {type: String, required: false},
}, {timestamps: true})

/* 

    After the fileSchema definition we have to export this module.

    First we have to generate the model, thus we will use mongoose and create model using model method
    And then in the first param as the model name and second argument will be schema.

    The collection in the db will be Files.

*/

module.exports = mongoose.model('File',fileSchema);