const express = require('express');
const app=express();
const cookieParser = require("cookie-parser");
const path= require("path");
// const ejs= require("ejs");
const expressSession = require("express-session");
const flash = require("connect-flash");

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");

require("dotenv").config();//it help to use all set terms in .env file to be in use

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
   expressSession({  //a middleware of expresssession is user here cuz flash message use session
      resave: false,    //so to dont save again if not changing
      saveUninitialized: false,  //so to not create session of unloggin person visit 
      secret: process.env.EXPRESS_SESSION_SECRET,
   })
);
app.use(flash()); //so to use flash:to create something on a route then also can redirect to other at same time with message(data)
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");

app.use("/",indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);