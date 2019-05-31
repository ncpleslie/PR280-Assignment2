const express = require('express')

const controller = require('../controllers/main')
const router = express.Router()

// Root directory
router.get('/', controller.getCalcualtions)
router.post('/', controller.postCalculations)

module.exports = router
