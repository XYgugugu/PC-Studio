// init
const config = require("../../config.json");

const express = require('express');
const app = express();

require('dotenv').config();

const PORT = 5000;

// Middleware
app.set('view engine', 'ejs');

// root
app.get('/', (req, res)=>{
    res.render('index');
})
// login
app.get(config.frontend.login, (req, res)=>{
    res.render('login', { clientId: process.env.GOOGLE_CLIENT_ID })
})


app.listen(config.frontend.PORT, ()=>{
    console.log('Server running on port ${config.frontend.PORT}');
})