import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-white" />
                <span className="ml-2 text-white text-xl font-bold">Cruncher Nerd AI</span>
              </div>
            </Link>
          </div>
          
          {user ? (
            <div className="flex items-center">
              <Link to="/settings" className="text-white hover:text-gray-200 mr-4">
                <Settings className="h-5 w-5" />
              </Link>
              <div className="relative ml-3">
                <div className="flex items-center">
                  <img
                    className="h-8 w-8 rounded-full border-2 border-white"
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
                    alt={user.name}
                  />
                  <span className="ml-2 text-white text-sm">{user.name}</span>
                  <Button
                    variant="ghost"
                    className="ml-2 text-white hover:text-gray-200"
                    onClick={handleLogout}
                    icon={<LogOut className="h-4 w-4" />}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:text-gray-200">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
