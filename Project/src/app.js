const express = require ("express");
const app = express();
const mongoose = require("mongoose");
//const {MONGOURI}=require("./key");
const path = require('path');
const hbs = require("hbs");



const port = process.env.PORT || 8000;

// mongoose.connect(MONGOURI)
// mongoose.connection.on('connected',()=>{
//     console.log("successfully connected with database")
// })

// mongoose.connection.on('error',(err)=>{
//     console.log("Not connected with database",err)
// })
 


// require('./models/user')
// require('./models/post')

//app.use(express.json())
// app.use(require('./routes/auth'))
// app.use(require('./routes/post'))

require("./db/conn");
const Register = require("./models/user");
const{ json } = require("express");

// path
const satic_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','hbs');
app.set('views',template_path);

app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use(express.static(satic_path));

//routing
app.get("/",(req,res) => {
    res.render('home')
});
app.get("/Searchpage",(req,res) => {
    res.render('Searchpage')
});
app.get("/testimonial",(req,res) => {
    res.render('testimonial')
});
app.get("/index_auth",(req,res) => {
    res.render('index_auth')
});
app.get("/Feed",(req,res) => {
    res.render('Feed')
});
app.get("/coming_soon",(req,res) => {
    res.render('coming_soon')
});
app.get("/Developer",(req,res) => {
    res.render('Developer')
});
app.get("/Globalchat",(req,res) => {
    res.render('Globalchat')
});
app.get("/user-account-setting",(req,res) => {
    res.render('user-account-setting')
});
app.get("/user-profile-edit",(req,res) => {
    res.render('user-profile-edit')
});
app.get("/user-profile",(req,res) => {
    res.render('user-profile')
});
app.get("*",(req,res) => {
    res.render('404error',{
        errorMsg:"Opps! Page Not Found"
    })
});
 
app.post("/index_auth" , async (req,res) => {
    try{
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerEmploye = new Register({
                username : req.body.username,
                email : req.body.email,
                password : password,
                confirmpassword : cpassword 
           })
           const resgistered = await registerEmploye.save();
           res.status(201).render("user-profile-edit");

        }else{
           res.send("password are not matching") ;
        }

    } catch(error){
        
        res.status(400).send(error);
    }
})

app.post("/index_auth" , async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

       const useremail = await Register.findOne({email:email});
       
     //  const isMatch = await bcrypt.compare( password,useremail.password );

       if(useremail){
        res.status(201).render("Feed");
       }else{
        res.send("invalid login Details");
       }
        
    }catch(error){
        res.status(400).send("invalid Username");
    }
});

app.listen(port,()=>{
    console.log(`server is running at port no ${port} `);
})