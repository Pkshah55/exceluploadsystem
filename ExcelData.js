const mongoose = require('mongoose');

const excelDataSchema = new mongoose.Schema({
  date: Date,
  name: String,
  number: Number,
  location: String,
  status: {
    type: String,
    enum: ['Pick Call', 'Disconnected', 'Interview Schedule'],
    default: 'Pick Call'
  }
});

module.exports = mongoose.model('ExcelData', excelDataSchema);