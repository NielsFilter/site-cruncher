import React from 'react';
import { Github, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();

  const handleGoogleLogin = () => {
    login('google');
  };

  const handleGithubLogin = () => {
    login('github');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Sign in to Cruncher Nerd AI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5 text-red-500" />
          <span>Sign in with Google</span>
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={handleGithubLogin}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
        >
          <Github className="w-5 h-5" />
          <span>Sign in with GitHub</span>
        </Button>
        
        {isLoading && (
          <p className="text-center text-sm text-gray">
            Authenticating...
          </p>
        )}
      </CardContent>
    </Card>
  );
};