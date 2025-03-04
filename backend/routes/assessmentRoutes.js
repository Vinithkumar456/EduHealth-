const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

router.post('/quiz', assessmentController.assessment);

module.exports = router;
