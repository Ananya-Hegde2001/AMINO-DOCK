import BuilderStepper from '../components/BuilderStepper';
import AIStackBuilder from '../components/AIStackBuilder';

const CustomStackBuilderPage = () => {
  return (
    <section className="builder-arena page-section">
      <div className="content-shell space-y-8">
        <header className="relative overflow-hidden rounded-[2rem] border border-red-500/25 bg-white/80 p-6 shadow-xl shadow-red-500/5 backdrop-blur sm:p-8 dark:bg-zinc-900/80">
          <div className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-red-500/15 blur-2xl" />
          <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />

          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-red-700 dark:text-red-300">Personalized Nutrition Lab</p>
          <h1 className="brand-wordmark mt-3 text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
            BUILD YOUR
            <span className="block text-red-600">CUSTOM STACK</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">
            Tune every detail from your base formula to AI-guided recommendations. This builder is crafted for fast decisions, clean inputs, and a clearer view of your final stack.
          </p>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <BuilderStepper />
          <AIStackBuilder />
        </div>

        <div className="grid gap-4 rounded-3xl border border-red-500/20 bg-white/70 p-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] sm:grid-cols-3 sm:p-5 dark:bg-zinc-900/70">
          <p>Step by Step Formula Builder</p>
          <p>AI Recommendations in Seconds</p>
          <p>Built for Desktop and Mobile</p>
        </div>
      </div>
      <div className="builder-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="builder-glow pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
    </section>
  );
};

export default CustomStackBuilderPage;
