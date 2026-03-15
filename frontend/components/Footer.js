import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="border-t border-red-500/20 bg-black px-4 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Image src="/logo-full.svg" alt="AMINO DOCK" width={160} height={52} className="h-8 w-auto opacity-90 hover:opacity-100" />
        <p className="text-sm text-gray-300">Made for clean and premium nutrition</p>
        <p className="text-xs uppercase tracking-widest text-gray-400">No fillers. No amino spiking. Zero added sugar.</p>
      </div>
    </footer>
  );
};

export default Footer;
