import ComboDealsSection from '../components/ComboDealsSection';

const ComboDealsPage = () => {
  return (
    <>
      <section className="page-section pb-0">
        <div className="content-shell rounded-3xl border border-red-500/20 bg-gradient-to-r from-black to-red-900 px-6 py-12 text-white">
          <h1 className="brand-wordmark text-5xl md:text-7xl">
            SAVE BIG ON <span className="text-red-300">CURATED STACKS</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm uppercase tracking-wide text-red-100">
            Goal-focused bundles designed for muscle gain, strength progression, and elite recovery.
          </p>
        </div>
      </section>
      <ComboDealsSection />
    </>
  );
};

export default ComboDealsPage;
