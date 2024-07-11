const express = require('express')
const router = express.Router()

const {
      createBulkPromo,
      getPromo
} = require('../controllers/PromoController')

router.post('/', createBulkPromo)
router.post('/get', getPromo)

module.exports = router