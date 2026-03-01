import { motion } from 'motion/react';
import { Home, ArrowLeft, Ghost, Search, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        {/* Large ghostly blob */}
        <motion.div 
          className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[80vw] h-[80vw] bg-violet-600/5 organic-blob blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Secondary blob */}
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] bg-fuchsia-600/5 organic-blob blur-[100px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative inline-block mb-8"
          >
            {/* Glow effect behind numbers */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 blur-3xl scale-150" />
            
            <h1 className="relative text-[8rem] md:text-[10rem] font-display font-bold leading-none tracking-tighter">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                4
              </span>
              <motion.span 
                className="inline-block"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Ghost className="w-20 h-20 md:w-28 md:h-28 text-zinc-600 inline-block mx-[-0.5rem]" strokeWidth={1.5} />
              </motion.span>
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                4
              </span>
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Page not found
            </h2>
            <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed">
              Looks like this page pulled a disappearing act. 
              It might have been moved, deleted, or never existed in the first place.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 transition-all active:scale-[0.98]"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 border border-white/[0.08] text-zinc-300 font-medium rounded-xl hover:bg-zinc-800 hover:text-white transition-all active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Go Back
            </button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-white/[0.06]"
          >
            <p className="text-sm text-zinc-600 mb-4">Or try these:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link 
                to="/suggestion" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/50 border border-white/[0.06] text-zinc-400 hover:text-white hover:border-violet-500/30 transition-colors text-sm"
              >
                <Search className="w-4 h-4" />
                Suggest a Feature
              </Link>
              <Link 
                to="/volunteer" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/50 border border-white/[0.06] text-zinc-400 hover:text-white hover:border-violet-500/30 transition-colors text-sm"
              >
                <Compass className="w-4 h-4" />
                Volunteer
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-white/[0.06]">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-zinc-600">
            Lost? <a href="mailto:contact@orsup.com" className="text-violet-400 hover:underline">contact@orsup.com</a>
          </p>
        </div>
      </footer>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 rounded-full bg-violet-500/30"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-3 h-3 rounded-full bg-fuchsia-500/30"
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-2 h-2 rounded-full bg-violet-500/20"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}

export default NotFoundPage;
