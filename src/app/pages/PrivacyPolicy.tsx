import { motion } from 'motion/react';
import { Shield, Lock, Eye, Database, Mail, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPolicy() {
  const lastUpdated = "March 1, 2026";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-violet-900/10 organic-blob blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-fuchsia-900/5 organic-blob blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06]">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-display font-bold text-xl">Sup!</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10">
        <div className="container mx-auto px-6 py-16 max-w-3xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-6">
              <Shield className="w-7 h-7 text-violet-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-zinc-500">Last updated: {lastUpdated}</p>
          </motion.div>

          {/* Intro - human tone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 p-6 rounded-2xl bg-zinc-950/50 border border-white/[0.06]"
          >
            <p className="text-zinc-300 leading-relaxed text-lg">
              Look, we know privacy policies are usually boring legal documents written to protect 
              companies from lawsuits. This one is different. We're going to tell you, in plain English, 
              what data we collect, why we collect it, and how we protect it. Because we actually care 
              about your privacy.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-16">
            <Section icon={<Database className="w-5 h-5" />} title="What we collect" delay={0.2}>
              <p className="text-zinc-400 mb-4">
                We only collect what we absolutely need:
              </p>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-violet-400 mt-1">•</span>
                  <span><strong className="text-zinc-200">Your name and email</strong> — so we can tell you when we launch</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-400 mt-1">•</span>
                  <span><strong className="text-zinc-200">A username</strong> — so you have something unique</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-400 mt-1">•</span>
                  <span><strong className="text-zinc-200">Password (encrypted)</strong> — we can't even read it</span>
                </li>
              </ul>
              <p className="text-zinc-500 mt-4 text-sm">
                That's it. We don't track your location, we don't scan your emails, 
                we don't build a profile of you. We're not that kind of company.
              </p>
            </Section>

            <Section icon={<Eye className="w-5 h-5" />} title="How we use it" delay={0.3}>
              <p className="text-zinc-400 mb-4">
                Your data has exactly two purposes:
              </p>
              <ol className="space-y-3 text-zinc-400 list-decimal list-inside">
                <li>To notify you when Sup! launches</li>
                <li>To send occasional updates about our progress (if you want them)</li>
              </ol>
              <p className="text-zinc-500 mt-4 text-sm">
                We will never sell your data. Never. We'd rather shut down the company 
                than become another data broker.
              </p>
            </Section>

            <Section icon={<Lock className="w-5 h-5" />} title="How we protect it" delay={0.4}>
              <p className="text-zinc-400 mb-4">
                We take security seriously:
              </p>
              <ul className="space-y-2 text-zinc-400">
                <li>All data is encrypted in transit and at rest</li>
                <li>Passwords are hashed with bcrypt (industry standard)</li>
                <li>We use MongoDB Atlas with their enterprise security</li>
                <li>We regularly review our security practices</li>
              </ul>
              <p className="text-zinc-500 mt-4 text-sm">
                That said, no system is 100% secure. If we ever have a breach, 
                we'll tell you immediately. No cover-ups, no delays.
              </p>
            </Section>

            <Section icon={<div className="w-5 h-5 flex items-center justify-center text-lg">G</div>} title="Third parties" delay={0.5}>
              <p className="text-zinc-400 mb-4">
                We use the bare minimum of third-party services:
              </p>
              <ul className="space-y-2 text-zinc-400">
                <li><strong className="text-zinc-200">Google OAuth</strong> — only if you choose to sign in with Google</li>
                <li><strong className="text-zinc-200">MongoDB Atlas</strong> — for database hosting</li>
                <li><strong className="text-zinc-200">Email service</strong> — for sending you launch notifications</li>
              </ul>
            </Section>

            <Section icon={<div className="w-5 h-5 flex items-center justify-center">✓</div>} title="Your rights" delay={0.6}>
              <p className="text-zinc-400 mb-4">
                You have complete control over your data:
              </p>
              <ul className="space-y-2 text-zinc-400">
                <li>Request a copy of everything we have on you</li>
                <li>Fix any inaccurate information</li>
                <li>Delete your account and all associated data</li>
                <li>Unsubscribe from emails anytime</li>
              </ul>
              <p className="text-zinc-400 mt-4">
                Just email us at <a href="mailto:contact@orsup.com" className="text-violet-400 hover:underline">contact@orsup.com</a> and we'll handle it within 48 hours.
              </p>
            </Section>

            <Section icon={<div className="w-5 h-5 flex items-center justify-center">👤</div>} title="Kids" delay={0.7}>
              <p className="text-zinc-400">
                Sup! isn't for kids under 13. If you're a parent and your child signed up, 
                let us know and we'll delete their account immediately.
              </p>
            </Section>

            <Section icon={<Mail className="w-5 h-5" />} title="Questions?" delay={0.8}>
              <p className="text-zinc-400 mb-4">
                This policy might change as we grow, but the spirit will remain the same: 
                we respect your privacy.
              </p>
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.06]">
                <p className="text-zinc-300">Email us anytime:</p>
                <a href="mailto:contact@orsup.com" className="text-violet-400 hover:underline font-medium">
                  contact@orsup.com
                </a>
              </div>
            </Section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/[0.06]">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <Link to="/" className="text-zinc-600 hover:text-white transition-colors">Home</Link>
            <Link to="/terms" className="text-zinc-600 hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="text-zinc-600 hover:text-white transition-colors">Privacy</Link>
          </div>
          <p className="text-zinc-700 text-sm">
            &copy; {new Date().getFullYear()} Sup!. Built with respect.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Section({ icon, title, children, delay }: { icon: React.ReactNode; title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      <div className="pl-[52px] text-zinc-300 leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

export default PrivacyPolicy;
