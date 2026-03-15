import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [flavour, setFlavour] = useState(product.flavours?.[0] || '');
  const [size, setSize] = useState(product.sizes?.[0] || '');

  const handleAdd = () => {
    addToCart({ ...product, flavour, size, qty: 1 });
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.28, ease: 'easeInOut', type: 'tween' }}
      className="card-glow rounded-2xl border border-red-500/20 bg-white p-5 shadow-sm dark:bg-zinc-900"
    >
      <div className="placeholder-visual mb-4" />
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Premium Formula</p>
      <h3 className="text-2xl font-semibold text-black dark:text-white">{product.name}</h3>
      <p className="mt-3 text-sm text-[var(--text-muted)]">{product.description}</p>
      <p className="mt-4 text-xl font-bold text-red-600">${product.price}</p>

      {product.flavours?.length > 0 && (
        <select
          className="mt-4 w-full rounded-lg border border-red-500/25 bg-transparent px-3 py-2"
          value={flavour}
          onChange={(e) => setFlavour(e.target.value)}
        >
          {product.flavours.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}

      {product.sizes?.length > 0 && (
        <select
          className="mt-3 w-full rounded-lg border border-red-500/25 bg-transparent px-3 py-2"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          {product.sizes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}

      {!!product.capsules && (
        <p className="mt-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{product.capsules} capsules per bottle</p>
      )}

      <button
        type="button"
        onClick={handleAdd}
        className="mt-5 w-full rounded-full bg-red-600 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white"
      >
        Add to Cart
      </button>
    </motion.article>
  );
};

export default ProductCard;
