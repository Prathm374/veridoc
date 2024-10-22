const VerificationHistory = require('../models/VerificationHistory');
const Certificate = require('../models/Certificate');

exports.getVerificationHistory = async (req, res) => {
  try {
    const certificates = await Certificate.find({ studentId: req.user.studentId });
    const certificateIds = certificates.map(cert => cert._id);

    const history = await VerificationHistory.find({
      certificateId: { $in: certificateIds }
    }).populate('certificateId');

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};