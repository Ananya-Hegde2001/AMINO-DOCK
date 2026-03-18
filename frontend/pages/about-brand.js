import { BRAND } from '../utils/constants';

const AboutBrandPage = () => {
  return (
    <section className="about-arena page-section">
      <div className="content-shell max-w-6xl space-y-6">
        <header className="relative overflow-hidden rounded-[2rem] border border-red-500/25 bg-white/80 p-6 shadow-xl shadow-red-500/5 backdrop-blur sm:p-8 dark:bg-zinc-900/80">
          <div className="pointer-events-none absolute -left-16 top-0 h-44 w-44 rounded-full bg-red-500/18 blur-3xl" />
          <div className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />

          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-red-700 dark:text-red-300">Brand Philosophy</p>
          <h1 className="brand-wordmark mt-3 text-4xl leading-[0.92] sm:text-6xl">
            ABOUT
            <span className="block text-red-600">{BRAND.name}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">{BRAND.motto}</p>

          <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">Clean Label First</span>
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">No Compromise Formulas</span>
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">Performance Focused</span>
          </div>
        </header>

        <div className="about-card rounded-[1.6rem] border border-red-500/25 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-700 dark:text-red-300">Manifesto</p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)] sm:text-base">
            AMINO DOCK was built for athletes and performance enthusiasts who refuse compromise. Our mission is simple:
            give people complete transparency and formulation control. From flavor and sweetener choices to add-on
            ingredients, every stack should serve your goal without fillers, shortcuts, or hidden blends.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BRAND.philosophy.map((point, index) => (
            <article key={point} className="about-point-card rounded-2xl border border-red-500/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-700 dark:text-red-300">Principle {String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-2xl leading-tight text-black dark:text-white">{point}</h3>
              <p className="mt-3 text-sm text-[var(--text-muted)]">Built to keep your nutrition clean, transparent, and performance-ready.</p>
            </article>
          ))}
        </div>

        <div className="about-card rounded-[1.6rem] border border-red-500/25 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-700 dark:text-red-300">Our Standard</p>
          <div className="mt-3 grid gap-3 text-sm text-[var(--text-muted)] sm:grid-cols-3">
            <p className="rounded-xl border border-red-500/20 bg-white/65 px-3 py-3 dark:bg-black/20">Ingredient quality over hype.</p>
            <p className="rounded-xl border border-red-500/20 bg-white/65 px-3 py-3 dark:bg-black/20">Clarity in every label and serving.</p>
            <p className="rounded-xl border border-red-500/20 bg-white/65 px-3 py-3 dark:bg-black/20">Products designed for real training cycles.</p>
          </div>
        </div>
      </div>
      <div className="about-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
    </section>
  );
};

export default AboutBrandPage;
