const Hero = () => {
  const motion = window.Motion.motion;
  const FadingVideo = window.FadingVideo;
  const BlurText = window.BlurText;

  const initialAnim = { filter: 'blur(10px)', opacity: 0, y: 20 };
  const animateIn = { filter: 'blur(0px)', opacity: 1, y: 0 };
  const transitionSettings = (delay) => ({
    duration: 0.8,
    ease: 'easeOut',
    delay: delay,
  });

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white z-10 select-none">
      {/* Background Video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0 pointer-events-none"
        style={{ width: '120%', height: '120%' }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center pt-32 px-4 max-w-5xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={initialAnim}
          animate={animateIn}
          transition={transitionSettings(0.4)}
          className="liquid-glass rounded-full p-1 pr-3 flex items-center gap-3 mb-6"
        >
          <span className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider font-body">
            New
          </span>
          <span className="text-sm font-medium text-white/90 font-body">
            Maiden Crewed Voyage to Mars Arrives 2026
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-4">
          <BlurText
            text="Venture Past Our Sky Across the Universe"
            className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl justify-center tracking-[-4px]"
          />
        </div>

        {/* Subheading */}
        <motion.p
          initial={initialAnim}
          animate={animateIn}
          transition={transitionSettings(0.8)}
          className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight text-center"
        >
          Discover the universe in ways once unimaginable. Our pioneering vessels and breakthrough engineering bring deep-space exploration within reach—secure and extraordinary.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={initialAnim}
          animate={animateIn}
          transition={transitionSettings(1.1)}
          className="flex items-center justify-center gap-6 mt-8"
        >
          <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/5 transition-colors cursor-pointer">
            Start Your Voyage
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-white"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
          <a
            href="#liftoff"
            className="text-white text-sm font-medium flex items-center gap-2 hover:text-white/80 transition-colors cursor-pointer"
          >
            View Liftoff
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-white"
            >
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={initialAnim}
          animate={animateIn}
          transition={transitionSettings(1.3)}
          className="flex items-stretch justify-center gap-4 mt-12 flex-wrap md:flex-nowrap"
        >
          {/* Card 1 */}
          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between items-start text-left">
            <div className="mb-8">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <div className="text-4xl font-heading italic text-white tracking-[-1px] leading-none">
                34.5 Min
              </div>
              <div className="text-xs text-white font-body font-light mt-2 opacity-80 leading-snug">
                Average Videos Watch Time
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="liquid-glass p-5 w-[220px] rounded-[1.25rem] flex flex-col justify-between items-start text-left">
            <div className="mb-8">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div>
              <div className="text-4xl font-heading italic text-white tracking-[-1px] leading-none">
                2.8B+
              </div>
              <div className="text-xs text-white font-body font-light mt-2 opacity-80 leading-snug">
                Users Across the Globe
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Partners Row */}
      <motion.div
        initial={initialAnim}
        animate={animateIn}
        transition={transitionSettings(1.4)}
        className="relative z-10 flex flex-col items-center gap-4 pb-12 mt-12 w-full px-4"
      >
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white/95 font-body">
          Collaborating with top aerospace pioneers globally
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-2xl md:text-3xl font-heading italic text-white/95 tracking-tight">
          <span>Aeon</span>
          <span>·</span>
          <span>Vela</span>
          <span>·</span>
          <span>Apex</span>
          <span>·</span>
          <span>Orbit</span>
          <span>·</span>
          <span>Zeno</span>
        </div>
      </motion.div>
    </section>
  );
};

window.Hero = Hero;
