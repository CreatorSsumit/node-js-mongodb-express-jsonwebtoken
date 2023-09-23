const { default: mongoose } = require("mongoose");

const url = "mongodb+srv://skkushwaha:Madurga98@cluster0.4pwndht.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url).then(e=>{
    console.log('mongo connect')
}).catch(err=>{
    console.warn(err)
})

module.exports = mongoose;
