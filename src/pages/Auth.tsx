import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, BookOpen, Calculator, Star } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, displayName);
      }

      if (result.error) {
        setError(result.error.message);
      } else if (!isLogin) {
        setError('Please check your email to confirm your account!');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="p-2 bg-primary/20 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div className="p-2 bg-secondary/20 rounded-full">
              <Calculator className="h-6 w-6 text-secondary" />
            </div>
            <div className="p-2 bg-accent/20 rounded-full">
              <Star className="h-6 w-6 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Welcome to Learniverse
          </h1>
          <p className="text-muted-foreground">
            Your personalized learning adventure awaits!
          </p>
        </div>

        {/* Auth Form */}
        <Card className="border-0 shadow-xl bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Welcome back! Sign in to continue your learning journey.'
                : 'Join thousands of students already learning with us!'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Enter your name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required={!isLogin}
                    className="h-12"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              {error && (
                <Alert variant={error.includes('check your email') ? 'default' : 'destructive'}>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold" 
                disabled={loading}
                variant="hero"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="p-0 h-auto font-semibold text-primary"
              >
                {isLogin ? 'Create one here' : 'Sign in here'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Interactive Lessons</p>
          </div>
          <div className="space-y-2">
            <div className="h-12 w-12 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-secondary" />
            </div>
            <p className="text-xs text-muted-foreground">Earn Achievements</p>
          </div>
          <div className="space-y-2">
            <div className="h-12 w-12 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
              <Calculator className="h-6 w-6 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground">Track Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;