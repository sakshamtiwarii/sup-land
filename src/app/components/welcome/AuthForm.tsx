import React, { useState, useEffect, useRef } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { authApi } from '../../services/api';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: unknown) => void;
          renderButton: (element: HTMLElement | null, config: unknown) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const loginSchema = z.object({
  email: z.string().email({ message: "That doesn't look like an email" }),
  password: z.string().min(6, { message: "Password needs 6+ characters" }),
});

const signupSchema = loginSchema.extend({
  username: z.string().min(3, { message: "Username too short" }),
  fullName: z.string().min(2, { message: "Name please" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthFormProps {
  onAuthSuccess: (userData: { fullName: string; email: string }) => void;
}

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(activeTab === "login" ? loginSchema : signupSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      fullName: "",
    },
    mode: "onChange",
  });

  // Load Google Sign-In script
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    if (document.getElementById('google-signin-script')) {
      setGoogleScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-signin-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (googleScriptLoaded && window.google && googleButtonRef.current) {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'filled_black',
        size: 'large',
        width: '100%',
        text: 'continue_with',
        shape: 'pill',
        logo_alignment: 'left',
      });
    }
  }, [googleScriptLoaded, activeTab]);

  const handleGoogleResponse = async (response: { credential: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authApi.googleAuth(response.credential);
      if (result.success) {
        onAuthSuccess({
          fullName: result.data?.fullName || 'Friend',
          email: result.data?.email || '',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      if (activeTab === "login") {
        const response = await authApi.login({
          email: data.email,
          password: data.password,
        });

        if (response.success) {
          onAuthSuccess({
            fullName: response.data?.fullName || 'Friend',
            email: response.data?.email || data.email,
          });
        }
      } else {
        const response = await authApi.signup({
          fullName: data.fullName,
          username: data.username,
          email: data.email,
          password: data.password,
        });

        if (response.success) {
          onAuthSuccess({
            fullName: response.data?.fullName || data.fullName,
            email: response.data?.email || data.email,
          });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Oops, try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setError(null);
    form.reset();
  };

  const hasGoogleConfig = !!import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const isSignup = activeTab === "signup";

  return (
    <div className="w-full max-w-[420px] bg-zinc-950/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden relative">
      {/* Subtle glow */}
      <div className="absolute -inset-1 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 rounded-2xl blur-xl opacity-50 pointer-events-none" />
      
      <div className="relative z-10 bg-zinc-950/90 p-6 sm:p-8">
        <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
          
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-1">
              {isSignup ? 'Join the waitlist' : 'Welcome back'}
            </h3>
            <p className="text-zinc-500 text-sm">
              {isSignup ? "We're still building. Be first to know." : 'Good to see you again'}
            </p>
          </div>

          {/* Tabs - Fixed height container */}
          <Tabs.List className="flex p-1 bg-zinc-900 rounded-xl border border-white/[0.06] mb-6">
            <Tabs.Trigger
              value="login"
              className="flex-1 py-2.5 text-sm font-medium rounded-lg transition-all relative data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:text-zinc-300"
            >
              Sign In
              {activeTab === "login" && (
                <motion.div
                  layoutId="authTab"
                  className="absolute inset-0 bg-zinc-800 rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </Tabs.Trigger>
            <Tabs.Trigger
              value="signup"
              className="flex-1 py-2.5 text-sm font-medium rounded-lg transition-all relative data-[state=active]:text-white data-[state=inactive]:text-zinc-500 data-[state=inactive]:hover:text-zinc-300"
            >
              Create Account
              {activeTab === "signup" && (
                <motion.div
                  layoutId="authTab"
                  className="absolute inset-0 bg-zinc-800 rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
            </Tabs.Trigger>
          </Tabs.List>

          {/* Messages */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Google Button */}
          {hasGoogleConfig && (
            <div className="mb-4">
              <div ref={googleButtonRef} className="w-full" style={{ minHeight: '44px' }} />
              {!googleScriptLoaded && (
                <div className="w-full h-11 bg-zinc-900 rounded-full flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-600" />
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.06]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-zinc-950 px-2 text-xs text-zinc-600">
                {hasGoogleConfig ? 'or use email' : 'Sign up with email'}
              </span>
            </div>
          </div>

          {/* Form - Fixed height to prevent layout shift */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Signup fields - Use opacity/transform instead of height animation */}
            <div 
              className="grid transition-all duration-300 ease-out"
              style={{
                gridTemplateRows: isSignup ? '1fr 1fr' : '0fr 0fr',
                gap: isSignup ? '16px' : '0px',
                opacity: isSignup ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-500 ml-1">Full name</label>
                  <input
                    {...form.register("fullName")}
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/[0.06] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors text-sm"
                    placeholder="What should we call you?"
                    disabled={isLoading}
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-xs text-red-400 ml-1">{form.formState.errors.fullName.message}</p>
                  )}
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-zinc-500 ml-1">Username</label>
                  <input
                    {...form.register("username")}
                    className="w-full px-4 py-3 bg-zinc-900 border border-white/[0.06] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors text-sm"
                    placeholder="Pick a username"
                    disabled={isLoading}
                  />
                  {form.formState.errors.username && (
                    <p className="text-xs text-red-400 ml-1">{form.formState.errors.username.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-600" />
                <input
                  {...form.register("email")}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-white/[0.06] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors text-sm"
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-xs text-red-400 ml-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-medium text-zinc-500">Password</label>
                {!isSignup && (
                  <button type="button" className="text-xs text-violet-400 hover:text-violet-300">
                    Forgot?
                  </button>
                )}
              </div>
              <input
                {...form.register("password")}
                type="password"
                className="w-full px-4 py-3 bg-zinc-900 border border-white/[0.06] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors text-sm"
                placeholder="••••••••"
                disabled={isLoading}
              />
              {form.formState.errors.password && (
                <p className="text-xs text-red-400 ml-1">{form.formState.errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-100 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignup ? "Join Waitlist" : "Sign In"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-zinc-600 text-center pt-2">
              We hate spam too. Unsubscribe anytime.
            </p>
          </form>
        </Tabs.Root>
      </div>
    </div>
  );
}
