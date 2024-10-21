const mongoose = require('mongoose');

const verificationHistorySchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
  },
  verifiedOn: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Verified', 'Not Found', 'Error'],
  },
});

module.exports = mongoose.model('VerificationHistory', verificationHistorySchema);