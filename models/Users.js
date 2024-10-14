const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  about: { type: String },                   
  username: { type: String, required: true },
  loggedIn: { type: Boolean, required: true},                   
});


const User = mongoose.model('User', usersSchema);

module.exports = User;