import { AuthForm } from './AuthForm';
import { motion } from 'motion/react';
import { ArrowDown, Zap } from 'lucide-react';

interface HeroProps {
  onAuthSuccess: (userData: { fullName: string; email: string }) => void;
}

export function Hero({ onAuthSuccess }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] text-white selection:bg-violet-500/30">
      
      {/* Optimized Background - reduced blur intensity */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Main blob - simplified animation */}
        <div 
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-violet-600/15 rounded-full blur-[80px] will-change-transform"
          style={{
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        
        {/* Secondary blob */}
        <div 
          className="absolute -bottom-[30%] -right-[20%] w-[60vw] h-[60vw] bg-fuchsia-600/10 rounded-full blur-[100px] will-change-transform"
          style={{
            animation: 'float 15s ease-in-out infinite reverse'
          }}
        />
        
        {/* Subtle grid - GPU accelerated */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_30%,#000_70%,transparent_100%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-32 lg:py-40 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Text Side */}
        <div className="space-y-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge - optimized */}
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Zap className="w-4 h-4 text-violet-400" />
              <span className="text-zinc-300">
                Building something <span className="text-violet-300 font-medium">different</span>
              </span>
            </motion.div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[0.95] mb-6">
              social media{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400">
                  sucks
                </span>
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                      <stop stopColor="#8b5cf6" />
                      <stop offset="1" stopColor="#d946ef" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              <span className="text-zinc-500 font-serif-accent text-4xl md:text-5xl lg:text-6xl font-normal">
                let's fix it
              </span>
            </h1>
            
            {/* Subhead */}
            <p className="mt-6 text-lg md:text-xl text-zinc-400 leading-relaxed max-w-md mx-auto lg:mx-0">
              We're tired of algorithms deciding what we see. 
              Tired of performative posting. Tired of the noise. 
              <span className="text-zinc-200"> Sup! is our attempt to build something better.</span>
            </p>
          </motion.div>

          {/* Feature Pills - optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3"
          >
            {[
              "No algorithms",
              "Real connections", 
              "Your data = yours",
            ].map((text, i) => (
              <div 
                key={i}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-colors duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                <span className="text-sm font-medium text-zinc-400">{text}</span>
              </div>
            ))}
          </motion.div>
          
          {/* Social Proof - generic avatars with initials */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-sm text-zinc-500">
             <div className="flex -space-x-2">
               {[
                 { bg: "bg-violet-500", initial: "A" },
                 { bg: "bg-cyan-500", initial: "M" },
                 { bg: "bg-emerald-500", initial: "S" },
                 { bg: "bg-amber-500", initial: "K" },
                 { bg: "bg-fuchsia-500", initial: "J" },
               ].map((avatar, i) => (
                 <div 
                   key={i} 
                   className={`w-8 h-8 rounded-full border-2 border-[#0a0a0a] ${avatar.bg} flex items-center justify-center`}
                 >
                   <span className="text-white text-xs font-semibold">{avatar.initial}</span>
                 </div>
               ))}
             </div>
             <p>
               <span className="text-zinc-300 font-medium">2,847</span> people waiting
             </p>
          </div>
        </div>

        {/* Auth Form Card - optimized */}
        <motion.div
          id="auth-form"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center lg:justify-end w-full relative scroll-mt-32"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-full blur-2xl opacity-40" />
          <div className="relative">
            <AuthForm onAuthSuccess={onAuthSuccess} />
          </div>
        </motion.div>
      </div>
      
      {/* Launching Soon Glass Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] shadow-2xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-medium text-zinc-300">
            Launching <span className="text-white">soon</span>
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-xs text-zinc-500">
            Join <span className="text-violet-400 font-medium">2,847</span> others
          </span>
        </div>
      </motion.div>

      {/* Scroll indicator - simplified */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 text-sm">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </div>

      {/* Float animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.05); }
        }
      `}</style>
    </section>
  );
}
