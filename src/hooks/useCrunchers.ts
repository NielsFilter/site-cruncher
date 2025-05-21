import { useState, useEffect } from 'react';
import { Cruncher } from '../types';
import { useAuth } from '../context/AuthContext';
import CryptoJS from 'crypto-js';

// This would be replaced with actual API calls in a real app
const MOCK_CRUNCHERS: Cruncher[] = [
  {
    id: '1',
    userId: '123456',
    name: 'Documentation Cruncher',
    modelKey: '******************', // Encrypted
    modelName: 'gpt-4-turbo',
    systemPrompt: 'You are a helpful AI assistant that provides accurate information based on the crawled documentation.',
    sitemapUrl: 'https://example.com/sitemap.xml',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    userId: '123456',
    name: 'Blog Crawler',
    modelKey: '******************', // Encrypted
    modelName: 'gpt-4-turbo',
    systemPrompt: 'You are a blog summarizer that can answer questions based on blog content.',
    sitemapUrl: 'https://blog.example.com/sitemap.xml',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10'),
  },
];

export const useCrunchers = () => {
  const { user } = useAuth();
  const [crunchers, setCrunchers] = useState<Cruncher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCrunchers = async () => {
      setIsLoading(true);
      try {
        // This is a mock implementation. In a real app, this would be an API call
        if (user) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          setCrunchers(MOCK_CRUNCHERS.filter(cruncher => cruncher.userId === user.id));
        } else {
          setCrunchers([]);
        }
      } catch (err) {
        setError('Failed to fetch crunchers. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCrunchers();
  }, [user]);

  const encryptModelKey = (key: string): string => {
    // In a real app, use a secure encryption key stored in environment variables
    const encryptionKey = 'SECURE_ENCRYPTION_KEY';
    return CryptoJS.AES.encrypt(key, encryptionKey).toString();
  };

  const decryptModelKey = (encryptedKey: string): string => {
    // In a real app, use a secure encryption key stored in environment variables
    const encryptionKey = 'SECURE_ENCRYPTION_KEY';
    const bytes = CryptoJS.AES.decrypt(encryptedKey, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const createCruncher = async (cruncher: Omit<Cruncher, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      // Encrypt the model key before storing
      const encryptedModelKey = encryptModelKey(cruncher.modelKey);
      
      // This is a mock implementation. In a real app, this would be an API call
      const newCruncher: Cruncher = {
        ...cruncher,
        id: Math.random().toString(36).substr(2, 9),
        userId: user?.id || '',
        modelKey: encryptedModelKey,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setCrunchers(prev => [...prev, newCruncher]);
      return newCruncher;
    } catch (err) {
      setError('Failed to create cruncher. Please try again.');
      console.error(err);
      throw err;
    }
  };

  const updateCruncher = async (id: string, updates: Partial<Cruncher>) => {
    try {
      // If modelKey is included in updates, encrypt it
      let updatedData = { ...updates };
      if (updates.modelKey) {
        updatedData.modelKey = encryptModelKey(updates.modelKey);
      }
      
      // This is a mock implementation. In a real app, this would be an API call
      setCrunchers(prev => prev.map(cruncher => 
        cruncher.id === id 
          ? { ...cruncher, ...updatedData, updatedAt: new Date() } 
          : cruncher
      ));
    } catch (err) {
      setError('Failed to update cruncher. Please try again.');
      console.error(err);
      throw err;
    }
  };

  const deleteCruncher = async (id: string) => {
    try {
      // This is a mock implementation. In a real app, this would be an API call
      setCrunchers(prev => prev.filter(cruncher => cruncher.id !== id));
    } catch (err) {
      setError('Failed to delete cruncher. Please try again.');
      console.error(err);
      throw err;
    }
  };

  return {
    crunchers,
    isLoading,
    error,
    createCruncher,
    updateCruncher,
    deleteCruncher,
    encryptModelKey,
    decryptModelKey,
  };
};