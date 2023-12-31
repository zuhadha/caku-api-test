require('dotenv').config() 

const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http'); // Add this line

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
  // Comment out or remove the app.listen() call
  // app.listen(PORT, () => {
  //   console.log("listening for requests");
  // });
});

// Export the app for serverless deployment
module.exports.handler = serverless(app);