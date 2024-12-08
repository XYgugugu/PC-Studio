import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// app.use(express.json());
// app.use(express.static('react/dist'));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, 'dist');
app.use(express.static(staticPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

const port = 8080;

app.listen(port, () => {
    console.log(`Web served on port ${port}`);
});

