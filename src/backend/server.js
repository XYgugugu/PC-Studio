const config = require('./config.json');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

const corsOptions = {
    origin: (origin, callback) => {
        if (
            origin === undefined || // requests without origin (e.g., Postman)
            /^http:\/\/localhost(:\d+)?$/.test(origin) || // localhost
            /^http:\/\/34\.56\.124\.135(:\d+)?$/.test(origin) // VM ip
        ) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'PUT','DELETE', 'POST'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

const oauth2 = require('./routes/oauth2');
app.use(config.backend['verify-google-token'].route, oauth2);

const gallery = require('./routes/gallery');
app.use(config.backend['item-gallery'].route, gallery);

const userPCs =  require('./routes/userPCs');
app.use(config.backend['user-pc'].route, userPCs);

const adminOP = require('./routes/admin');
app.use(config.backend['admin-modify-price'].route, adminOP);

const keywordSearch = require('./routes/search');
app.use(config.backend['keyword-search'].route, keywordSearch);

const updatePC = require('./routes/updatePC');
app.use(config.backend['update-pc'].route, updatePC);

const recommendPC = require('./routes/recommend');
app.use(config.backend['recommend-pc'].route, recommendPC);

const PORT = config.backend.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Welcome to the PC Studio!\n');
});

console.log('Starting server setup...');
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Backend server is running on port ${PORT}`);
});
