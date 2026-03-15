import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ReviewSection from '../components/ReviewSection';
import api from '../utils/api';
import { FALLBACK_PRODUCTS } from '../utils/constants';

const ProductsPage = () => {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await api.get('/products');
        if (Array.isArray(data) && data.length) {
          setProducts(data);
        }
      } catch (error) {
        setProducts(FALLBACK_PRODUCTS);
      }
    };

    loadProducts();
  }, []);

  return (
    <section className="page-section">
      <div className="content-shell">
        <h1 className="brand-wordmark text-5xl text-black dark:text-white md:text-7xl">
          ELITE <span className="text-red-600">PRODUCTS</span>
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--text-muted)]">
          Transparent formulas, premium sourcing, and custom-ready supplementation.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <div key={product._id || product.slug}>
              <ProductCard product={product} />
              {product._id && <ReviewSection productId={product._id} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
