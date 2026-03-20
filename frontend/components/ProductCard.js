import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currency';

const ProductCard = ({ product, className = '' }) => {
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
      className={`spotlight-card card-glow rounded-2xl border border-red-500/20 bg-gradient-to-b from-white to-red-50 p-5 shadow-[0_12px_35px_rgba(211,11,21,0.1)] dark:from-zinc-900 dark:to-zinc-950 ${className}`}
    >
      <div className="product-visual mb-4 flex items-end justify-between rounded-2xl border border-red-500/20 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Premium Formula</p>
        <p className="rounded-full border border-red-500/25 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-700 dark:bg-black/25 dark:text-zinc-200">
          Clean label
        </p>
      </div>

      <h3 className="text-2xl font-semibold text-black dark:text-white">{product.name}</h3>
      <p className="mt-3 text-sm text-[var(--text-muted)]">{product.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-red-500/25 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-700 dark:bg-black/20 dark:text-zinc-200">
          {product.flavours?.length ? `${product.flavours.length} flavours` : 'Single formula'}
        </span>
        <span className="rounded-full border border-red-500/25 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-700 dark:bg-black/20 dark:text-zinc-200">
          {product.sizes?.length ? `${product.sizes.length} sizes` : 'Ready to use'}
        </span>
      </div>

      <p className="mt-4 brand-wordmark text-4xl leading-none text-red-600">{formatINR(product.price)}</p>

      {product.flavours?.length > 0 && (
        <select
          className="mt-4 w-full rounded-lg border border-red-500/25 bg-white/70 px-3 py-2 text-sm dark:bg-black/25"
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
          className="mt-3 w-full rounded-lg border border-red-500/25 bg-white/70 px-3 py-2 text-sm dark:bg-black/25"
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
        className="mt-5 w-full rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-red-700"
      >
        Add to Cart
      </button>
    </motion.article>
  );
};

export default ProductCard;
