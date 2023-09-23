const express = require('express');
const userRouter = express.Router();
const userSchema  =  require('../schema/userSchema');

userRouter.get('/getdata',(req,res)=>{

    const {username}= req.session.user

    if(username){
        userSchema.findOne({username}).then(e=>{
            res.status(200).json(e)
            
        })
    }
   
})

module.exports = userRouter;