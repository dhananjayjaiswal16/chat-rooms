require('dotenv').config();
const express = require('express');
// const router = require('./routes');

const app = express();

//express json
app.use(express.json({ extended: false }));

app.use('/api/send-otp', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('Doge to the Moon');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));