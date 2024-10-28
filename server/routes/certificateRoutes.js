const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const certificateController = require('../controllers/certificateController');
const upload = require('../utils/upload');

const router = express.Router();

router.post('/upload', protect, upload.single('file'), certificateController.uploadCertificates);
router.get('/', protect, certificateController.getCertificates);
router.get('/:id', protect, certificateController.getCertificate);
router.get('/:id/download', protect, certificateController.downloadCertificate);
router.delete('/:id', protect, certificateController.deleteCertificate);
router.get('/verification/history', protect, certificateController.getVerificationHistory);

module.exports = router;