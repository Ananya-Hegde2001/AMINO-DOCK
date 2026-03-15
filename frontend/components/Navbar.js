import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/custom-stack-builder', label: 'Custom Builder' },
  { href: '/combo-deals', label: 'Combos' },
  { href: '/authenticity-check', label: 'Authenticity' },
  { href: '/about-brand', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-red-500/20 bg-white/80 backdrop-blur dark:bg-black/70">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-full.svg" alt="AMINO DOCK" width={170} height={56} priority className="h-9 w-auto" />
        </Link>

        <div className="hidden gap-4 md:flex">
          {links.map((link) => {
            const active = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide ${
                  active ? 'text-red-600' : 'text-gray-700 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-400'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/cart" className="text-sm font-semibold text-black dark:text-white">
            Cart ({items.length})
          </Link>
          {user ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
