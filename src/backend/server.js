const config = require('../config.json');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

const corsOptions = {
    origin: `http://localhost:${config.frontend.PORT}`,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

const oauth2 = require('./routes/oauth2');
app.use(config.backend['verify-google-token'].route, oauth2);

const gallery = require('./routes/gallery');
app.use(config.backend['item-gallery'].route, gallery);

const PORT = config.backend.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});