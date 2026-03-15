import { BRAND } from '../utils/constants';

const AboutBrandPage = () => {
  return (
    <section className="page-section">
      <div className="content-shell max-w-5xl rounded-3xl border border-red-500/20 bg-white p-8 dark:bg-zinc-900">
        <h1 className="brand-wordmark text-5xl md:text-7xl">
          ABOUT <span className="text-red-600">AMINO DOCK</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--text-muted)]">{BRAND.motto}</p>

        <p className="mt-6 text-sm leading-7 text-[var(--text-muted)]">
          AMINO DOCK was created for athletes and performance enthusiasts who refuse compromise. Our vision is to put
          formulation power in your hands. Choose your sweetener, flavor, and extras to build your own clean stack.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {BRAND.philosophy.map((point) => (
            <article key={point} className="rounded-xl border border-red-500/20 p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-red-600">Philosophy</p>
              <h3 className="mt-2 text-xl font-semibold">{point}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutBrandPage;
