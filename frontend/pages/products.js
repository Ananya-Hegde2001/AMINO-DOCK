import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import ReviewSection from '../components/ReviewSection';
import api from '../utils/api';
import { FALLBACK_PRODUCTS } from '../utils/constants';

const ProductsPage = () => {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await api.get('/products');
        if (Array.isArray(data) && data.length) {
          setProducts(data);
        }
      } catch (error) {
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <Head>
        <title>AMINO DOCK | Products</title>
      </Head>

      <section className="page-section product-orbit-bg relative overflow-hidden pb-7 md:pb-10">
        <div className="grain-overlay pointer-events-none absolute inset-0" />
        <div className="content-shell relative">
          <p className="inline-block rounded-full border border-red-500/35 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-red-600 backdrop-blur dark:bg-black/35">
            Product Command Deck
          </p>
          <h1 className="mt-5 brand-wordmark text-black dark:text-white">
            CLEAN FORMULAS.
            <br />
            <span className="text-red-600">PREMIUM PERFORMANCE.</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Purpose-built proteins and performance supplements designed for transparent labels, quality sourcing, and
            daily consistency.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: `${products.length}+`, label: 'Core products' },
              { value: '100%', label: 'Label transparency' },
              { value: '0', label: 'Amino spiking' },
              { value: '24h', label: 'Dispatch goal' }
            ].map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-red-500/20 bg-white/85 px-4 py-4 backdrop-blur dark:bg-zinc-900/75"
              >
                <p className="brand-wordmark text-3xl text-black dark:text-white">{item.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section pt-0">
        <div className="content-shell">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-600">Shop Range</p>
              <h2 className="mt-2 text-black dark:text-white">
                PICK YOUR
                <span className="text-red-600"> CLEAN STACK</span>
              </h2>
            </div>
            <Link
              href="/custom-stack-builder"
              className="rounded-full border border-red-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-600 hover:bg-red-600 hover:text-white"
            >
              Build Custom Stack
            </Link>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {['Whey Concentrate', 'Whey Isolate', 'Iso Blend', 'Gainer', 'Creatine', 'Omega Support'].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-red-500/25 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-700 dark:bg-zinc-900/75 dark:text-zinc-200"
              >
                {chip}
              </span>
            ))}
          </div>

          <motion.div
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeInOut', type: 'tween' }}
          >
            {products.map((product, idx) => (
              <motion.div
                key={product._id || product.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03, ease: 'easeInOut', type: 'tween' }}
              >
                <ProductCard product={product} />
                {product._id && <ReviewSection productId={product._id} />}
              </motion.div>
            ))}
          </motion.div>

          {loading && <p className="mt-5 text-sm text-[var(--text-muted)]">Refreshing product feed...</p>}
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
