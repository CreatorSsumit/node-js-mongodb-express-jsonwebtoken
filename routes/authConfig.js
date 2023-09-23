const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userSchema = require('../schema/userSchema');

const secretKey = "sumit123";

const loginUser = async (req,res)=>{
    const {username,password}=  await req.body;

    userSchema.findOne({username}).then(exist=>{
        if(!exist){
             res.status(500).json({'error':"User Not exist ! kindly signup"});
        }else{
            bcrypt.compare(password,exist.password).then(result=>{
                if(result){
                    const token = jwt.sign(
                        { username: exist.username, id: exist._id },
                        secretKey,
                        { expiresIn: "30000" }
                      );
                      req.session.user = { username: exist.username, id: exist._id }
                      res.status(200).json({user: exist, token });
                }else{
                    res.json({error:"Password is incorrect"})
                }
            }) 
        }
    })

}


const signUpUser = async (req,res)=>{

    const {username,password,name}=  await req.body;

   
    userSchema.findOne({username}).then(exist=>{

        if(exist){
             res.status(500).json({'error':"User already exist"});
         }else{
              bcrypt.hash(password, 12).then(hashedPassword=>{
                 userSchema.create({
                    username,
                    password:hashedPassword,
                    name
                }).then(e=>{
                    const token = jwt.sign(
                        { username: e.username, id: e._id },
                        secretKey,
                        { expiresIn: "30000" }
                      )
                      req.session.user = { username: e.username, id: e._id }   
                   res.status(200).json({ user:e, token });
                })

             })} })
}

const verifyToken =  (req,res,next)=>{
    
    const token =  req.headers?.authorization?.split(" ")?.[1];

    if(!token){
    res.status(500).json({error:"please provide auth token"})
    }else{
        jwt.verify(token,secretKey,(err,user)=>{
            
            if(user && !err){
                req.session.user =  user;
             next()
            }else{
                res.status(401).json({
                    error:err.message
                 })
                }
        });
        
    }
}

const refreshToken =  (req, res, next) => {
    const user =  req.session.user;
    if (!user) {
      res.status(500).json({ error: "Invalid user id" });
      return;
    }
  
    const token =  jwt.sign(
      { username: user.username, id: user._id },
      secretKey,
      { expiresIn: "30000" }
    );

    if(token){
        res.status(200).json({ user, token });
    }
  
   
  };

module.exports =  {signUpUser,loginUser,verifyToken,refreshToken}