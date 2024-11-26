const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  robot_id: {
    type: Number,
    required: true,
  },
  plague_type: {
    type: String,
    required: true,
  },
  pheromone_trap: {
    type: Boolean,
    required: true,
  },
  image_id: {
    type: Number,
    required: true,
  },
  probability: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  }
}, { timestamps: true });
// la time stamp se incluirá con el resto de info en el log

const robotdata = mongoose.model('robotdata', dataSchema);
module.exports = robotdata;