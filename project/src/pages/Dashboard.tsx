import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, AlertCircle } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/Button';
import { CruncherCard } from '../components/crunchers/CruncherCard';
import { useCrunchers } from '../hooks/useCrunchers';
import { useCrunchRuns } from '../hooks/useCrunchRuns';
import { useAuth } from '../context/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { crunchers, isLoading: isLoadingCrunchers, deleteCruncher } = useCrunchers();
  const { startCrunchRun, isLoading: isStartingCrunch } = useCrunchRuns();
  const [crunchingId, setCrunchingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleStartCrunch = async (id: string) => {
    setCrunchingId(id);
    try {
      await startCrunchRun(id);
      // Show success message
    } catch (error) {
      console.error('Failed to start crunch run:', error);
    } finally {
      setCrunchingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    // In a real app, this would show a confirmation dialog
    if (window.confirm('Are you sure you want to delete this cruncher?')) {
      try {
        await deleteCruncher(id);
      } catch (error) {
        console.error('Failed to delete cruncher:', error);
      }
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <PageLayout
      title="Your Crunchers"
      subtitle="Create, manage, and chat with AI assistants trained on your data"
    >
      <div className="mb-6 flex justify-end">
        <Button 
          onClick={() => navigate('/crunchers/new')}
          icon={<Plus className="w-4 h-4" />}
        >
          New Cruncher
        </Button>
      </div>
      
      {isLoadingCrunchers ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : crunchers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray mb-4" />
          <h3 className="text-lg font-medium text-dark mb-2">No crunchers found</h3>
          <p className="text-gray mb-4">
            Create your first cruncher to start analyzing websites with AI.
          </p>
          <Button 
            onClick={() => navigate('/crunchers/new')}
            icon={<Plus className="w-4 h-4" />}
          >
            Create Your First Cruncher
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crunchers.map((cruncher) => (
            <CruncherCard
              key={cruncher.id}
              cruncher={cruncher}
              onDelete={handleDelete}
              onStartCrunch={(id) => {
                if (crunchingId === null) {
                  handleStartCrunch(id);
                }
              }}
            />
          ))}
        </div>
      )}
    </PageLayout>
  );
};