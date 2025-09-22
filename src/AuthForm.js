import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AuthForm = ({ isLogin, onToggle, onSubmit, onGoogle, error }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[70vh] flex items-center justify-center"
    >
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold">{isLogin ? 'Sign In' : 'Create Account'}</h2>
          <p className="text-gray-600 text-sm">Access your sustainable journey</p>
        </div>
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
            </div>
          )}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded" required />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded">{isLogin ? 'Sign In' : 'Sign Up'}</button>
        </form>
        <button onClick={onGoogle} className="w-full border py-2 rounded">Continue with Google</button>
        <div className="text-center text-sm">
          <button onClick={onToggle} className="text-primary hover:underline">
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthForm;
