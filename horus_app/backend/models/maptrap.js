const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  trap_coordinates: {
    type: [Number],
    required: false
}})

const maptrap = mongoose.model('maptrap', dataSchema);
module.exports = maptrap;