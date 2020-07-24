const mongoose = require('mongoose')
const Schema = mongoose.Schema
const tokenSchema = new Schema({
    token:{type:String,required:true},
    userid:{type:String,required:true}
    },
    {timestamps:true}
)
const token = mongoose.model('tokens',tokenSchema)
module.exports = token