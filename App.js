const App = () => {
  const Navbar = window.Navbar;
  const Hero = window.Hero;
  const Capabilities = window.Capabilities;

  return (
    <div className="relative bg-black w-full min-h-screen">
      <Navbar />
      <Hero />
      <Capabilities />
    </div>
  );
};

window.App = App;
