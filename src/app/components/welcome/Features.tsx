import { memo } from 'react';
import { motion } from 'motion/react';
import { Users, MessageSquare, Sparkles, Shield, Zap, Globe, Heart, Lock, Eye, Radio, Fingerprint } from 'lucide-react';

const features = [
  {
    title: "Circles",
    description: "Create or join small groups around shared interests. No algorithms, no feeds—just people talking about things they actually care about.",
    icon: Users,
    color: "violet",
  },
  {
    title: "Anonymous Mode",
    description: "Sometimes you need to share without your name attached. Switch to anonymous for honest conversations without the baggage.",
    icon: Eye,
    color: "cyan",
  },
  {
    title: "Encrypted Chats",
    description: "End-to-end encryption for your private conversations. We can't read them, advertisers can't read them—only you and the person you're talking to.",
    icon: Lock,
    color: "emerald",
  },
  {
    title: "Real-time",
    description: "Instant messaging that actually feels instant. No delays, no loading screens, just pure speed.",
    icon: Radio,
    color: "amber",
  },
  {
    title: "No tracking",
    description: "We don't follow you around the internet. No pixel tracking, no behavioral analysis, no creepy ads following you.",
    icon: Fingerprint,
    color: "rose",
  },
  {
    title: "AI Assistant",
    description: "Optional AI to help you express yourself better. Rewrite that angry message before you send it, or get help articulating your thoughts.",
    icon: Sparkles,
    color: "fuchsia",
  },
];

const values = [
  { icon: Shield, title: "Your data stays yours", desc: "We don't sell it. We don't mine it. We just keep it safe." },
  { icon: Zap, title: "Fast as hell", desc: "Built modern. No bloat. Just speed." },
  { icon: Globe, title: "Global, local", desc: "Connect anywhere, but feel like you're in the same room." },
  { icon: Heart, title: "Made with intent", desc: "Every feature exists for a reason. No fluff." },
];

const colorClasses: Record<string, { bg: string; icon: string }> = {
  violet: { bg: "group-hover:bg-violet-500/10", icon: "text-violet-400" },
  cyan: { bg: "group-hover:bg-cyan-500/10", icon: "text-cyan-400" },
  emerald: { bg: "group-hover:bg-emerald-500/10", icon: "text-emerald-400" },
  amber: { bg: "group-hover:bg-amber-500/10", icon: "text-amber-400" },
  rose: { bg: "group-hover:bg-rose-500/10", icon: "text-rose-400" },
  fuchsia: { bg: "group-hover:bg-fuchsia-500/10", icon: "text-fuchsia-400" },
};

// Generic avatar placeholders with initials
const genericAvatars = [
  { bg: "bg-violet-500", initial: "A" },
  { bg: "bg-cyan-500", initial: "M" },
  { bg: "bg-emerald-500", initial: "S" },
  { bg: "bg-amber-500", initial: "K" },
  { bg: "bg-fuchsia-500", initial: "J" },
];

export const Features = memo(function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Simplified background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-500 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            What we're building
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6"
          >
            The stuff we wish{" "}
            <span className="font-serif-accent text-violet-400">existed</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-zinc-400 leading-relaxed"
          >
            We're not trying to build another social network. We're trying to build 
            the one we actually want to use. Not build by professionals...
          </motion.p>
        </div>

        {/* Features Grid - 2 columns on desktop */}
        <div className="grid md:grid-cols-2 gap-4 mb-24 md:mb-32">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="group relative bg-zinc-950/50 border border-white/[0.06] rounded-2xl p-6 md:p-8 hover:border-white/[0.12] transition-colors duration-300"
              >
                <div className="relative z-10">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-5
                    bg-zinc-900 ${colors.bg} transition-colors duration-300
                    border border-white/[0.06]
                  `}>
                    <feature.icon className={`w-6 h-6 ${colors.icon}`} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Values Section */}
        <div className="border-t border-white/[0.06] pt-16 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h3 className="text-2xl font-display font-bold mb-2">How we think about this</h3>
            <p className="text-zinc-500">The principles guiding what we build</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + (i * 0.1), duration: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-zinc-500" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="font-medium text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Personal Note with Generic Avatars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 md:mt-32 text-center max-w-xl mx-auto"
        >
          <div className="inline-block p-6 md:p-8 rounded-2xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 border border-white/[0.06]">
            {/* Generic avatars with initials */}
            <div className="flex justify-center -space-x-2 mb-6">
              {genericAvatars.map((avatar, i) => (
                <div 
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 border-[#0a0a0a] ${avatar.bg} flex items-center justify-center`}
                >
                  <span className="text-white text-sm font-semibold">{avatar.initial}</span>
                </div>
              ))}
            </div>
            <p className="text-lg text-zinc-300 leading-relaxed mb-4">
              "We're building this because we need it ourselves. 
              Hope you find it useful too."
            </p>
            <p className="text-sm text-zinc-500">— The Sup! team</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
