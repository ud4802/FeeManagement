const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const excelSchema = new Schema({
  id: { type: String },
  rollno: { type: String },
  name: { type: String },
  // emailcount:{type: String},
  sem: { type: Number },
  year: { type: String },
  status: { type: String, default: "Not Paid" },
  email: { type: String },
  mobileno: { type: String },
  branch: { type: String },
  useremail: {
    type: String
  },
  response: {type : String},
  // response: { typr: String, default: "No Response"},

});




module.exports = mongoose.model('excelData', excelSchema);