const express = require('express')
const router = express.Router()

const {
      sendSMS,
      updateSMS
} = require('../controllers/SMSController')

router.post('/', sendSMS)
router.patch('/', updateSMS)

module.exports = router