const mongoose = require("mongoose");

const connect = mongoose.connect("mongodb://localhost:27017/login");

//checking the DB is connected or not

connect.then(()=>{
    console.log("DataBase Connected");
})

.catch(()=>{
    console.log("DataBase not Connected");
})


//creating a schema :)

const LoginSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }

});


//collecting part

const Collection = new mongoose.model("users",LoginSchema);

module.exports = Collection;