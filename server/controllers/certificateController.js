const Certificate = require('../models/Certificate');
const VerificationHistory = require('../models/VerificationHistory');
const { parseExcel, saveCertificates } = require('../utils/excelParser');
const { generatePDF } = require('../utils/pdfGenerator');

// Update the uploadCertificates function
exports.uploadCertificates = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const certificates = parseExcel(req.file);
    await saveCertificates(certificates);

    res.status(200).json({ message: 'Certificates uploaded successfully' });
  } catch (error) {
    console.error('Error uploading certificates:', error);
    res.status(500).json({ message: 'Error uploading certificates: ' + error.message });
  }
};

// Update the getCertificate function
exports.getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ 
      $or: [
        { _id: req.params.id },
        { certificateNumber: req.params.id }
      ]
    });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    await VerificationHistory.create({
      certificateId: certificate._id,
      verifiedBy: req.ip
    });

    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ 
      _id: req.params.id,
      studentId: req.user.studentId
    });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    await VerificationHistory.create({
      certificateId: certificate._id,
      verifiedBy: req.ip
    });

    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ 
      _id: req.params.id,
      studentId: req.user.studentId
    });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const pdfBuffer = await generatePDF(certificate);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${certificate.certificateNumber}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

// Add this function to the existing controller
exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOneAndDelete({ 
      _id: req.params.id,
      studentId: req.user.studentId 
    });

    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found or you do not have permission to delete it' });
    }

    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};