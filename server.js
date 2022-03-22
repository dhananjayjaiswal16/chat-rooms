require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

app.use(cookieParser());

app.use(cors({
  credentials: true, //when we send tokens for authorisation 
  origin: ['http://localhost:3000']
}));

connectDB();

app.use('/storage', express.static('storage'));

//express json
app.use(express.json({ limit: '10mb' }));


app.use('/api/send-otp', require('./routes/send-otp'));
app.use('/api/verify-otp', require('./routes/verify-otp'));
app.use('/api/activate', require('./routes/activate'));
app.use('/api/refresh', require('./routes/refresh'));
app.use('/api/logout', require('./routes/logout'));
app.use('/api/rooms', require('./routes/rooms'));


app.get('/', (req, res) => {
  res.send('Doge to the Moon');
})

io.on('connection', (socket) => {
  console.log('new connection', socket);
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));