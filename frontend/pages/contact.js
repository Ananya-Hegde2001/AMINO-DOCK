import { useState } from 'react';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="page-section">
      <div className="content-shell max-w-3xl rounded-3xl border border-red-500/20 bg-white p-8 dark:bg-zinc-900">
        <h1 className="brand-wordmark text-5xl md:text-7xl">
          CONTACT <span className="text-red-600">TEAM</span>
        </h1>
        <p className="mt-3 text-[var(--text-muted)]">Questions about custom blends, bulk orders, or partnerships.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Full name" required />
          <input className="w-full rounded-lg border border-red-500/20 px-3 py-2" placeholder="Email" required type="email" />
          <textarea className="w-full rounded-lg border border-red-500/20 px-3 py-2" rows={5} placeholder="Message" required />
          <button className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white" type="submit">
            Send Message
          </button>
        </form>

        {submitted && <p className="mt-4 text-sm text-green-600">Thanks. Our team will get back to you shortly.</p>}
      </div>
    </section>
  );
};

export default ContactPage;
