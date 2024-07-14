const express = require('express')
const router = express.Router()

const {
      sendSMS,
      sendPromo
} = require('../controllers/SMSController')

router.post('/', sendSMS)
router.post('/promo', sendPromo)

module.exports = router