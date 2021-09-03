require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
// const router = require('./routes');

const app = express();

connectDB();
//express json
app.use(express.json({ extended: false }));

app.use('/api/send-otp', require('./routes/send-otp'));
app.use('/api/verify-otp', require('./routes/verify-otp'));

app.get('/', (req, res) => {
    res.send('Doge to the Moon');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));