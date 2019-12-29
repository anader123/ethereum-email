require('dotenv').config();
const express = require('express');
const cors = require('cors');

// .ENV
const {
    SERVER_PORT
} = process.env;

// Controller Import
const ethCtrl = require('./eth');

const app = express();

// Top Level Middleware
app.use(express.json());
app.use(cors());
ethCtrl.contractEventListener('Increased');

app.get('/api/fire_event', ethCtrl.fireEvent);

app.listen(SERVER_PORT, () => console.log(`Server is runninng on Port ${SERVER_PORT}`));
