const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const startSchema = new Schema({
    starting_point: {
        type: [Number],
        required: false,
    },
    id: {
        type: Number,
        required: false,
    }
})

const mapdata = mongoose.model('mapstart', startSchema);
module.exports = mapdata;