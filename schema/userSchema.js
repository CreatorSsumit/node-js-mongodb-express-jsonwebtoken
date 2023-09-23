const { default: mongoose } = require("mongoose");


const userSchema  =  new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    token:String
})


module.exports =  mongoose.model('user',userSchema)