const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  zoom_coordinates: {
    type: [Number],
    required: false
  }
})

const mapzoom = mongoose.model('mapzoom', dataSchema);
module.exports = mapzoom;