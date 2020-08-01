const mongoose = require('mongoose')
const Schema = mongoose.Schema
const IndexSchema = new Schema({
    UserID:{type:String,required:true, default: ""},
    DetailsID: {type: String, default: ""},
    TokenID:{type:String, default: ""},
    ContentID:{type:String, default: ""}
    },
    {timestamps:true}
)
const indexing = mongoose.model('indexing',IndexSchema)
module.exports = indexing