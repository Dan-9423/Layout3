import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type AuthMode = 'login' | 'signup';

export default function Auth() {
  const { login } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      await login(email, password);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-purple-900/80" />
        <img
          src="https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=2070"
          alt="Desert landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col p-12">
          <div className="flex items-center gap-2">
            <Camera className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">PhotoApp</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold text-white mb-4">
                Capturing Moments,
                <br />
                Creating Memories
              </h1>
              <p className="text-gray-200">
                Join our community of photographers and share your unique perspective with the world.
              </p>
            </div>
          </div>
          <Button
            variant="link"
            className="absolute top-6 right-8 text-white hover:text-white/80"
            asChild
          >
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to website
            </Link>
          </Button>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">
              {mode === 'login' ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-gray-500 mt-2">
              {mode === 'login' ? (
                <>
                  New to PhotoApp?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              {mode === 'login' && (
                <Button variant="link" className="text-purple-600 hover:text-purple-700 px-0">
                  Forgot password?
                </Button>
              )}
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full",
                "bg-purple-600 hover:bg-purple-700",
                "text-white font-medium py-2 px-4 rounded-lg",
                "transition-colors duration-200"
              )}
            >
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fill="currentColor"
                  />
                </svg>
                Facebook
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}