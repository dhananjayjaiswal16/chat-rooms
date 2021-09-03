const mongoose = require('mongoose');


const connectDB = () => {

    const db = process.env.DB_URL;

    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const connection = mongoose.connection;

    connection.on('error', console.error.bind(console, 'db connection error'));

    connection.once('open', () => {
        console.log("database connected...");
    })
}

module.exports = connectDB;