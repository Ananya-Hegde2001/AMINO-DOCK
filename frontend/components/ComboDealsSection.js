import { motion } from 'framer-motion';
import { COMBO_DEALS } from '../utils/constants';

const ComboDealsSection = () => {
  return (
    <section className="page-section relative">
      <div className="content-shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-700 dark:text-red-300">Choose Your Goal</p>
            <h2 className="brand-wordmark mt-2 text-4xl text-black dark:text-white sm:text-5xl md:text-6xl">
              COMBO <span className="text-red-600">DEALS</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--text-muted)]">
            Select the stack that matches your training phase. Each bundle is curated to work together and cut cost compared to buying products individually.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {COMBO_DEALS.map((combo, index) => (
            <motion.article
              key={combo.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08, ease: 'easeInOut', type: 'tween' }}
              whileHover={{ y: -8 }}
              className="combo-deal-card card-glow relative overflow-hidden rounded-[1.6rem] border border-red-500/20 bg-gradient-to-b from-white to-red-50/80 p-5 shadow-[0_18px_40px_rgba(211,11,21,0.12)] sm:p-6 dark:from-zinc-900 dark:to-zinc-950"
            >
              <div className="absolute right-4 top-4 rounded-full border border-red-500/25 bg-white/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-red-700 dark:bg-black/30 dark:text-red-300">
                Limited
              </div>

              <p className="inline-block rounded-full border border-red-500/25 bg-red-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-700 dark:text-red-300">
                {combo.discount}
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-tight">{combo.title}</h3>

              <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
                {combo.includes.map((item) => (
                  <li key={item} className="rounded-xl border border-red-500/15 bg-white/70 px-3 py-2 dark:bg-black/20">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Best for focused cycles</p>
                <button
                  className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:-translate-y-0.5 hover:bg-red-700"
                  type="button"
                >
                Grab Combo
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComboDealsSection;
