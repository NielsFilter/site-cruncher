import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { CrunchRunList } from '../components/crunchRuns/CrunchRunList';
import { Button } from '../components/ui/Button';
import { useCrunchRuns } from '../hooks/useCrunchRuns';
import { useCrunchers } from '../hooks/useCrunchers';

export const CruncherHistory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { crunchRuns, isLoading } = useCrunchRuns(id);
  const { crunchers, isLoading: isFetchingCrunchers } = useCrunchers();
  const [cruncher, setCruncher] = useState<any>(null);

  useEffect(() => {
    if (!isFetchingCrunchers && id) {
      const foundCruncher = crunchers.find(c => c.id === id);
      if (foundCruncher) {
        setCruncher(foundCruncher);
      } else {
        navigate('/');
      }
    }
  }, [id, crunchers, isFetchingCrunchers, navigate]);

  if (isFetchingCrunchers || !cruncher) {
    return (
      <PageLayout title="Crunch Run History">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={`${cruncher.name} - Run History`}
      subtitle="View past crawling runs and their statistics"
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
      
      <div className="bg-white dark:bg-dark-lighter rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Cruncher Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray">Model Name:</p>
            <p className="font-medium">{cruncher.modelName}</p>
          </div>
          <div>
            <p className="text-sm text-gray">Sitemap URL:</p>
            <p className="font-medium truncate" title={cruncher.sitemapUrl}>{cruncher.sitemapUrl}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Run History</h3>
        <p className="text-gray text-sm">Showing all crawl runs for this cruncher</p>
      </div>
      
      <CrunchRunList runs={crunchRuns} isLoading={isLoading} />
    </PageLayout>
  );
};
