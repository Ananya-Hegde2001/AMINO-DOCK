const Verification = require('../models/Verification');

const demoTags = [
  {
    productCode: 'AD-PROD-1001',
    qrCode: 'AD-QR-ELITE-WHEY-1001',
    nfcTag: 'AD-NFC-ELITE-WHEY-1001',
    productName: 'Elite Whey Concentrate',
    batchNo: 'BATCH-EWC-2603',
    manufacturedAt: new Date('2026-03-01T00:00:00.000Z'),
    expiresAt: new Date('2028-03-01T00:00:00.000Z'),
    isAuthentic: true
  },
  {
    productCode: 'AD-PROD-1002',
    qrCode: 'AD-QR-CREATINE-1002',
    nfcTag: 'AD-NFC-CREATINE-1002',
    productName: 'Creatine Monohydrate',
    batchNo: 'BATCH-CRM-2603',
    manufacturedAt: new Date('2026-03-02T00:00:00.000Z'),
    expiresAt: new Date('2028-03-02T00:00:00.000Z'),
    isAuthentic: true
  }
];

const ensureDemoVerificationTags = async () => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  for (const tag of demoTags) {
    await Verification.updateOne({ productCode: tag.productCode }, { $setOnInsert: tag }, { upsert: true });
  }
};

const normalizeScannedValue = (value) => {
  if (!value) {
    return '';
  }

  const trimmed = String(value).trim();
  if (!trimmed) {
    return '';
  }

  try {
    const url = new URL(trimmed);
    return (
      url.searchParams.get('code') ||
      url.searchParams.get('qr') ||
      url.searchParams.get('nfc') ||
      url.searchParams.get('value') ||
      trimmed
    ).trim();
  } catch (error) {
    return trimmed;
  }
};

const findVerificationDoc = async (value, method) => {
  const normalized = normalizeScannedValue(value);
  if (!normalized) {
    return null;
  }

  if (method === 'qr') {
    return Verification.findOne({ qrCode: normalized });
  }

  if (method === 'nfc') {
    return Verification.findOne({ nfcTag: normalized });
  }

  return Verification.findOne({
    $or: [{ qrCode: normalized }, { nfcTag: normalized }, { productCode: normalized }]
  });
};

const appendScanAndRespond = async (doc, method, locationHint, res) => {
  if (!doc) {
    return res.status(404).json({ verified: false, message: 'Product not found in authenticity registry' });
  }

  doc.scans.push({ method, locationHint });
  await doc.save();

  return res.json({
    verified: doc.isAuthentic,
    productName: doc.productName,
    productCode: doc.productCode,
    batchNo: doc.batchNo,
    manufacturedAt: doc.manufacturedAt,
    expiresAt: doc.expiresAt,
    scans: doc.scans.length
  });
};

const verifyByQR = async (req, res) => {
  try {
    await ensureDemoVerificationTags();

    const { qrCode, locationHint } = req.body;
    if (!qrCode) {
      return res.status(400).json({ message: 'qrCode is required' });
    }

    const doc = await findVerificationDoc(qrCode, 'qr');
    return appendScanAndRespond(doc, 'qr', locationHint, res);
  } catch (error) {
    return res.status(500).json({ verified: false, message: error.message });
  }
};

const verifyByNFC = async (req, res) => {
  try {
    await ensureDemoVerificationTags();

    const { nfcTag, locationHint } = req.body;
    if (!nfcTag) {
      return res.status(400).json({ message: 'nfcTag is required' });
    }

    const doc = await findVerificationDoc(nfcTag, 'nfc');
    return appendScanAndRespond(doc, 'nfc', locationHint, res);
  } catch (error) {
    return res.status(500).json({ verified: false, message: error.message });
  }
};

const createVerificationTag = async (req, res) => {
  try {
    const created = await Verification.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const lookupVerification = async (req, res) => {
  try {
    await ensureDemoVerificationTags();

    const { value, method, locationHint } = req.query;
    if (!value) {
      return res.status(400).json({ verified: false, message: 'value is required' });
    }

    const selectedMethod = method === 'nfc' ? 'nfc' : method === 'qr' ? 'qr' : 'qr';
    const doc = await findVerificationDoc(value, method || 'any');
    return appendScanAndRespond(doc, selectedMethod, locationHint, res);
  } catch (error) {
    return res.status(500).json({ verified: false, message: error.message });
  }
};

const getDemoCodes = async (req, res) => {
  try {
    await ensureDemoVerificationTags();
    const docs = await Verification.find({ productCode: { $in: demoTags.map((item) => item.productCode) } }).select(
      'productName productCode qrCode nfcTag batchNo'
    );
    res.json({ demo: docs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { verifyByQR, verifyByNFC, createVerificationTag, lookupVerification, getDemoCodes };
