import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'What is it?', onClick: () => scrollToSection('features') },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        {/* Backdrop blur - simplified */}
        <div 
          className="absolute inset-0 bg-[#0a0a0a]/80 border-b border-white/[0.06] transition-opacity duration-300"
          style={{ opacity: isScrolled ? 1 : 0, backdropFilter: isScrolled ? 'blur(12px)' : 'none' }}
        />

        <div className="container mx-auto px-6 relative flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-white">
              Sup!
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('auth-form')}
              className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors"
            >
              Join Waitlist
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu - Portal to body to avoid layout issues */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[72px] left-4 right-4 bg-[#111] border border-white/[0.08] rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="text-lg font-medium text-zinc-300 hover:text-white text-left py-2"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('auth-form')}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-center mt-2"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Navbar;
