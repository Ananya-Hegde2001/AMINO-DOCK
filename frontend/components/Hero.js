import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="page-section relative overflow-hidden">
      <div className="absolute right-[-120px] top-[-80px] h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />
      <div className="content-shell grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.32, ease: 'easeInOut', type: 'tween' }}
        >
          <p className="mb-4 inline-block rounded-full border border-red-500/40 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-red-600">
            Clean Premium Performance
          </p>
          <Image src="/logo-full.svg" alt="AMINO DOCK logo" width={520} height={170} priority className="h-auto w-full max-w-[440px]" />
          <h1 className="brand-wordmark text-6xl leading-none text-black dark:text-white md:text-8xl">
            AMINO <span className="text-red-600">DOCK</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--text-muted)]">
            Made for clean and premium nutrition. Built for athletes who demand transparent labels, zero fillers,
            and complete control over every scoop.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/custom-stack-builder" className="rounded-full bg-red-600 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-premium">
              Build Your Stack
            </Link>
            <Link href="/products" className="rounded-full border border-red-500 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-red-600">
              Shop Now
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.36, delay: 0.08, ease: 'easeInOut', type: 'tween' }}
          className="card-glow rounded-3xl border border-red-500/20 bg-gradient-to-br from-white to-red-50 p-8 shadow-premium dark:from-zinc-900 dark:to-zinc-950"
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-red-600">Brand Philosophy</p>
          <ul className="space-y-3 text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-200">
            <li>100% clean and natural ingredients</li>
            <li>Zero fillers like maltodextrins</li>
            <li>No amino spiking</li>
            <li>Zero added sugar</li>
            <li>Premium quality supplements</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
