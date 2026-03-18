import ComboDealsSection from '../components/ComboDealsSection';

const ComboDealsPage = () => {
  return (
    <>
      <section className="combo-arena page-section pb-0">
        <div className="content-shell relative overflow-hidden rounded-[2rem] border border-red-500/25 bg-black px-6 py-10 text-white shadow-2xl shadow-red-500/15 sm:px-8 sm:py-12">
          <div className="combo-noise pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-16 top-12 h-44 w-44 rounded-full bg-red-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-red-300/20 blur-3xl" />

          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-red-200">Curated Performance Bundles</p>
          <h1 className="brand-wordmark mt-3 text-4xl leading-[0.92] sm:text-6xl md:text-7xl">
            SAVE BIG ON
            <span className="block text-red-300">CURATED STACKS</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm uppercase tracking-wide text-red-100 sm:text-base">
            Goal-focused combinations built for muscle gain, strength progression, and elite recovery without filler products.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-red-100 sm:text-xs">
            <span className="rounded-full border border-red-200/40 bg-red-500/20 px-3 py-1.5">Bundle Savings</span>
            <span className="rounded-full border border-red-200/40 bg-red-500/20 px-3 py-1.5">Premium Picks</span>
            <span className="rounded-full border border-red-200/40 bg-red-500/20 px-3 py-1.5">Fast Checkout</span>
          </div>
        </div>
      </section>
      <ComboDealsSection />
    </>
  );
};

export default ComboDealsPage;
