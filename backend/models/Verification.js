const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema(
  {
    method: { type: String, enum: ['qr', 'nfc'], required: true },
    scannedAt: { type: Date, default: Date.now },
    locationHint: { type: String, default: '' }
  },
  { _id: false }
);

const verificationSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, unique: true },
    qrCode: { type: String, required: true, unique: true },
    nfcTag: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    batchNo: { type: String, required: true },
    manufacturedAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
    isAuthentic: { type: Boolean, default: true },
    scans: [scanSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Verification', verificationSchema);
