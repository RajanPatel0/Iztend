const express= require('express');
const app=express();

const cookieParser = require("cookie-parser");
const path= require("path");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookie-parser());
app.use(express.static(path.join(__dirname,"public")));
app.set("/", (req,res)=>{
   res.send("Hello");

});

app.listen(3000);