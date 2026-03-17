import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ComboDealsSection from '../components/ComboDealsSection';
import AIStackBuilder from '../components/AIStackBuilder';
import { FALLBACK_PRODUCTS } from '../utils/constants';

const revealContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const revealItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeInOut' } }
};

const qualityStats = [
  {
    value: '3rd Party',
    label: 'Batch tested',
    note: 'Every lot is quality-screened before dispatch.',
    accent: 'from-red-50 to-white dark:from-zinc-900 dark:to-zinc-900'
  },
  {
    value: '24h',
    label: 'Dispatch window',
    note: 'Fast order processing with tracked shipping flow.',
    accent: 'from-zinc-50 to-red-50 dark:from-zinc-900 dark:to-zinc-950'
  },
  {
    value: '100%',
    label: 'Label transparency',
    note: 'Clear ingredient panels with no vague blend masking.',
    accent: 'from-white to-red-50 dark:from-zinc-900 dark:to-zinc-900'
  },
  {
    value: '0',
    label: 'Amino spiking',
    note: 'No protein inflation tricks. Formula integrity first.',
    accent: 'from-red-50 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950'
  }
];

const HomePage = () => {
  return (
    <>
      <Head>
        <title>AMINO DOCK | Premium Clean Nutrition</title>
      </Head>
      <Hero />

      <section className="brand-tape border-y border-red-500/30 py-3">
        <div className="brand-tape-track" aria-hidden="true">
          {[...Array(2)].map((_, idx) => (
            <div key={`lane-${idx}`} className="brand-tape-line">
              {[
                'Clean label formulas',
                'No amino spiking',
                'No added sugar',
                'Transparent ingredient panel',
                'Performance-first nutrition',
                'Lab-aware sourcing'
              ].map((item) => (
                <span key={`${idx}-${item}`} className="brand-tape-chip">
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="page-section pt-0">
        <motion.div
          className="content-shell grid gap-4 md:grid-cols-4"
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {qualityStats.map((item, idx) => (
            <motion.article
              key={item.label}
              variants={revealItem}
              className={`group card-glow rounded-2xl border border-red-500/20 bg-gradient-to-br p-5 shadow-[0_12px_35px_rgba(211,11,21,0.08)] hover:-translate-y-1 ${item.accent}`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full border border-red-500/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-600">
                  Quality 0{idx + 1}
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-red-600/85 shadow-[0_0_0_6px_rgba(211,11,21,0.12)]" />
              </div>
              <p className="brand-wordmark text-4xl text-black transition-transform duration-300 group-hover:translate-x-0.5 dark:text-white">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">{item.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{item.note}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="page-section pt-4 md:pt-6">
        <div className="content-shell grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-600">Why Athletes Switch</p>
            <h2 className="mt-3 text-black dark:text-white">
              BUILT FOR PEOPLE
              <br />
              WHO ACTUALLY READ LABELS
            </h2>
            <p className="mt-5 max-w-xl text-base text-[var(--text-muted)] md:text-lg">
              AMINO DOCK is engineered with performance-first ingredients and quality controls that treat your stack
              like a system, not a random scoop collection.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: 'Formula Integrity',
                text: 'Every product is designed to avoid cheap fillers and confusing blend labels.'
              },
              {
                title: 'Purpose-Led Stacks',
                text: 'Choose targeted combinations for growth, recovery, endurance, and focus.'
              },
              {
                title: 'Built-In Guidance',
                text: 'Use the AI stack flow to get practical recommendations based on your training rhythm.'
              }
            ].map((item) => (
              <article
                key={item.title}
                className="card-glow rounded-2xl border border-red-500/20 bg-gradient-to-r from-white to-red-50 p-5 dark:from-zinc-900 dark:to-zinc-950"
              >
                <h3 className="text-2xl text-black dark:text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section pt-0">
        <div className="content-shell">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-600">Flagship Range</p>
              <h2 className="mt-2 text-black dark:text-white">
                YOUR CORE
                <span className="text-red-600"> SUPPLEMENT SYSTEM</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="rounded-full border border-red-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-600 hover:bg-red-600 hover:text-white"
            >
              View All Products
            </Link>
          </div>

          <motion.div
            className="grid gap-4 md:grid-cols-3"
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {FALLBACK_PRODUCTS.slice(0, 3).map((item, idx) => (
              <motion.article
                key={item._id}
                variants={revealItem}
                className="spotlight-card card-glow rounded-2xl border border-red-500/20 bg-white/90 p-5 dark:bg-zinc-900/90"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Flagship 0{idx + 1}</p>
                <h3 className="mt-2 text-2xl text-black dark:text-white">{item.name}</h3>
                <p className="mt-3 text-sm text-[var(--text-muted)]">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="brand-wordmark text-3xl text-black dark:text-white">${item.price}</p>
                  <Link
                    href="/products"
                    className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white"
                  >
                    Explore
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="page-section pt-0">
        <div className="content-shell">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-600">Smart Planning</p>
              <h2 className="mt-2 text-black dark:text-white">
                BUILD A STACK
                <span className="text-red-600"> THAT MATCHES YOUR GOAL</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-[var(--text-muted)]">
              Tell us your goal, body weight, and weekly session frequency. The builder gives a practical stack
              template you can tweak before checkout.
            </p>
          </div>
          <AIStackBuilder />
        </div>
      </section>

      <ComboDealsSection />
    </>
  );
};

export default HomePage;
