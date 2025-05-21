import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [storeChatHistory, setStoreChatHistory] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Mock saving settings
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <PageLayout
      title="Settings"
      subtitle="Manage your account and preferences"
    >
      <div className="mb-6">
        <Link to="/">
          <Button
            variant="outline"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0D8ABC&color=fff`}
                alt={user?.name || 'User'}
                className="w-20 h-20 rounded-full mb-4 md:mb-0 md:mr-6"
              />
              <div>
                <h3 className="text-xl font-semibold">{user?.name}</h3>
                <p className="text-gray">{user?.email}</p>
                <p className="text-sm text-gray mt-1">
                  Signed in with {user?.authProvider.charAt(0).toUpperCase() + user?.authProvider.slice(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Store Chat History</h4>
                  <p className="text-sm text-gray">
                    When enabled, your chat conversations will be saved
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={storeChatHistory}
                    onChange={(e) => setStoreChatHistory(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray rounded-full peer peer-checked:bg-primary"></div>
                  <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium mb-2">Theme</h4>
              <div className="flex space-x-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`px-4 py-2 rounded-md ${
                    theme === 'light'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-dark dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-4 py-2 rounded-md ${
                    theme === 'dark'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-dark dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`px-4 py-2 rounded-md ${
                    theme === 'system'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-dark dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  System
                </button>
              </div>
            </div>

            <Button
              onClick={handleSaveSettings}
              isLoading={isSaving}
            >
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};