const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://himgirish:oct9831ss@cluster0.54mdp.mongodb.net/infloso_db?retryWrites=true&w=majority&appName=Cluster0', {
    });
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;