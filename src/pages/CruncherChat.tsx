import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { ChatInterface } from '../components/chat/ChatInterface';
import { Button } from '../components/ui/Button';
import { useCrunchers } from '../hooks/useCrunchers';

export const CruncherChat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { crunchers, isLoading } = useCrunchers();
  const [cruncher, setCruncher] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && id) {
      const foundCruncher = crunchers.find(c => c.id === id);
      if (foundCruncher) {
        setCruncher(foundCruncher);
      } else {
        navigate('/');
      }
    }
  }, [id, crunchers, isLoading, navigate]);

  if (isLoading || !cruncher) {
    return (
      <PageLayout title="Cruncher Chat">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`Chat with ${cruncher.name}`}
      subtitle="Ask questions about your crawled content"
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
      
      <div className="bg-white rounded-lg shadow-md h-[calc(100vh-280px)] min-h-[500px] flex flex-col">
        <ChatInterface cruncherId={cruncher.id} cruncherName={cruncher.name} />
      </div>
    </PageLayout>
  );
};
