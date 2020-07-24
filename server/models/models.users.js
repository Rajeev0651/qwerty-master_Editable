const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
        firstName: { type: String, required: true}, 
        lastName: { type: String, required: true},
        email: {type: String, required: true},
        password: { type: String, required: true},
        token:{ type:String, required:false},
        userId:{type:String, required:true}
    },
    { timestamps: true}
)

const user = mongoose.model('users' , userSchema)

module.exports = user