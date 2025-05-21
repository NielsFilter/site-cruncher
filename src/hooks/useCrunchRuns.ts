import { useState, useEffect } from 'react';
import { CrunchRun } from '../types';

// This would be replaced with actual API calls in a real app
const MOCK_CRUNCH_RUNS: CrunchRun[] = [
  {
    id: '1',
    cruncherId: '1',
    timestamp: new Date('2023-01-20T14:30:00'),
    totalPagesCrawled: 42,
    totalChunksGenerated: 156,
    crawlDuration: 83500, // 83.5 seconds
    status: 'completed',
  },
  {
    id: '2',
    cruncherId: '1',
    timestamp: new Date('2023-01-15T09:45:00'),
    totalPagesCrawled: 38,
    totalChunksGenerated: 132,
    crawlDuration: 75200, // 75.2 seconds
    status: 'completed',
  },
  {
    id: '3',
    cruncherId: '2',
    timestamp: new Date('2023-02-11T16:20:00'),
    totalPagesCrawled: 65,
    totalChunksGenerated: 210,
    crawlDuration: 110300, // 110.3 seconds
    status: 'completed',
  },
];

export const useCrunchRuns = (cruncherId?: string) => {
  const [crunchRuns, setCrunchRuns] = useState<CrunchRun[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCrunchRuns = async () => {
      setIsLoading(true);
      try {
        // This is a mock implementation. In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const runs = cruncherId 
          ? MOCK_CRUNCH_RUNS.filter(run => run.cruncherId === cruncherId)
          : MOCK_CRUNCH_RUNS;
        
        setCrunchRuns(runs);
      } catch (err) {
        setError('Failed to fetch crunch runs. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCrunchRuns();
  }, [cruncherId]);

  const startCrunchRun = async (cruncherId: string): Promise<CrunchRun> => {
    try {
      setIsLoading(true);
      
      // Mock starting a new crunch run
      const newRun: CrunchRun = {
        id: Math.random().toString(36).substr(2, 9),
        cruncherId,
        timestamp: new Date(),
        totalPagesCrawled: 0,
        totalChunksGenerated: 0,
        crawlDuration: 0,
        status: 'in-progress',
      };
      
      setCrunchRuns(prev => [...prev, newRun]);
      
      // Simulate crawling process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update the run with "completed" status and random stats
      const completedRun: CrunchRun = {
        ...newRun,
        totalPagesCrawled: Math.floor(Math.random() * 50) + 20,
        totalChunksGenerated: Math.floor(Math.random() * 150) + 50,
        crawlDuration: Math.floor(Math.random() * 120000) + 30000,
        status: 'completed',
      };
      
      setCrunchRuns(prev => 
        prev.map(run => run.id === newRun.id ? completedRun : run)
      );
      
      return completedRun;
    } catch (err) {
      const failedRun: CrunchRun = {
        id: Math.random().toString(36).substr(2, 9),
        cruncherId,
        timestamp: new Date(),
        totalPagesCrawled: 0,
        totalChunksGenerated: 0,
        crawlDuration: 0,
        status: 'failed',
        error: 'Failed to complete crunch run',
      };
      
      setCrunchRuns(prev => [...prev, failedRun]);
      
      setError('Failed to complete crunch run. Please try again.');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    crunchRuns,
    isLoading,
    error,
    startCrunchRun,
  };
};
