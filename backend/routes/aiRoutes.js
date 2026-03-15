const express = require('express');
const { recommendStack } = require('../controllers/aiController');

const router = express.Router();

router.post('/recommend-stack', recommendStack);

module.exports = router;
