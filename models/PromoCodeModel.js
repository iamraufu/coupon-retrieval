const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
      phone: {
            type: Number,
            default: null,
            immutable: true
      },
      coupon: {
            type: String,
            required: true,
            immutable: true
      },
      status: {
            type: String,
            default: 'unused'
      }
},{
      timestamps: true
})

module.exports = mongoose.model("PromoCode", promoCodeSchema)