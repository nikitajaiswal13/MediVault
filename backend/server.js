
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB, {})
.then(() => {
    console.log("Connection Done 😁");
    app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });
})
.catch((err) => {
    console.error("Connection Failed :", err);
    process.exit(1);
});