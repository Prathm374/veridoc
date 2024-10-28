const VerificationHistory = require('../models/VerificationHistory');
const Certificate = require('../models/Certificate');

exports.getVerificationHistory = async (req, res) => {
  try {
    let history;
    if (req.user.role === 'admin') {
      history = await VerificationHistory.find().populate('certificateId');
    } else {
      const certificates = await Certificate.find({ studentId: req.user.studentId });
      const certificateIds = certificates.map(cert => cert._id);
      history = await VerificationHistory.find({
        certificateId: { $in: certificateIds }
      }).populate('certificateId');
    }

    console.log('Fetched verification history:', history); // Add this line for debugging

    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching verification history:', error); // Add this line for debugging
    res.status(500).json({ message: error.message });
  }
};