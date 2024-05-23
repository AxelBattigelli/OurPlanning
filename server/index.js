const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const whitelist = ['http://localhost:3000', 'http://192.168.1.16:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use(cors(corsOptions));
// app.use(cors()); // Ajouter cette ligne pour autoriser toutes les origines



/*
// Application : My Planning
//
// Endpoint pour obtenir les données JSON
// Endpoint pour modifier les données JSON
*/

// get data
app.get('/myplanning/userCredentials.json', async (req, res) => {
    try {
        const jsonData = await fs.readFile('myplanning/userCredentials.json', 'utf8');
        res.json(JSON.parse(jsonData));
    } catch (error) {
        console.error('Error reading userCredentials.json:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/myplanning/userEvents.json', async (req, res) => {
    try {
        const jsonData = await fs.readFile('myplanning/userEvents.json', 'utf8');
        res.json(JSON.parse(jsonData));
    } catch (error) {
        console.error('Error reading userEvents.json:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// post data
app.post('/myplanning/update-userCredentials', async (req, res) => {
    const newData = req.body;
    try {
        await fs.writeFile('myplanning/userCredentials.json', JSON.stringify(newData, null, 2), 'utf8');
        res.json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error('Error updating userCredentials.json:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/myplanning/update-userEvents', async (req, res) => {
    const newData = req.body;
    try {
        await fs.writeFile('myplanning/userEvents.json', JSON.stringify(newData, null, 2), 'utf8');
        res.json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error('Error updating userEvents.json:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Error handling
app.get('/myplanning/*', async (req, res) => {
    console.error('Error reading / access unknown file');
    res.status(404).json({ error: 'Not found' });
});
app.post('/myplanning/*', async (req, res) => {
    console.error('Error post / access unknown file');
    res.status(404).json({ error: 'Not found' });
});



/*
// Application : My Planning
//
// Endpoint pour obtenir les données JSON
// Endpoint pour modifier les données JSON
*/

// get data
// app.get('/myplanning/userCredentials.json', async (req, res) => {
//     try {
//         const jsonData = await fs.readFile('myplanning/userCredentials.json', 'utf8');
//         res.json(JSON.parse(jsonData));
//     } catch (error) {
//         console.error('Error reading userCredentials.json:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



/*
// Generality
//
// Basic error catch
*/

// Error handling
app.get('/*', async (req, res) => {
    console.error('Error reading / access unknown file');
    res.status(666).json({ error: 'Not found' });
});
app.post('/*', async (req, res) => {
    console.error('Error post / access unknown file');
    res.status(404).json({ error: 'Not found' });
});
// Run server
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});
