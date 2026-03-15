const Product = require('../models/Product');
const seedProducts = require('../utils/seedProducts');

const getProducts = async (req, res) => {
  const query = {};

  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
  }

  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
};

const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
};

const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'Product deleted' });
};

const seedCatalog = async (req, res) => {
  const count = await Product.countDocuments();
  if (count > 0) {
    return res.status(400).json({ message: 'Catalog already seeded' });
  }

  const products = await Product.insertMany(seedProducts);
  res.status(201).json(products);
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  seedCatalog
};
