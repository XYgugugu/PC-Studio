// init
const config = require("../../config.json");

const express = require('express');
const app = express();

require('dotenv').config();

const PORT = 5001;

// Middleware
app.set('view engine', 'ejs');

// root
app.get('/', (req, res)=>{
    res.render('login', { clientId: process.env.GOOGLE_CLIENT_ID })
})
// login
app.get('/index', (req, res)=>{
    res.render('index');
})


app.listen(config.frontend.PORT, ()=>{
    console.log(`Server running on port ${config.frontend.PORT}`);
})
