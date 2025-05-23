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
  videos:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Video",
    default:[]
  }]
}, {timestamps:true});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;