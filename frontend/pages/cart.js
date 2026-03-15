import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const CartPage = () => {
  const { items, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth();
  const [status, setStatus] = useState('');
  const [shipping, setShipping] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const checkout = async (e) => {
    e.preventDefault();
    if (!user) {
      setStatus('Please login before checkout.');
      return;
    }

    try {
      await api.post('/orders', {
        items: items.map((item) => ({
          product: item._id,
          name: item.name,
          flavour: item.flavour,
          size: item.size,
          qty: item.qty,
          price: item.price
        })),
        total,
        shippingAddress: shipping
      });
      clearCart();
      setStatus('Order placed successfully.');
    } catch (error) {
      setStatus(error?.response?.data?.message || 'Checkout failed.');
    }
  };

  return (
    <section className="page-section">
      <div className="content-shell grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="brand-wordmark text-5xl md:text-7xl">
            CART & <span className="text-red-600">CHECKOUT</span>
          </h1>
          <div className="mt-6 space-y-3">
            {items.length === 0 && <p className="text-[var(--text-muted)]">Your cart is empty.</p>}
            {items.map((item, index) => (
              <article key={`${item._id}-${index}`} className="rounded-xl border border-red-500/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-[var(--text-muted)]">
                      {item.flavour || 'N/A'} | {item.size || 'N/A'} | Qty: {item.qty}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">${(item.price * item.qty).toFixed(2)}</p>
                    <button className="text-xs text-red-500" type="button" onClick={() => removeFromCart(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-red-500/20 p-5">
          <h2 className="text-xl font-semibold">Checkout Summary</h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Total</p>
          <p className="text-3xl font-bold text-red-600">${total.toFixed(2)}</p>

          <form className="mt-4 space-y-2" onSubmit={checkout}>
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Full name" required value={shipping.fullName} onChange={(e) => setShipping((s) => ({ ...s, fullName: e.target.value }))} />
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Phone" required value={shipping.phone} onChange={(e) => setShipping((s) => ({ ...s, phone: e.target.value }))} />
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Address line" required value={shipping.addressLine} onChange={(e) => setShipping((s) => ({ ...s, addressLine: e.target.value }))} />
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="City" required value={shipping.city} onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))} />
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="State" required value={shipping.state} onChange={(e) => setShipping((s) => ({ ...s, state: e.target.value }))} />
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Zip code" required value={shipping.zipCode} onChange={(e) => setShipping((s) => ({ ...s, zipCode: e.target.value }))} />
            <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Country" required value={shipping.country} onChange={(e) => setShipping((s) => ({ ...s, country: e.target.value }))} />
            <button className="mt-2 w-full rounded-full bg-red-600 px-4 py-2 font-semibold text-white" type="submit">
              Place Order
            </button>
          </form>

          {status && <p className="mt-3 text-sm text-[var(--text-muted)]">{status}</p>}
        </aside>
      </div>
    </section>
  );
};

export default CartPage;
