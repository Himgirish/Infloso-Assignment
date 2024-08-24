const mongoose = require('mongoose');
const mongodb = require('../db/mongo_connect')
const bcrypt = require('bcrypt');

// Connect the mongo db instance
mongodb()

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
