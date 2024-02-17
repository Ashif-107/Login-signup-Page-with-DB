const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const Collection = require("./config.js");

const app = express();

//convert into json
app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');

app.use(express.static("public"));

app.get("/",(req,res) =>{
    res.render("login");
})

app.get("/signup",(req,res) =>{
    res.render("signup");
})



//register user

app.post("/signup",async (req,res)=>{
    const data = {
        email: req.body.email,
        name: req.body.username,
        password: req.body.password,
    }


    //check existing user

    const existingUser = await Collection.findOne({name:data.name});

    if(existingUser){
        res.send("User Already Exists");
    }
    else{

        //hash the password

        const saltrounds = 10;
        const hashpass = await bcrypt.hash(data.password,saltrounds);
        data.password = hashpass;


        const userdata = await Collection.insertMany(data);
        console.log(userdata);
    }

    
})

app.post("/login", async(req,res)=>{
    try{
        const check = await Collection.findOne({name: req.body.username});
        if(!check){
            res.send("Username Cannot find");
        }
        const ispass = await bcrypt.compare(req.body.password, check.password);
        if(ispass){
            res.render("home"); 
        }else{
            res.send("Wrong pasword");
        }
    }
    catch{
        res.send("Wrong Details");
    }
})


const port = 5000;
app.listen(port,()=>{
    console.log(`server runtime on port: ${port}`);
})