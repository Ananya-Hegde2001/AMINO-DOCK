import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="page-section home-orbit-bg relative overflow-hidden pb-12 md:pb-16">
      <div className="grain-overlay pointer-events-none absolute inset-0" />
      <div className="content-shell relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42, ease: 'easeInOut', type: 'tween' }}
        >
          <p className="mb-5 inline-block rounded-full border border-red-500/35 bg-white/85 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-red-600 backdrop-blur dark:bg-black/35">
            Trusted By Serious Athletes
          </p>
          <Image src="/logo-full.svg" alt="AMINO DOCK logo" width={540} height={180} priority className="h-auto w-full max-w-[430px]" />
          <h1 className="mt-6 brand-wordmark text-black dark:text-white">
            CLEAN FUEL.
            <br />
            <span className="text-red-600">ZERO GUESSWORK.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
            Precision-crafted supplements built around clean formulas, transparent labels, and measurable performance.
            No fillers. No amino spiking. No compromises.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['100% clean ingredients', 'No added sugar', 'Lab-grade sourcing'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-red-500/30 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-800 backdrop-blur dark:bg-zinc-900/70 dark:text-zinc-200"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/custom-stack-builder"
              className="rounded-full bg-red-600 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-premium hover:-translate-y-0.5"
            >
              Build Your Stack
            </Link>
            <Link
              href="/products"
              className="rounded-full border border-red-500 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-red-600 hover:bg-red-600 hover:text-white"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.44, delay: 0.12, ease: 'easeInOut', type: 'tween' }}
          className="mesh-panel card-glow relative rounded-3xl border border-red-500/25 bg-gradient-to-br from-white via-red-50 to-zinc-50 p-7 shadow-premium dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 md:p-8"
        >
          <div className="absolute -right-8 -top-8 hidden h-24 w-24 rounded-full border border-red-500/40 bg-white/60 blur-[1px] dark:bg-black/40 md:block" />
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-red-600">Daily Stack Protocol</p>
          <h2 className="text-3xl text-black dark:text-white md:text-4xl">
            PERFORMANCE
            <br />
            COMMAND DECK
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              'Morning: isolate + hydration blend',
              'Pre-workout: focus and endurance support',
              'Recovery: amino + clean carb refeed',
              'Night: micronutrient and anti-inflammatory support'
            ].map((line, idx) => (
              <li key={line} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-200">
                <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-red-600" />
                <span>
                  <span className="mr-1 font-semibold text-red-600">0{idx + 1}.</span>
                  {line}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-7 grid grid-cols-3 gap-3 text-center">
            {[
              { value: '12k+', label: 'Athletes' },
              { value: '4.9', label: 'Avg rating' },
              { value: '0', label: 'Fillers' }
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-red-500/25 bg-white/70 px-3 py-4 dark:bg-black/25">
                <p className="brand-wordmark text-2xl text-black dark:text-white">{stat.value}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
