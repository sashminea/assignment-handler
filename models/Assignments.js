const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  name: { type: String, required: true },    // assignmentNameInput.value
  price: { type: Number, required: true },   // assignmentPaymentInput.value
  cover: { type: String },                   // coverPicURL
  user: { type: String },                    // username
  cardID: { type: String },                  // initialCardID
  date: { type: String },                    // currentDate (as a string)
  desc: { type: String },                    // assignmentDescription.value
  pfp: { type: String },                     // userPfpURL
  tag: { type: String }                      // currentTag
});


const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;