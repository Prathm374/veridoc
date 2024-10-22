const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required']
  },
  studentId: {
    type: String,
    required: [true, 'Student ID is required']
  },
  course: {
    type: String,
    required: [true, 'Course name is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  issueDate: {
    type: Date,
    required: [true, 'Issue date is required']
  },
  certificateNumber: {
    type: String,
    required: [true, 'Certificate number is required'],
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'revoked'],
    default: 'active'
  }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;