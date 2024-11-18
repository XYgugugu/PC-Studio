// init
const config = require("../../config.json");
const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.static(__dirname + '/../img'));

require('dotenv').config();

const backend_ip = config.backend.ip;
const backend_port = config.backend.PORT;

// Middleware
app.set('view engine', 'ejs');

// root
app.get('/', (req, res)=>{
    res.render('login', { clientId: process.env.GOOGLE_CLIENT_ID })
})

// Index route
app.get("/index", (req, res) => {
    res.render("index", { page: "home" });
});

// Customize route
app.get("/customize", (req, res) => {
    res.render("index", { page: "customize" });
});

const axios = require('axios');
app.get('/CPU', async (req, res) => {
    try {
        const response = await axios.get(`http://${backend_ip}:${backend_port}/api/data/gallery?component=CPU`);
        const data = response.data.data;
        res.render("index", { page: "CPU", cpus: data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/CPU_Cooler', async (req, res) => {
    try {
        const response = await axios.get(`http://${backend_ip}:${backend_port}/api/data/gallery?component=CPU_Cooler`);
        const data = response.data.data; 
        res.render("index", { page: "CPU_Cooler", coolers: data });
        // res.render('CPU_Cooler', { coolers: data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/Motherboard', async (req, res) => {
    try {
        const response = await axios.get(`http://${backend_ip}:${backend_port}/api/data/gallery?component=Motherboard`);
        const data = response.data.data; 
        res.render("index", { page: "Motherboard", motherboards: data });
        // res.render('Motherboard', { motherboards: data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/PowerSupply', async (req, res) => {
    try {
        const response = await axios.get(`http://${backend_ip}:${backend_port}/api/data/gallery?component=PowerSupply`);
        const data = response.data.data; 
        res.render("index", { page: "PowerSupply", powersupplies: data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/RAM', async (req, res) => {
    try {
        const response = await axios.get(`http://${backend_ip}:${backend_port}/api/data/gallery?component=RAM`);
        const data = response.data.data; 
        res.render("index", { page: "RAM", memories: data });
        // res.render('RAM', { memories: data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/Storage', async (req, res) => {
    try {
        const response = await axios.get(`http://${backend_ip}:${backend_port}/api/data/gallery?component=Storage`);
        const data = response.data.data; 
        res.render("index", { page: "Storage", storages: data });
        // res.render('Storage', { storages: data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/GPU', async (req, res) => {
    try {
        const response = await axios.get(`http://${backend_ip}:${backend_port}/api/data/gallery?component=GPU`);
        const data = response.data.data; 
        // res.render('GPU', { gpus: data });
        res.render("index", { gpus: data, page: 'GPU' });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});



// Add more routes if needed
app.listen(config.frontend.PORT, () => {
    console.log(`Server running on port ${config.frontend.PORT}`);
});
