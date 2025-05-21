import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { CruncherForm, CruncherFormData } from '../components/crunchers/CruncherForm';
import { useCrunchers } from '../hooks/useCrunchers';
import { Button } from '../components/ui/Button';

export const CreateCruncher: React.FC = () => {
  const { createCruncher } = useCrunchers();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: CruncherFormData) => {
    setIsLoading(true);
    try {
      await createCruncher(data);
      navigate('/');
    } catch (error) {
      console.error('Failed to create cruncher:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout
      title="Create New Cruncher"
      subtitle="Set up a new AI assistant to crawl and process your website"
    >
      <div className="mb-6">
        <Link to="/">
          <Button
            variant="outline"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Crunchers
          </Button>
        </Link>
      </div>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <CruncherForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </PageLayout>
  );
};