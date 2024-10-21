const VerificationHistory = require('../models/VerificationHistory');

exports.getVerificationHistory = async (req, res) => {
  try {
    const history = await VerificationHistory.find().sort({ verifiedOn: -1 }).limit(10);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verification history', error: error.message });
  }
};