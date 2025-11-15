import React from 'react';
import { type ChatSession } from '../types';

interface ChatHistoryProps {
  history: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
}

const ChatHistoryIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400 group-hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);


const ChatHistory: React.FC<ChatHistoryProps> = ({ history, activeChatId, onSelectChat }) => {
  return (
    <div className="flex flex-col flex-grow min-h-0">
      {history.length === 0 ? (
        <div className="text-center text-gray-500 text-sm mt-4 flex-grow flex items-center justify-center">
            <p>Upload a file to start a new chat.</p>
        </div>
      ) : (
        <div className="overflow-y-auto space-y-2 pr-2 -mr-2">
            {history.map((session) => (
            <button
                key={session.id}
                onClick={() => onSelectChat(session.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors group flex items-center ${
                activeChatId === session.id
                    ? 'bg-sky-900/50'
                    : 'bg-gray-800/50 hover:bg-gray-700/70'
                }`}
            >
                <ChatHistoryIcon />
                <span className={`truncate text-sm font-medium ${activeChatId === session.id ? 'text-sky-300' : 'text-gray-300'}`}>
                    {session.fileName}
                </span>
            </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;