import React from 'react';
import { Brain } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user } = useAuth();
  const isUser = message.role === 'user';

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`flex max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div className="flex-shrink-0">
          {isUser ? (
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0D8ABC&color=fff`}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Brain className="text-white w-6 h-6" />
            </div>
          )}
        </div>
        
        <div 
          className={`mx-2 px-4 py-2 rounded-lg ${
            isUser 
              ? 'bg-primary text-white' 
              : 'bg-white border border-gray shadow-sm'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          <div 
            className={`text-xs mt-1 ${
              isUser ? 'text-primary-light' : 'text-gray'
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
