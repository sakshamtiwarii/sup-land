import { useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, ChevronLeft, Send, Eye, EyeOff, User, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { suggestionsApi } from '../services/api';

export function SuggestionPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    suggestion: '',
    isAnonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate suggestion is not empty
      if (!formData.suggestion.trim()) {
        throw new Error('Please enter your suggestion');
      }

      // If not anonymous, validate name and email
      if (!formData.isAnonymous) {
        if (!formData.name.trim()) {
          throw new Error('Please enter your name or enable anonymous mode');
        }
        if (!formData.email.trim()) {
          throw new Error('Please enter your email or enable anonymous mode');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          throw new Error('Please enter a valid email address');
        }
      }

      // Prepare data for backend
      const submitData = {
        suggestion: formData.suggestion,
        isAnonymous: formData.isAnonymous,
        ...(formData.isAnonymous ? {} : { name: formData.name, email: formData.email })
      };
      
      // Debug: log what we're sending
      console.log('Sending suggestion:', submitData);
      
      await suggestionsApi.submit(submitData);

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAnonymous = () => {
    setFormData(prev => ({
      ...prev,
      isAnonymous: !prev.isAnonymous,
      name: !prev.isAnonymous ? '' : prev.name,
      email: !prev.isAnonymous ? '' : prev.email,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
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

        {/* Success Message */}
        <main className="relative z-10 flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">Thank You!</h1>
            <p className="text-zinc-400 mb-8">
              Your suggestion has been received. We really appreciate you taking the time to help us build something better.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-100 transition-colors"
            >
              Back to Home
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

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
        <div className="container mx-auto px-6 py-16 max-w-2xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-6">
              <Lightbulb className="w-7 h-7 text-violet-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
              Share Your Ideas
            </h1>
            <p className="text-zinc-500 max-w-md mx-auto">
              What features would you love to see? What would make Sup! better? We want to hear from you.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-3xl blur-xl opacity-50" />
            
            <form onSubmit={handleSubmit} className="relative bg-zinc-950/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 md:p-8">
              {/* Anonymous Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-white/[0.06] mb-6">
                <div className="flex items-center gap-3">
                  {formData.isAnonymous ? (
                    <EyeOff className="w-5 h-5 text-violet-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-zinc-500" />
                  )}
                  <div>
                    <p className="font-medium text-white">Anonymous Mode</p>
                    <p className="text-sm text-zinc-500">
                      {formData.isAnonymous 
                        ? "Your identity will be hidden" 
                        : "Share your name and email with us"}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={toggleAnonymous}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-500"></div>
                </label>
              </div>

              {/* Name & Email Fields (shown when not anonymous) */}
              {!formData.isAnonymous && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 mb-6"
                >
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="What should we call you?"
                      className="w-full px-4 py-3 bg-zinc-900 border border-white/[0.06] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-zinc-900 border border-white/[0.06] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                </motion.div>
              )}

              {/* Suggestion Text Area */}
              <div className="space-y-1 mb-6">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Your Suggestion <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="suggestion"
                  value={formData.suggestion}
                  onChange={handleChange}
                  placeholder="Tell us what you'd like to see in Sup! What features would make this platform better for you?"
                  rows={6}
                  className="w-full px-4 py-3 bg-zinc-900 border border-white/[0.06] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Send Suggestion
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="mt-4 text-xs text-zinc-600 text-center">
                {formData.isAnonymous 
                  ? "Your suggestion will be submitted anonymously." 
                  : "We may reach out to you about your suggestion."}
              </p>
            </form>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/[0.06]">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <Link to="/" className="text-zinc-600 hover:text-white transition-colors">Home</Link>
            <Link to="/privacy" className="text-zinc-600 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-zinc-600 hover:text-white transition-colors">Terms</Link>
          </div>
          <p className="text-zinc-700 text-sm">
            &copy; {new Date().getFullYear()} Sup!. Built with respect.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default SuggestionPage;
