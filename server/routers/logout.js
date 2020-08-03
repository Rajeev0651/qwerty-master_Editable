const router = require('express').Router()
const user = require('../models/models.users')
const token = require('../models/models.tokens')

router.get('/logout',(req,res) => {
    res.set('Access-Control-Allow-Origin' , "https://localhost:3000")
    res.set('Access-Control-Allow-Credentials', 'true')
    console.log(req.cookies)
    token.deleteOne({token:req.cookies.token},(err,document) =>{
        if(err) console.log(err)
        else console.log('deleted frzom token collection')
    })
    user.updateOne({token:req.cookies.token},{token:""},(err,log) => {
        if(err) console.log(err)
        else console.log(log)
    })
    res.send({'msg':'hello'})
})

module.exports = router