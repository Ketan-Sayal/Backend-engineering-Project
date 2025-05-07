const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Law', 'Arts', 'Other'],
    default: 'Other'
  },
}, {timestamps:true});

module.exports = mongoose.model('Course', courseSchema);