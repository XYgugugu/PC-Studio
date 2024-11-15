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

const authRoutes = require('./routes/authRoutes');
app.use('/api/oauth2', authRoutes);

const PORT = config.backend.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});