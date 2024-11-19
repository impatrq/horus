const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const polygonSchema = new Schema({
  polygon_coordinates: {
    type: [[Number]],
    required: false
  },
  id: {
    type: Number,
  }
})

const mapdata = mongoose.model('mappolygon', polygonSchema);
module.exports = mapdata;