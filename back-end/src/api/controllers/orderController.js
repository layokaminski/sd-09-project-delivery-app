const rescue = require('express-rescue');
const { newOrder } = require('../service/orderServices');

const insertOrderInSale = rescue(async (req, res) => {
  const { userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status } = req.body;
  await newOrder(userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status);

  res.status(201).json({ message: 'inserido', object: req.body });
});

module.exports = { insertOrderInSale };
