const express = require('express');

const dotenv = require('dotenv');
const cors = require('cors');

const placesRoutes = require('./src/routes/placesRoutes');

dotenv.config();

const port = process.env.PORT || 5000;

// Create a new Express app
const app = express();

app.use(cors());

//Middleware to parse JSON requests
app.use(express.json());

// Define the user routes
app.use('/api/v1/places', placesRoutes);

// Start the server
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('Received SIGINT. Closing server gracefully...');
    server.close(() => {
      console.log('Server closed. Exiting process.');
      process.exit(0);
    });
  });
  
  // Error handling
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });