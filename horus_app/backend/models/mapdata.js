const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  trap_coordinates: {
    type: [Number],
    required: false
  },
  polygon_coordinates: {
    type: [Number],
    required: false
  },
  starting_point: {
    type: [Number],
    required: false
  }
})

const mapdata = mongoose.model('mapdata', dataSchema);
module.exports = mapdata;