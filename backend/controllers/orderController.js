const Order = require('../models/Order');

const createOrder = async (req, res) => {
  const { items = [], customStack = null, total, shippingAddress } = req.body;

  if (!items.length && !customStack) {
    return res.status(400).json({ message: 'Order requires items or custom stack' });
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    customStack,
    total,
    shippingAddress
  });

  res.status(201).json(order);
};

const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
};

const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.status = req.body.status || order.status;
  await order.save();

  res.json(order);
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
