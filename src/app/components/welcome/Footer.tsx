import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-[#0a0a0a] border-t border-white/[0.06] relative">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-display font-bold text-xl text-white">Sup!</span>
            </Link>
            <p className="text-zinc-500 max-w-sm leading-relaxed mb-4">
              Building a social platform that doesn't suck. 
              Made by humans, for humans.
            </p>
            <p className="text-sm text-zinc-600">
              Built with <Heart className="w-3 h-3 inline text-red-500" fill="currentColor" /> and frustration with existing platforms.
            </p>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="font-medium text-white mb-4 text-sm tracking-wide uppercase">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#features" className="text-zinc-500 hover:text-violet-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <span className="text-zinc-600 cursor-not-allowed">
                  Download <span className="text-xs text-zinc-700">(soon)</span>
                </span>
              </li>
              <li>
                <span className="text-zinc-600 cursor-not-allowed">
                  Changelog <span className="text-xs text-zinc-700">(soon)</span>
                </span>
              </li>
            </ul>
          </div>
          
          {/* Contribute */}
          <div>
            <h4 className="font-medium text-white mb-4 text-sm tracking-wide uppercase">Contribute</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/suggestion"
                  className="text-zinc-500 hover:text-violet-400 transition-colors"
                >
                  Suggest a Feature
                </Link>
              </li>
              <li>
                <Link 
                  to="/volunteer"
                  className="text-zinc-500 hover:text-violet-400 transition-colors"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <a href="mailto:contact@orsup.com" className="text-zinc-500 hover:text-violet-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-white mb-4 text-sm tracking-wide uppercase">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  to="/privacy"
                  className="text-zinc-500 hover:text-violet-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms"
                  className="text-zinc-500 hover:text-violet-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.04] text-center">
          <p className="text-sm text-zinc-600">
            &copy; {currentYear} Sup!. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
