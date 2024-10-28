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
  }
}, { timestamps: true });

certificateSchema.pre('save', async function(next) {
  if (!this.certificateNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
    this.certificateNumber = `CERT-${timestamp}-${randomPart}`;
  }
  next();
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;