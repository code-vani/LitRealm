
import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ParticleBackground from '@/components/ParticleBackground';
import FloatingElements from '@/components/FloatingElements';
import MagicalButton from '@/components/MagicalButton';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await signup(formData.name, formData.email, formData.password);
      if (success) {
        toast({
          title: "Welcome to LITREALM!",
          description: "Your account has been created successfully.",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Account exists",
          description: "An account with this email already exists. Please login instead.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      <ParticleBackground />
      <FloatingElements />
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-40">
        <MagicalButton variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </MagicalButton>
      </div>

      {/* Signup Form */}
      <div className="relative z-30 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent mb-2">
              Join LITREALM
            </h1>
            <p className="text-purple-200">Create your magical literary journey</p>
          </div>

          {/* Signup Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-cyan-400 focus:ring-cyan-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-cyan-400 focus:ring-cyan-400"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-white font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-cyan-400 focus:ring-cyan-400 pr-10"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-200 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-white font-medium mb-2">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-200 focus:border-cyan-400 focus:ring-cyan-400"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1 rounded border-white/20 bg-white/10" required />
                <label className="text-sm text-purple-200">
                  I agree to the{' '}
                  <button type="button" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Signup Button */}
              <MagicalButton type="submit" className="w-full" size="lg" disabled={isLoading}>
                <Sparkles className="w-4 h-4 mr-2" />
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </MagicalButton>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <span className="text-purple-200">Already have an account? </span>
              <button
                onClick={() => navigate('/login')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
