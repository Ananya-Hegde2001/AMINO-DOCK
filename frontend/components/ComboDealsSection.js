import { motion } from 'framer-motion';
import { COMBO_DEALS } from '../utils/constants';

const ComboDealsSection = () => {
  return (
    <section className="page-section">
      <div className="content-shell">
        <h2 className="brand-wordmark text-5xl text-black dark:text-white md:text-6xl">
          COMBO <span className="text-red-600">DEALS</span>
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {COMBO_DEALS.map((combo, index) => (
            <motion.article
              key={combo.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08, ease: 'easeInOut', type: 'tween' }}
              className="card-glow rounded-2xl border border-red-500/20 bg-gradient-to-b from-white to-red-50 p-6 dark:from-zinc-900 dark:to-zinc-950"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-red-600">{combo.discount}</p>
              <h3 className="mt-2 text-2xl font-bold">{combo.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[var(--text-muted)]">
                {combo.includes.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <button className="mt-6 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white" type="button">
                Grab Combo
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComboDealsSection;
