const SMSModel = require("../models/SMSModel");
const PromoCodeModel = require("../models/PromoCodeModel");

const sendSMS = async (req, res) => {

      const { phone } = req.body

      let userPromoCode = await PromoCodeModel.find({ phone }).sort({ createdAt: -1 }).limit(1)
      const isPromoCodeAvailable = Boolean(userPromoCode.length)

      if (!isPromoCodeAvailable) {
            await res.status(409).json({
                  status: false,
                  message: `No available promo codes`,
            })
      }
      else {
            const otp = Math.floor(Math.random() * 9000 + 1000);
            const data = await sendOTP(phone, otp, userPromoCode[0]?.coupon)

            await res.status(200).json({
                  status: true,
                  message: `OTP Sent Successfully`,
                  data
            })
      }
}

const sendOTP = async (phone, otp, coupon) => {
      const message = `(স্বপ্ন) আপনার ওটিপি: ${otp}`

      const smsUrl = `https://api.mobireach.com.bd/SendTextMessage?Username=shwapno&Password=Shw@pno@dhk2023&From=8801847170370&To=${phone}&Message=${message}`
      const response = await fetch(smsUrl)

      const writeToDBData = {
            phone,
            otp,
            coupon
      }

      if (response.status === 200) {
            const data = await SMSModel.create(writeToDBData)
            return data;
      }
}

const sendPromo = async (req, res) => {
      const { phone, coupon } = req.body
      const message = `সম্মানিত ক্রেতা, আপনার ইন্সট্যান্ট ডিসকাউন্ট কোড-টি হলো: ${coupon} *শ/প্র স্বপ্ন`

      const smsUrl = `https://api.mobireach.com.bd/SendTextMessage?Username=shwapno&Password=Shw@pno@dhk2023&From=8801847170370&To=${phone}&Message=${message}`
      const response = await fetch(smsUrl)

      if (response.status === 200) {
            await res.status(200).json({
                  status: true,
                  message: `Coupon Code Sent`
            })
      }
}

// const updateSMS = async (req, res) => {
//       const { phone, invoice } = req.body

//       const smsFilter = {
//             phone
//       }

//       let smsAlreadySent = await SMSModel.findOne(smsFilter)
//       const isInvoiceExist = smsAlreadySent?.invoice?.length > 0

//       if (isInvoiceExist) {
//             res.status(409).json({
//                   status: true,
//                   message: `Invoice Already saved`,
//             })
//       }

//       smsAlreadySent.invoice = invoice
//       smsAlreadySent.updatedAt = new Date()
//       smsAlreadySent.status = "invoice updated"
//       await smsAlreadySent.save()

//       await res.status(200).json({
//             status: true,
//             message: `Invoice Updated Successfully`,
//             data: smsAlreadySent
//       })
// }

module.exports = {
      sendSMS,
      sendPromo
      // updateSMS
}