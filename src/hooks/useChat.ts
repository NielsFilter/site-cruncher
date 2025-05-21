import { useState } from 'react';
import { ChatMessage } from '../types';

export const useChat = (cruncherId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Add user message to the chat
      const userMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        cruncherId,
        role: 'user',
        content,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);

      // Simulate API delay for getting assistant response
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock assistant response
      const assistantMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        cruncherId,
        role: 'assistant',
        content: generateMockResponse(content),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      return assistantMessage;
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to generate responses
  const generateMockResponse = (userMessage: string): string => {
    const responses = [
      "Based on the crawled data, I can tell you that this information is relevant to your query.",
      "I've analyzed the content and found several interesting connections to your question.",
      "The documents I've processed suggest that there are multiple perspectives on this topic.",
      "According to the data I've crunched, there are several important factors to consider here.",
      "I've searched through the vectorized content and found some helpful information for you.",
    ];
    
    return `${responses[Math.floor(Math.random() * responses.length)]} Your query was about "${userMessage.substring(0, 50)}${userMessage.length > 50 ? '...' : ''}"`;
  };

  const clearChat = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
};