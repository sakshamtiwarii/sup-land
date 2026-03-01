import { Navbar } from '../components/welcome/Navbar';
import { Hero } from '../components/welcome/Hero';
import { Features } from '../components/welcome/Features';
import { Footer } from '../components/welcome/Footer';

interface LandingPageProps {
  onAuthSuccess: (userData: { fullName: string; email: string }) => void;
}

export function LandingPage({ onAuthSuccess }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-black text-white font-sans antialiased selection:bg-fuchsia-500/30">
      <Navbar />
      <Hero onAuthSuccess={onAuthSuccess} />
      <Features />
      <Footer />
    </main>
  );
}

export default LandingPage;
