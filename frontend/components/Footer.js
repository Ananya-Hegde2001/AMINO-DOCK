import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
  Shop: [
    { href: '/products', label: 'All Products' },
    { href: '/combo-deals', label: 'Combo Deals' },
    { href: '/custom-stack-builder', label: 'Custom Stack Builder' }
  ],
  Company: [
    { href: '/about-brand', label: 'About Brand' },
    { href: '/contact', label: 'Contact' },
    { href: '/authenticity-check', label: 'Authenticity Check' }
  ]
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-aurora mt-10 border-t border-red-500/20 text-white md:mt-12">
      <div className="content-shell px-4 py-8 md:py-9">
        <div className="grid gap-7 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-6">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image src="/logo-full.svg" alt="AMINO DOCK" width={160} height={52} className="h-9 w-auto opacity-95 hover:opacity-100" />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-300">
              Built for clean, high-performance nutrition with formulas that prioritize transparent labels and real outcomes.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['No fillers', 'No amino spiking', 'Zero sugar'].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-red-500/35 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-200"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-400">{group}</p>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-zinc-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-7 border-t border-red-500/20 pt-4">
          <div className="flex flex-col gap-2 text-[11px] uppercase tracking-[0.16em] text-zinc-400 md:flex-row md:items-center md:justify-between">
            <p>Copyright {year} AMINO DOCK. All rights reserved.</p>
            <p>Crafted for athletes who read the label first.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
