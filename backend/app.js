const express = require('express');
const authController = require("./controllers/authController")
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes')
const patientRoutes = require('./routes/patientRoutes')
const recordRoutes = require('./routes/recordRoutes')

dotenv.config({path : './.env'})
const app = express();

app.use(express.json());
app.get('/' , (req , res) => {
    res.send('MediVault Backend is running');
})

app.use('/api/v1/users' , userRoutes)
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/records', recordRoutes);


module.exports = app;