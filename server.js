const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

const app = express();
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Middleware
app.use(express.json());

// Routes go here
app.all('*', (req, res) => {
  res.json({ "everything": "is awesome" });
});

// Connect to the database before listening
connectDB().then(() => {
  // No app.listen() here
});

// Export the app for serverless deployment
module.exports = app;
module.exports.handler = serverless(app);
