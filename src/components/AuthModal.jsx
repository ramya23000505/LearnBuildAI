import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { authModalOpen, authMode, setAuthMode, closeModal, login, register, resetPassword, continueAsGuest } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (authMode === 'signup') {
        if (!name.trim()) throw new Error('Please enter your full name');
        if (!email.trim() || !password) throw new Error('Email and password are required');
        if (password.length < 6) throw new Error('Password must be at least 6 characters');
        await register(name, email, password);
      } else if (authMode === 'forgot') {
        if (!email.trim() || !password) throw new Error('Email and new password are required');
        if (password.length < 6) throw new Error('New password must be at least 6 characters');
        const res = await resetPassword(email, password);
        setSuccessMessage(res.message || 'Password reset successfully!');
      } else {
        if (!email.trim() || !password) throw new Error('Email and password are required');
        await login(email, password);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Make sure the backend server is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/10">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-3">
            {authMode === 'forgot' ? <KeyRound className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            {authMode === 'login'
              ? 'Welcome Back Student'
              : authMode === 'signup'
              ? 'Create Student Account'
              : 'Reset Student Password'}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {authMode === 'login'
              ? 'Log in to sync your roadmaps, assessment history, and readiness scores'
              : authMode === 'signup'
              ? 'Sign up to persist your project progress to your secure student profile'
              : 'Enter your registered email and a new password to reset your account credentials'}
          </p>
        </div>

        {/* Auth Mode Toggle Tabs (Shown for Login & Signup) */}
        {authMode !== 'forgot' && (
          <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-gray-800 mb-6">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field (Signup Only) */}
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-gray-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Student Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-gray-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-300">
                {authMode === 'forgot' ? 'New Password' : 'Password'}
              </label>

              {/* FORGOT PASSWORD LINK IN LOGIN MODE */}
              {authMode === 'login' && (
                <button
                  type="button"
                  onClick={() => { setAuthMode('forgot'); setErrorMessage(''); setSuccessMessage(''); }}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer transition-colors"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-gray-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-gray-500 hover:text-gray-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>
                  {authMode === 'login'
                    ? 'Log In to Profile'
                    : authMode === 'signup'
                    ? 'Create Profile & Sync'
                    : 'Reset Password & Log In'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Back to Login Link when in Forgot Mode */}
        {authMode === 'forgot' && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className="text-xs text-gray-400 hover:text-white font-medium underline cursor-pointer transition-colors"
            >
              ← Back to Log In
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
          <span className="relative bg-slate-900 px-3 text-[11px] font-mono text-gray-500 uppercase">Or</span>
        </div>

        {/* Continue as Guest Button */}
        <button
          type="button"
          onClick={continueAsGuest}
          className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-gray-800 text-gray-300 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="h-4 w-4 text-amber-400" /> Continue as Guest (Offline Mode)
        </button>

      </div>
    </div>
  );
}
