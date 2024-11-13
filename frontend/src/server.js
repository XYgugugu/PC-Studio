// init
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
app.get('/login', (req, res)=>{
    res.render('login', { clientId: process.env.GOOGLE_CLIENT_ID })
})


app.listen(PORT, ()=>{
    console.log('Server running on port ${port}');
})