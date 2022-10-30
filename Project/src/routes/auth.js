const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const{JWT_SECRET} =require("../key");
const requireLogin = require('../middleware/requireLogin')

router.get("/", (req, res) => {
  res.send("hello");
});


router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  
  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the fields" });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "user already exists with the same email" });
    }
    bcrypt.hash(password,12)
    .then(hashedpassword=>{
      const user = new User({
        email,
        password:hashedpassword,
        name
      })
  
      user
        .save()
        .then((user) => {
          res.json({ message: "saved successfully" });
        })
        .catch((err) => {
          console.log(err);
        })
    })
    
  })
  .catch(err=>{
    console.log(err);
  })

  //    res.json({message:"successfully posted"})
})

router.post('/signin',(req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
   return res.status(422).json({error:"Please provide email or password"})
  }
  User.findOne({email:email})
  .then(savedUser=>{
    if(!savedUser){
    return  res.status(422).json({error:"Invalid Email or password"})
    }
    bcrypt.compare(password,savedUser.password)
    .then(doMatch=>{
      if(doMatch){
        // res.json({message:"successfully signedin"})
        const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
        res.json({token})
      }
      else{
        return  res.status(422).json({error:"Invalid Email or password"})
      }
    })
    .catch(err=>{
      console.log(err)
    })
  })
})


module.exports = router;

//https://app.getpostman.com/join-team?invite_code=0b27f5ea86625e77b353b2ea3649fdb1