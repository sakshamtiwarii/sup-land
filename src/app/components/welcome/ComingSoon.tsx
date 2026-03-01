import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Mail, Clock, Users, Rocket, Bell, PartyPopper } from 'lucide-react';

interface ComingSoonProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export function ComingSoon({ userName, userEmail, onLogout }: ComingSoonProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Organic Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] bg-gradient-to-br from-violet-600/20 to-purple-600/10 organic-blob blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-[30%] -right-[20%] w-[70vw] h-[70vw] bg-gradient-to-tl from-fuchsia-600/15 to-pink-600/10 organic-blob blur-[120px]"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay noise-bg" />
      </div>

      {/* Success Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.2 }}
        className="relative z-10 max-w-xl w-full"
      >
        {/* Organic glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-violet-600/10 organic-blob blur-2xl opacity-60" />
        
        <div className="relative bg-zinc-950/90 backdrop-blur-xl border border-white/[0.08] rounded-[2rem] p-8 md:p-12 text-center overflow-hidden">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center"
          >
            <PartyPopper className="w-10 h-10 text-white" />
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              You're in, {userName.split(' ')[0]}!
            </h1>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm mb-6">
              <Bell className="w-4 h-4" />
              <span>Waitlist spot secured</span>
            </div>
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-400 mb-8 leading-relaxed"
          >
            We're working hard to get this thing ready. You'll be the first to know 
            when we launch. Promise.
          </motion.p>

          {/* Email Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3 px-5 py-3 bg-zinc-900/50 border border-white/[0.06] rounded-xl mb-8 max-w-sm mx-auto"
          >
            <Mail className="w-5 h-5 text-violet-400" />
            <span className="text-zinc-300 text-sm">{userEmail}</span>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-3 mb-8"
          >
            {[
              { icon: Clock, label: 'Building', sublabel: 'Now' },
              { icon: Users, label: 'With', sublabel: 'You' },
              { icon: Rocket, label: 'Launch', sublabel: 'Soon' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
              >
                <item.icon className="w-5 h-5 text-violet-400 mx-auto mb-1.5" />
                <div className="text-sm font-medium text-white">{item.label}</div>
                <div className="text-xs text-zinc-600">{item.sublabel}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-zinc-500 hover:text-white hover:bg-white/[0.06] transition-all text-sm font-medium"
            >
              Sign Out
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=Just%20joined%20the%20waitlist%20for%20Sup!%20%E2%80%94%20a%20social%20platform%20that%20doesn't%20suck.%20Join%20me%3F%20%F0%9F%9A%80`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-zinc-100 transition-all text-sm"
            >
              Share on Twitter
            </a>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-xs text-zinc-600"
          >
            Questions? <a href="mailto:contact@orsup.com" className="text-violet-400 hover:underline">contact@orsup.com</a>
          </motion.p>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 mt-8 flex flex-wrap justify-center gap-6 text-sm"
      >
        <Link to="/" className="text-zinc-600 hover:text-white transition-colors">
          Home
        </Link>
        <Link to="/suggestion" className="text-zinc-600 hover:text-white transition-colors">
          Suggest a Feature
        </Link>
        <Link to="/volunteer" className="text-zinc-600 hover:text-white transition-colors">
          Volunteer
        </Link>
        <Link to="/privacy" className="text-zinc-600 hover:text-white transition-colors">
          Privacy
        </Link>
        <Link to="/terms" className="text-zinc-600 hover:text-white transition-colors">
          Terms
        </Link>
      </motion.div>
    </div>
  );
}

export default ComingSoon;
