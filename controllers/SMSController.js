const SMSModel = require("../models/SMSModel");
const PromoCodeModel = require("../models/PromoCodeModel");

const sendOTP = async (req, res) => {
      const { phone } = req.body

      let userPromoCode = await PromoCodeModel.find({ phone }).sort({ createdAt: -1 }).limit(1)
      const isPromoCodeAvailable = Boolean(userPromoCode)

      if (!isPromoCodeAvailable) {
            res.status(409).json({
                  status: false,
                  message: `No available promo codes`,
            })
      }
}

const sendSMS = async (req, res) => {

      const { phone } = req.body

      let userPromoCode = await PromoCodeModel.find({ phone }).sort({ createdAt: -1 }).limit(1)
      const isPromoCodeAvailable = Boolean(userPromoCode)

      if (!isPromoCodeAvailable) {
            res.status(409).json({
                  status: false,
                  message: `No available promo codes`,
            })
      }

      console.log(userPromoCode,isPromoCodeAvailable);

      const message = `সম্মানিত ক্রেতা, কুপন কোড: ${userPromoCode[0].coupon} *শ/প্র স্বপ্ন`

      const smsUrl = `https://api.mobireach.com.bd/SendTextMessage?Username=shwapno&Password=Shw@pno@dhk2023&From=8801847170370&To=${phone}&Message=${message}`
      const response = await fetch(smsUrl)
      
      const writeToDBData = {
            phone,
            coupon: userPromoCode[0].coupon
      }

      if (response.status === 200) {

            const data = await SMSModel.create(writeToDBData)

            await res.status(200).json({
                  status: true,
                  message: `SMS Sent Successfully`,
                  data
            })
      }
}

const updateSMS = async (req, res) => {
      const { phone, invoice } = req.body

      const smsFilter = {
            phone
      }

      let smsAlreadySent = await SMSModel.findOne(smsFilter)
      const isInvoiceExist = smsAlreadySent?.invoice?.length > 0

      if (isInvoiceExist) {
            res.status(409).json({
                  status: true,
                  message: `Invoice Already saved`,
            })
      }

      smsAlreadySent.invoice = invoice
      smsAlreadySent.updatedAt = new Date()
      smsAlreadySent.status = "invoice updated"
      await smsAlreadySent.save()

      await res.status(200).json({
            status: true,
            message: `Invoice Updated Successfully`,
            data: smsAlreadySent
      })
}

module.exports = {
      sendSMS,
      updateSMS
}