const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'protein' },
    flavours: [{ type: String }],
    sizes: [{ type: String }],
    capsules: { type: Number, default: 0 },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: '' },
    inStock: { type: Boolean, default: true },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
