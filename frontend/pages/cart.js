import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { formatINR } from '../utils/currency';

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
    <section className="cart-arena page-section">
      <div className="content-shell space-y-6">
        <header className="relative overflow-hidden rounded-[2rem] border border-red-500/25 bg-white/80 p-6 shadow-xl shadow-red-500/5 backdrop-blur sm:p-8 dark:bg-zinc-900/80">
          <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-red-500/15 blur-2xl" />
          <div className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />

          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-red-700 dark:text-red-300">Checkout Desk</p>
          <h1 className="brand-wordmark mt-3 text-4xl leading-[0.92] sm:text-6xl">
            CART &
            <span className="block text-red-600">CHECKOUT</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">
            Review your stack, confirm shipping details, and complete your order with confidence.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">Secure Checkout</span>
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">Premium Nutrition</span>
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">Fast Processing</span>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="cart-card rounded-[1.6rem] border border-red-500/25 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold sm:text-2xl">Your Cart Items</h2>
              {!!items.length && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-full border border-red-500/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30"
                >
                  Clear Cart
                </button>
              )}
            </div>

            <div className="mt-5 space-y-3">
              {items.length === 0 && (
                <div className="rounded-xl border border-red-500/20 bg-white/70 p-4 text-sm text-[var(--text-muted)] dark:bg-black/20">
                  Your cart is empty.
                </div>
              )}

              {items.map((item, index) => (
                <article key={`${item._id}-${index}`} className="rounded-xl border border-red-500/20 bg-white/70 p-4 dark:bg-black/20">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-700 dark:text-red-300">Item {String(index + 1).padStart(2, '0')}</p>
                      <h3 className="mt-1 text-lg font-semibold">{item.name}</h3>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {item.flavour || 'N/A'} | {item.size || 'N/A'} | Qty: {item.qty}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="brand-wordmark text-3xl leading-none text-red-600">{formatINR(item.price * item.qty)}</p>
                      <button
                        className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-red-500 hover:text-red-700 dark:hover:text-red-300"
                        type="button"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="cart-card rounded-[1.6rem] border border-red-500/25 p-5 sm:p-6">
            <h2 className="text-xl font-semibold">Checkout Summary</h2>
            <div className="mt-3 rounded-xl border border-red-500/20 bg-white/70 p-3 dark:bg-black/20">
              <p className="text-sm text-[var(--text-muted)]">Total</p>
              <p className="brand-wordmark mt-1 text-5xl leading-none text-red-600">{formatINR(total)}</p>
            </div>

            <form className="mt-4 space-y-2.5" onSubmit={checkout}>
              <input
                className="w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
                placeholder="Full name"
                required
                value={shipping.fullName}
                onChange={(e) => setShipping((s) => ({ ...s, fullName: e.target.value }))}
              />
              <input
                className="w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
                placeholder="Phone"
                required
                value={shipping.phone}
                onChange={(e) => setShipping((s) => ({ ...s, phone: e.target.value }))}
              />
              <input
                className="w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
                placeholder="Address line"
                required
                value={shipping.addressLine}
                onChange={(e) => setShipping((s) => ({ ...s, addressLine: e.target.value }))}
              />
              <div className="grid gap-2.5 sm:grid-cols-2">
                <input
                  className="w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
                  placeholder="City"
                  required
                  value={shipping.city}
                  onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))}
                />
                <input
                  className="w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
                  placeholder="State"
                  required
                  value={shipping.state}
                  onChange={(e) => setShipping((s) => ({ ...s, state: e.target.value }))}
                />
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <input
                  className="w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
                  placeholder="Zip code"
                  required
                  value={shipping.zipCode}
                  onChange={(e) => setShipping((s) => ({ ...s, zipCode: e.target.value }))}
                />
                <input
                  className="w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
                  placeholder="Country"
                  required
                  value={shipping.country}
                  onChange={(e) => setShipping((s) => ({ ...s, country: e.target.value }))}
                />
              </div>

              <button className="mt-2 w-full rounded-full bg-red-600 px-4 py-2.5 font-semibold uppercase tracking-[0.12em] text-white hover:-translate-y-0.5 hover:bg-red-700" type="submit">
                Place Order
              </button>
            </form>

            {status && (
              <p
                className={`mt-3 rounded-xl border px-3 py-2 text-sm ${
                  status.toLowerCase().includes('success')
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300'
                }`}
              >
                {status}
              </p>
            )}
          </aside>
        </div>
      </div>
      <div className="cart-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
    </section>
  );
};

export default CartPage;
