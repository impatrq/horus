const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  robot_id: {
    type: Number,
    required: false
  },
  display_id: {
    type: Number,
    required: false
  },
  location: {
    type: [Number],
    required: false
  },
  battery: {
    type: Number,
    required: false
  },
  time_left: {
    type: String,
    required: false
  },
  last_Log: {
    type: String,
    required: false
  }
})

const robotprofiles = mongoose.model('robotprofiles', dataSchema);
module.exports = robotprofiles;