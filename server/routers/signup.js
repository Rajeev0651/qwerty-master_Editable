const express = require('express');
const router = express.Router();
const user = require('../models/models.users')
const tokener = require('../models/models.tokens')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET_KEY
const createtoken = (id)=>{
    let token = jwt.sign({id:id},secret)
    return token
}
const adddocument = (values,userid,token) => {
    var adduser = new user({ 
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        password:values.password,
        token:token,
        userId:userid
    });
    adduser.save(function (err, userdoc) {
        if (err) return console.error(err);
        console.log("saved to user collection.");
      });
}
const addtoken = (token,userid) => {
    var addtokener = new tokener({
        token,
        userid
    })
    addtokener.save(function (err, tokendoc) {
        if (err) return console.error(err);
        console.log("saved to token collection.");
      });
}
router.post('/signup',(req,res)=>{
    user.find({email:req.body.email},(err,document)=>{
        if(err) console.log(err)
        if(document.length>0){
            res.send({'user' : 'email alreadt exist!'})
        }
        else if(document.length===0){
            const token = createtoken(req.body.email)
            adddocument(req.body,req.body.email,token)
            addtoken(token,req.body.email)
            const response = {
                token,
                'succ' : true
            }
            res.send(response)
        }
    })
})
module.exports = router