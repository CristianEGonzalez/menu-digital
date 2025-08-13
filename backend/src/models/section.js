const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectionSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  }
});

const Section = mongoose.model('Section', sectionSchema);
module.exports = Section;