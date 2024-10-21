const Certificate = require('../models/Certificate');
const VerificationHistory = require('../models/VerificationHistory');
const excelParser = require('../utils/excelParser');

exports.uploadCertificates = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const certificates = await excelParser.parseCertificates(req.file.buffer);
    await Certificate.insertMany(certificates);

    res.status(200).json({ message: 'Certificates uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading certificates', error: error.message });
  }
};

exports.getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ id: req.params.id });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // Record the verification attempt
    await VerificationHistory.create({
      certificateId: certificate.id,
      verifiedOn: new Date(),
      status: 'Verified'
    });

    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificate', error: error.message });
  }
};

exports.downloadCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ id: req.params.id });
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    // TODO: Implement actual PDF generation logic here
    const pdfBuffer = Buffer.from('Dummy PDF content');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate_${certificate.id}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading certificate', error: error.message });
  }
};

exports.getAllCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching certificates', error: error.message });
  }
};

exports.deleteCertificate = async (req, res) => {
  try {
    const result = await Certificate.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting certificate', error: error.message });
  }
};