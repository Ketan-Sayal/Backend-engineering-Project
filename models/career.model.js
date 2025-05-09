const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
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
    enum: [
        'Technology',
        'Engineering',
        'Healthcare',
        'Finance',
        'Education',
        'Legal',
        'Marketing & Sales',
        'Creative Arts',
        'Government & Public Service',
        'Science & Research',
        'Skilled Trades',
        'Human Resources',
        'Logistics & Supply Chain',
        'Entrepreneurship',
        'Other'
      ],
    default: 'Other'
  },
}, {timestamps:true});

const Career = mongoose.model('Career', careerSchema);
module.exports = Career;