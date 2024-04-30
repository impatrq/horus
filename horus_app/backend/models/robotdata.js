const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  robotId: {
    type: Int16Array,
    required: true,
    //ej: robotID: 001 del primer robot
  },
  plagueType: {
    type: String,
    required: true,
    //ej: orugas
  },
  pheromoneTrap: {
    type: Boolean,
    required: true
  },
  imageId: {
    type: Int16Array,
    required: true
    // ej: 00001
  },
  probability: {
    type: Int16Array,
    required: true
    // ej: 76%
  },
  date: {
    type: Date,
    required: true
    // ej: 25/04/2024
  }
}, { timestamps: true });
// la time stamp se incluirá con el resto de info en el log

const robotdata = mongoose.model('robotdata', dataSchema);
module.exports = robotdata;