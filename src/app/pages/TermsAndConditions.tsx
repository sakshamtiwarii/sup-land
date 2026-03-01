import { motion } from 'motion/react';
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsAndConditions() {
  const lastUpdated = "March 1, 2026";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-fuchsia-900/10 organic-blob blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-violet-900/5 organic-blob blur-[120px]" />
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
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 mb-6">
              <Scale className="w-7 h-7 text-fuchsia-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-zinc-500">Last updated: {lastUpdated}</p>
          </motion.div>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 border border-white/[0.06]"
          >
            <p className="text-zinc-300 leading-relaxed text-lg">
              Hey, thanks for actually reading this. Most people don't. We've tried to write these 
              terms in plain English instead of legalese. The short version: don't be a jerk, 
              don't break the law, and we'll try not to break anything on our end either.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-16">
            <Section icon={<CheckCircle className="w-5 h-5" />} title="The basics" delay={0.2}>
              <p className="text-zinc-400 mb-4">
                By using Sup!, you agree to:
              </p>
              <ul className="space-y-2 text-zinc-400">
                <li>Be at least 13 years old</li>
                <li>Provide accurate information when signing up</li>
                <li>Not use the service for illegal stuff</li>
                <li>Not try to hack, break, or abuse the platform</li>
              </ul>
              <p className="text-zinc-500 mt-4 text-sm">
                Pretty standard stuff. We're all adults here (mostly).
              </p>
            </Section>

            <Section icon={<div className="w-5 h-5 flex items-center justify-center text-lg">🚀</div>} title="Early access" delay={0.3}>
              <p className="text-zinc-400 mb-4">
                You're signing up for early access, which means:
              </p>
              <ul className="space-y-2 text-zinc-400">
                <li>Things will break. It's not finished yet.</li>
                <li>Your data might need to be migrated when we officially launch</li>
                <li>Features will change, disappear, or be completely rewritten</li>
                <li>We might email you about updates (you can unsubscribe)</li>
              </ul>
              <p className="text-zinc-500 mt-4 text-sm">
                Early access is a privilege, not a guarantee. We reserve the right to revoke 
                access if you're being disruptive to the community.
              </p>
            </Section>

            <Section icon={<div className="w-5 h-5 flex items-center justify-center">👤</div>} title="Your account" delay={0.4}>
              <p className="text-zinc-400 mb-4">
                Keep your password safe. You're responsible for everything that happens 
                under your account. If you think someone has accessed your account without 
                permission, let us know immediately.
              </p>
              <p className="text-zinc-400">
                We can suspend or delete accounts that violate these terms. We'll try to 
                give you a warning first, but we don't have to.
              </p>
            </Section>

            <Section icon={<AlertCircle className="w-5 h-5" />} title="Don't do this" delay={0.5}>
              <p className="text-zinc-400 mb-4">
                This stuff will get you banned immediately:
              </p>
              <ul className="space-y-2 text-zinc-400">
                <li>Harassment, hate speech, or threats</li>
                <li>Spam, scams, or phishing attempts</li>
                <li>Uploading malware or trying to hack us</li>
                <li>Impersonating others</li>
                <li>Sharing illegal content</li>
                <li>Scraping data or using bots without permission</li>
              </ul>
              <p className="text-zinc-500 mt-4 text-sm">
                Use common sense. If it feels wrong, it probably is.
              </p>
            </Section>

            <Section icon={<div className="w-5 h-5 flex items-center justify-center">©</div>} title="Content & IP" delay={0.6}>
              <p className="text-zinc-400 mb-4">
                You keep ownership of anything you create on Sup!. We're not in the business 
                of stealing your work.
              </p>
              <p className="text-zinc-400">
                That said, we need certain rights to operate the service. By posting content, 
                you give us a license to host, display, and distribute it as part of operating Sup!. 
                This doesn't mean we own it — we just need permission to show it to other users.
              </p>
            </Section>

            <Section icon={<XCircle className="w-5 h-5" />} title="Termination" delay={0.7}>
              <p className="text-zinc-400 mb-4">
                You can delete your account anytime. We'll miss you, but we understand.
              </p>
              <p className="text-zinc-400">
                We can also suspend or terminate accounts that violate these terms. We'll try 
                to be fair about it, but ultimately our decision is final.
              </p>
            </Section>

            <Section icon={<div className="w-5 h-5 flex items-center justify-center">⚖️</div>} title="The legal stuff" delay={0.8}>
              <p className="text-zinc-400 mb-4">
                <strong className="text-zinc-200">Disclaimer:</strong> Sup! is provided "as is" 
                without warranties of any kind. We're building this in good faith, but sometimes 
                things break. We're not liable for damages arising from your use of the service.
              </p>
              <p className="text-zinc-400 mb-4">
                <strong className="text-zinc-200">Governing law:</strong> These terms are governed 
                by the laws of [Your Jurisdiction]. If any part of these terms is found invalid, 
                the rest remains in effect.
              </p>
              <p className="text-zinc-500 text-sm">
                We know this section sounds scary. It's mostly here because lawyers say we need it. 
                We're reasonable people and we'll try to work things out with you before anything 
                gets to a courtroom.
              </p>
            </Section>

            <Section icon={<div className="w-5 h-5 flex items-center justify-center">📝</div>} title="Changes" delay={0.9}>
              <p className="text-zinc-400">
                We might update these terms as Sup! evolves. If we make significant changes, 
                we'll notify you. Continued use after changes means you accept the new terms.
              </p>
            </Section>

            <Section icon={<div className="w-5 h-5 flex items-center justify-center">📧</div>} title="Talk to us" delay={1.0}>
              <p className="text-zinc-400 mb-4">
                Questions? Concerns? Just want to say hi?
              </p>
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/[0.06]">
                <a href="mailto:contact@orsup.com" className="text-violet-400 hover:underline font-medium">
                  contact@orsup.com
                </a>
              </div>
              <p className="text-zinc-500 mt-4 text-sm">
                We read every email. Might take us a day or two to respond, but we will.
              </p>
            </Section>
          </div>

          {/* Final note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-16 pt-8 border-t border-white/[0.06] text-center"
          >
            <p className="text-zinc-500 text-sm">
              Thanks for reading. Seriously. Most people just click "agree."
            </p>
          </motion.div>
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
            &copy; {new Date().getFullYear()} Sup!. Built with honesty.
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
        <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400">
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

export default TermsAndConditions;
