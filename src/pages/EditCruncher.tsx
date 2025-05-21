import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { CruncherForm, CruncherFormData } from '../components/crunchers/CruncherForm';
import { useCrunchers } from '../hooks/useCrunchers';
import { Button } from '../components/ui/Button';

export const EditCruncher: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { crunchers, updateCruncher, isLoading: isFetchingCrunchers } = useCrunchers();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const cruncher = crunchers.find(c => c.id === id);

  useEffect(() => {
    if (!isFetchingCrunchers && !cruncher) {
      navigate('/');
    }
  }, [cruncher, isFetchingCrunchers, navigate]);

  const handleSubmit = async (data: CruncherFormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      await updateCruncher(id, data);
      navigate('/');
    } catch (error) {
      console.error('Failed to update cruncher:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetchingCrunchers || !cruncher) {
    return (
      <PageLayout title="Edit Cruncher">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`Edit Cruncher: ${cruncher.name}`}
      subtitle="Update your cruncher's settings"
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
          initialData={cruncher}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>
    </PageLayout>
  );
};
