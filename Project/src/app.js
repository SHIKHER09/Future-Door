const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const {MONGOURI}=require("./key");

const port = process.env.PORT || 8000;

mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("successfully connected with database")
})

mongoose.connection.on('error',(err)=>{
    console.log("Not connected with database",err)
})


require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(port,()=>{
    console.log(`server is running at port no ${port} `);
})