import { useEffect, useState } from 'react';
import api from '../utils/api';

const defaultForm = {
  name: '',
  slug: '',
  description: '',
  category: 'protein',
  price: 0,
  flavours: '',
  sizes: ''
};

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState('');

  const loadProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      setMessage('Unable to load products.');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', {
        ...form,
        flavours: form.flavours ? form.flavours.split(',').map((item) => item.trim()) : [],
        sizes: form.sizes ? form.sizes.split(',').map((item) => item.trim()) : []
      });
      setForm(defaultForm);
      setMessage('Product created.');
      loadProducts();
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Admin access required.');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setMessage('Product deleted.');
      loadProducts();
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Delete failed.');
    }
  };

  const seedCatalog = async () => {
    try {
      await api.post('/products/seed/catalog');
      loadProducts();
      setMessage('Catalog seeded.');
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Seeding failed.');
    }
  };

  return (
    <section className="page-section">
      <div className="content-shell grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-red-500/20 p-5">
          <h1 className="brand-wordmark text-5xl">
            ADMIN <span className="text-red-600">PANEL</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Manage product catalog and seed default products.</p>
          <button className="mt-3 rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-600" type="button" onClick={seedCatalog}>
            Seed Default Catalog
          </button>

          <form className="mt-5 space-y-2" onSubmit={createProduct}>
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Name" required value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Slug" required value={form.slug} onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))} />
            <textarea className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} />
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Category" value={form.category} onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))} />
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Price" type="number" min="0" required value={form.price} onChange={(e) => setForm((s) => ({ ...s, price: Number(e.target.value) }))} />
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Flavours (comma separated)" value={form.flavours} onChange={(e) => setForm((s) => ({ ...s, flavours: e.target.value }))} />
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Sizes (comma separated)" value={form.sizes} onChange={(e) => setForm((s) => ({ ...s, sizes: e.target.value }))} />
            <button className="w-full rounded-full bg-red-600 px-4 py-2 font-semibold text-white" type="submit">
              Create Product
            </button>
          </form>
          {message && <p className="mt-3 text-sm text-[var(--text-muted)]">{message}</p>}
        </div>

        <div className="rounded-2xl border border-red-500/20 p-5">
          <h2 className="text-2xl font-semibold">Catalog</h2>
          <div className="mt-4 space-y-2 max-h-[560px] overflow-y-auto pr-1">
            {products.map((product) => (
              <article key={product._id} className="rounded-xl border border-red-500/20 p-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{product.slug}</p>
                  </div>
                  <button className="rounded-full border border-red-500 px-3 py-1 text-xs font-semibold text-red-600" type="button" onClick={() => deleteProduct(product._id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
