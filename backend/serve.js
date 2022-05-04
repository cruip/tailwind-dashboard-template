const express = require("express");
const db = require('./config/database.js');
const tipeperawatanRoutes = require('./routes/index.js');
const cors = require('cors');
const app = express();

var corsOption = {
    origin: "http://localhost:3000"
};


async function start(){
    try {
        await db.authenticate();
        console.log('Database connected...');
    } catch (error) {
        console.error('Connection error:', error)
    }
}

start();

app.use(cors(corsOption));
app.use(express.json());
app.use('/tipeperawatan', tipeperawatanRoutes);

app.listen(5000, () => console.log("Server running at http://localhost:5000"));