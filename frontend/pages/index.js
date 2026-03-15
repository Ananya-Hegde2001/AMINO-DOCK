import Head from 'next/head';
import Hero from '../components/Hero';
import ComboDealsSection from '../components/ComboDealsSection';
import AIStackBuilder from '../components/AIStackBuilder';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>AMINO DOCK | Premium Clean Nutrition</title>
      </Head>
      <Hero />

      <section className="page-section pt-0">
        <div className="content-shell grid gap-5 md:grid-cols-3">
          {[
            '100% clean and natural ingredients',
            'Zero fillers like maltodextrins',
            'No amino spiking',
            'Zero added sugar',
            'Premium quality supplements'
          ].map((item) => (
            <article key={item} className="card-glow rounded-xl border border-red-500/20 bg-white p-4 dark:bg-zinc-900">
              <p className="text-sm font-semibold uppercase tracking-wide text-red-600">AMINO DOCK Standard</p>
              <h3 className="mt-2 text-lg font-semibold text-black dark:text-white">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section pt-0">
        <div className="content-shell">
          <AIStackBuilder />
        </div>
      </section>

      <ComboDealsSection />
    </>
  );
};

export default HomePage;
