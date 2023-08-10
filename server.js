const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const { sendOrderEmail } = require('./email')

const NODE_ENV = process.env.NODE_ENV || 'production';
let dbUri;

if (NODE_ENV === 'production') {
  dbUri = 'mongodb+srv://szymonkluka:mongodatabase@cluster0.dr5p4rv.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
} else if (NODE_ENV === 'test') {
  dbUri = 'mongodb://localhost:27017/NewWaveDB';
} else {
  dbUri = 'mongodb+srv://szymonkluka:mongodatabase@cluster0.dr5p4rv.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
}

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', err => console.log('Error ' + err));

const server = http.createServer(app);

const io = require('socket.io')(server, { cors: { origin: "*" } });

app.use(helmet())

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.post('/send-email', async (req, res) => {
  try {
    const { email, orderData } = req.body;

    // Send the order email
    await sendOrderEmail(email, orderData);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

io.on('connection', (socket) => {
  console.log('New socket connection');

  socket.on('updateSeats', (updatedSeatsData) => {
    io.emit('updateSeats', updatedSeatsData);
  });

  socket.on('addSeat', (newSeat) => {
    console.log('New seat added:', newSeat);
    // Handle the new seat data as needed
    io.emit('updateSeats', newSeat);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
});

const PORT = process.env.PORT || 8000;

db.once('open', () => {
  console.log('Connected to the database');
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = app;
