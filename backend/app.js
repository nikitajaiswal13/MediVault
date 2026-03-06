const express = require('express');
const cors = require('cors');
const authController = require("./controllers/authController")
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')
const patientRoutes = require('./routes/patientRoutes')
const recordRoutes = require('./routes/recordRoutes')
const contactRoutes = require('./routes/contactRoutes')

dotenv.config({path : './.env'})
const app = express();

app.use(cors());
app.use(express.json());
app.get('/' , (req , res) => {
    res.send('MediVault Backend is running');
})

app.use('/api/v1/users' , userRoutes)
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/records', recordRoutes);
app.use('/api/v1', contactRoutes);
app.use('/uploads', express.static('uploads'));


module.exports = app;