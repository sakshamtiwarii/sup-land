import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ChevronLeft, Send, User, Mail, Briefcase, Clock, MessageSquare, CheckCircle2, Code, Palette, Megaphone, Users, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { volunteersApi } from '../services/api';

const skillOptions = [
  { id: 'development', label: 'Development', icon: Code, description: 'Frontend, Backend, Mobile, DevOps' },
  { id: 'design', label: 'Design', icon: Palette, description: 'UI/UX, Graphic Design, Branding' },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, description: 'Social Media, Content, Growth' },
  { id: 'community', label: 'Community', icon: Users, description: 'Moderation, Events, Support' },
  { id: 'product', label: 'Product', icon: Lightbulb, description: 'Strategy, Research, Planning' },
];

const timeOptions = [
  { value: '5-10', label: '5-10 hours/week' },
  { value: '10-20', label: '10-20 hours/week' },
  { value: '20+', label: '20+ hours/week' },
  { value: 'flexible', label: 'Flexible / As needed' },
];

export function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: [] as string[],
    timeAvailability: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validation
      if (!formData.name.trim()) {
        throw new Error('Please enter your name');
      }
      if (!formData.email.trim()) {
        throw new Error('Please enter your email');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }
      if (formData.skills.length === 0) {
        throw new Error('Please select at least one skill area');
      }
      if (!formData.timeAvailability) {
        throw new Error('Please select your time availability');
      }
      if (!formData.message.trim()) {
        throw new Error('Please tell us why you want to volunteer');
      }

      // Send to backend
      await volunteersApi.submit(formData);

      setIsSubmitted(true);
    } catch (err: any) {
      // Handle specific error messages from backend
      if (err.message?.includes('pending application')) {
        setError('You already have a pending application. We will review it soon!');
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (skillId: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(s => s !== skillId)
        : [...prev.skills, skillId],
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
            <h1 className="text-3xl font-display font-bold mb-4">You're Awesome!</h1>
            <p className="text-zinc-400 mb-4">
              Thank you for offering to help! We've received your application and will be in touch soon.
            </p>
            <p className="text-zinc-500 text-sm mb-8">
              People like you are what make this project possible. 💜
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
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 mb-6">
              <Heart className="w-7 h-7 text-fuchsia-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">
              Join the Team
            </h1>
            <p className="text-zinc-500 max-w-md mx-auto">
              We're building this together. If you believe in what we're doing and want to help, we'd love to have you.
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
            
            <form onSubmit={handleSubmit} className="relative bg-zinc-950/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 md:p-8 space-y-6">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name <span className="text-red-400">*</span>
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

              {/* Email */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address <span className="text-red-400">*</span>
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

              {/* Skills */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  What can you help with? <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skillOptions.map((skill) => {
                    const Icon = skill.icon;
                    const isSelected = formData.skills.includes(skill.id);
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => toggleSkill(skill.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-violet-500/10 border-violet-500/30'
                            : 'bg-zinc-900 border-white/[0.06] hover:border-white/[0.12]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-violet-500/20' : 'bg-zinc-800'
                          }`}>
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-violet-400' : 'text-zinc-500'}`} />
                          </div>
                          <div>
                            <p className={`font-medium ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                              {skill.label}
                            </p>
                            <p className="text-xs text-zinc-500 mt-0.5">{skill.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Availability */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time Availability <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {timeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, timeAvailability: option.value }))}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                        formData.timeAvailability === option.value
                          ? 'bg-violet-500/10 border-violet-500/30 text-white'
                          : 'bg-zinc-900 border-white/[0.06] text-zinc-400 hover:border-white/[0.12]'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Why do you want to volunteer? <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about yourself, why you're interested, and what you'd like to contribute..."
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-900 border border-white/[0.06] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
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
                    Apply to Volunteer
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-xs text-zinc-600 text-center">
                This is a volunteer position. We're all working on this because we believe in it.
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

export default VolunteerPage;
