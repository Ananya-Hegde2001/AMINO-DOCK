import { useState } from 'react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-arena page-section">
      <div className="content-shell max-w-6xl space-y-6">
        <header className="relative overflow-hidden rounded-[2rem] border border-red-500/25 bg-white/80 p-6 shadow-xl shadow-red-500/5 backdrop-blur sm:p-8 dark:bg-zinc-900/80">
          <div className="pointer-events-none absolute -left-14 top-0 h-40 w-40 rounded-full bg-red-500/15 blur-2xl" />
          <div className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />

          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-red-700 dark:text-red-300">Get In Touch</p>
          <h1 className="brand-wordmark mt-3 text-4xl leading-[0.92] sm:text-6xl">
            CONTACT
            <span className="block text-red-600">TEAM</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[var(--text-muted)] sm:text-base">
            Questions about custom blends, bulk orders, partnerships, or product guidance. Send us a message and we will respond quickly.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">Custom Blend Support</span>
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">Bulk and B2B</span>
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-red-700 dark:text-red-300">Fast Response</span>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[0.68fr_1fr]">
          <aside className="contact-card rounded-[1.6rem] border border-red-500/25 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-700 dark:text-red-300">Support Topics</p>
            <div className="mt-3 grid gap-3 text-sm text-[var(--text-muted)]">
              <p className="rounded-xl border border-red-500/20 bg-white/70 px-3 py-3 dark:bg-black/20">Custom supplement stack guidance</p>
              <p className="rounded-xl border border-red-500/20 bg-white/70 px-3 py-3 dark:bg-black/20">Wholesale and partnership enquiries</p>
              <p className="rounded-xl border border-red-500/20 bg-white/70 px-3 py-3 dark:bg-black/20">Order support and product concerns</p>
            </div>
          </aside>

          <div className="contact-card rounded-[1.6rem] border border-red-500/25 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-red-700 dark:text-red-300">Message Form</p>
            <form className="mt-4 space-y-4" onSubmit={onSubmit}>
              <input
                className="w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
                placeholder="Full name"
                required
              />
              <input
                className="w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
                placeholder="Email"
                required
                type="email"
              />
              <textarea
                className="w-full rounded-xl border border-red-500/20 bg-white/70 px-3 py-2.5 text-sm dark:bg-black/20"
                rows={6}
                placeholder="Message"
                required
              />
              <button
                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:-translate-y-0.5 hover:bg-red-700"
                type="submit"
              >
                Send Message
              </button>
            </form>

            {submitted && (
              <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
                Thanks. Our team will get back to you shortly.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="contact-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
    </section>
  );
};

export default ContactPage;
