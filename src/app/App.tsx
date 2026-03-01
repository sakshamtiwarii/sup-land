import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/welcome/Navbar';
import { Hero } from './components/welcome/Hero';
import { Features } from './components/welcome/Features';
import { ComingSoon } from './components/welcome/ComingSoon';

// Lazy load non-critical pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));

// Simple loader for suspense
const PageLoader = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

interface UserData {
  fullName: string;
  email: string;
}

type Page = 'home' | 'coming-soon' | 'privacy' | 'terms';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sup_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserData(parsed);
        setIsAuthenticated(true);
        setCurrentPage('coming-soon');
      } catch {
        localStorage.removeItem('sup_user');
      }
    }
  }, []);

  const handleAuthSuccess = (data: UserData) => {
    setUserData(data);
    setIsAuthenticated(true);
    setCurrentPage('coming-soon');
    // Save to localStorage for session persistence
    localStorage.setItem('sup_user', JSON.stringify(data));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setCurrentPage('home');
    localStorage.removeItem('sup_user');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // If authenticated, show Coming Soon page
  if (currentPage === 'coming-soon' && isAuthenticated && userData) {
    return (
      <ComingSoon 
        userName={userData.fullName} 
        userEmail={userData.email}
        onLogout={handleLogout}
      />
    );
  }

  // Privacy Policy Page
  if (currentPage === 'privacy') {
    return (
      <Suspense fallback={<PageLoader />}>
        <PrivacyPolicy onBack={() => navigateTo('home')} />
      </Suspense>
    );
  }

  // Terms and Conditions Page
  if (currentPage === 'terms') {
    return (
      <Suspense fallback={<PageLoader />}>
        <TermsAndConditions onBack={() => navigateTo('home')} />
      </Suspense>
    );
  }

  // Home / Landing Page
  return (
    <main className="min-h-screen bg-black text-white font-sans antialiased selection:bg-fuchsia-500/30">
      <Navbar />
      <Hero onAuthSuccess={handleAuthSuccess} />
      <Features />
      
      <footer className="py-12 bg-zinc-950 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">Sup!</h3>
              <p className="text-zinc-500 max-w-xs">
                Building the future of social connection. Join us in shaping how the world communicates.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#features" className="hover:text-fuchsia-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Download</a></li>
                <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Contribute</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>
                  <a 
                    href="/suggestion" 
                    className="hover:text-fuchsia-400 transition-colors"
                  >
                    Suggest a Feature
                  </a>
                </li>
                <li>
                  <a 
                    href="/volunteer" 
                    className="hover:text-fuchsia-400 transition-colors"
                  >
                    Volunteer
                  </a>
                </li>
                <li>
                  <a href="mailto:contact@orsup.com" className="hover:text-fuchsia-400 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li>
                  <button 
                    onClick={() => navigateTo('privacy')}
                    className="hover:text-fuchsia-400 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigateTo('terms')}
                    className="hover:text-fuchsia-400 transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
                <li><a href="#" className="hover:text-fuchsia-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
            <p>&copy; {new Date().getFullYear()} Sup! Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
