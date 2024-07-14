const mongoose = require('mongoose');

const smsSchema = new mongoose.Schema({
      phone: {
            type: Number,
            required: true,
            immutable: true
      },
      otp: {
            type: Number,
            required: true,
      },
      coupon: {
            type: String,
            required: true,
            immutable: true
      },
      status: {
            type: String,
            default: 'sms sent'
      }
}, {
      timestamps: true
})

module.exports = mongoose.model("SMS", smsSchema)