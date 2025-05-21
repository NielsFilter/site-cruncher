import React from 'react';
import { format } from 'date-fns';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { CrunchRun } from '../../types';

interface CrunchRunListProps {
  runs: CrunchRun[];
  isLoading: boolean;
}

export const CrunchRunList: React.FC<CrunchRunListProps> = ({ runs, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (runs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray">No crunch runs found. Start a new crunch to see results here.</p>
      </div>
    );
  }

  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes === 0) {
      return `${seconds} seconds`;
    }
    
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-error" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-warning animate-pulse" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">Pages Crawled</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">Chunks Generated</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">Duration</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {runs.map((run) => (
            <tr key={run.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getStatusIcon(run.status)}
                  <span className="ml-2 text-sm capitalize">
                    {run.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {format(new Date(run.timestamp), 'MMM d, yyyy h:mm a')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {run.totalPagesCrawled}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {run.totalChunksGenerated}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {formatDuration(run.crawlDuration)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};