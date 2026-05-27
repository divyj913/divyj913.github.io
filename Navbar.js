const Navbar = () => {
  return (
    <nav className="fixed top-4 left-0 right-0 px-4 md:px-8 lg:px-16 z-50 flex items-center justify-between w-full max-w-7xl mx-auto">
      {/* Left Logo */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center liquid-glass font-heading italic text-3xl text-white select-none">
        a
      </div>

      {/* Center Nav (Desktop Only) */}
      <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full p-1.5">
        {['Home', 'Voyages', 'Worlds', 'Innovation', 'Plan Launch'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(' ', '-')}`}
            className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors"
          >
            {link}
          </a>
        ))}
        <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap hover:bg-white/90 transition-colors">
          Claim a Spot
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>
      </div>

      {/* Right Spacer or Mobile CTA */}
      <div className="flex items-center justify-end">
        <button className="md:hidden bg-white text-black px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1 whitespace-nowrap hover:bg-white/90 transition-colors">
          Claim Spot
        </button>
        <div className="hidden md:block w-12 h-12"></div>
      </div>
    </nav>
  );
};

window.Navbar = Navbar;
