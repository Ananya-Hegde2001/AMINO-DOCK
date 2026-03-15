const express = require('express');
const {
	verifyByQR,
	verifyByNFC,
	createVerificationTag,
	lookupVerification,
	getDemoCodes
} = require('../controllers/verifyController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/lookup', lookupVerification);
router.get('/demo-codes', getDemoCodes);
router.post('/qr', verifyByQR);
router.post('/nfc', verifyByNFC);
router.post('/tags', protect, admin, createVerificationTag);

module.exports = router;
