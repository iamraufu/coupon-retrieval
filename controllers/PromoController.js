const PromoCodeModel = require("../models/PromoCodeModel");

const createBulkPromo = async (req, res) => {
      try {
            const data = req.body
            for (const item of data) {
                  
                  const existingPromoCode = await PromoCodeModel.findOne({
                        phone: item.phone,
                        coupon: item.coupon
                  });

                  if (!existingPromoCode) {
                        await PromoCodeModel.create(item);
                        console.log(`Added: ${item.phone} - ${item.coupon}`);
                  } else {
                        console.log(`Already exists: ${item.phone} - ${item.coupon}`);
                  }
            }
            res.status(201).json({
                  status: true,
                  message: `Promo Code Added Successfully`,
            })
      }
      catch (err) {
            res.status(500).json({
                  status: false,
                  message: err
            })
      }
}

const getPromo = async (req, res) => {
      try {
            const { filter } = req.body
            
            const pageSize = +req.body.query.pageSize || 10;
            const currentPage = +req.body.query.currentPage || 1;
            const sortBy = req.body.query.sortBy || '_id'; // _id or description or code or po or etc.
            const sortOrder = req.body.query.sortOrder || 'desc'; // asc or desc

            const totalItems = await PromoCodeModel.find(filter).countDocuments();
            const items = await PromoCodeModel.find(filter)
                  .skip((pageSize * (currentPage - 1)))
                  .limit(pageSize)
                  .sort({ [sortBy]: sortOrder })
                  .exec()

            const responseObject = {
                  status: true,
                  totalPages: Math.ceil(totalItems / pageSize),
                  totalItems,
                  items
            };

            if (items.length) {
                  return res.status(200).json(responseObject);
            }

            else {
                  return res.status(401).json({
                        status: false,
                        message: "Nothing found",
                        items
                  });
            }
      }
      catch (err) {
            res.status(500).json({
                  status: false,
                  message: `${err}`
            });
      }
}

module.exports = {
      createBulkPromo,
      getPromo
}