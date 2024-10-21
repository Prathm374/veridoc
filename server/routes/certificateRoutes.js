const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const verificationHistoryController = require('../controllers/verificationHistoryController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const upload = require('../utils/upload');

router.post('/upload', protect, restrictTo('admin'), upload.single('file'), certificateController.uploadCertificates);
router.get('/:id', certificateController.getCertificate);
router.get('/:id/download', certificateController.downloadCertificate);
router.get('/', protect, restrictTo('admin'), certificateController.getAllCertificates);
router.delete('/:id', protect, restrictTo('admin'), certificateController.deleteCertificate);
router.get('/verification/history', protect, verificationHistoryController.getVerificationHistory);

module.exports = router;