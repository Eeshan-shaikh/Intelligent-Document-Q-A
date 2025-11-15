import React, { useState, useRef, useEffect } from 'react';
import { type Message } from '../types';
import MessageBubble from './MessageBubble';
import Loader from './Loader';
import ConfirmationModal from './ConfirmationModal';

interface ChatInterfaceProps {
  messages: Message[];
  fileName: string;
  fileContent: string;
  onSendMessage: (message: string, fileContent: string) => void;
  isLoading: boolean;
  chatId: string;
  onDeleteChat: (id: string) => void;
  onMenuClick: () => void;
}

const SendIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);

const DeleteIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);

const MenuIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);


const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, fileName, fileContent, onSendMessage, isLoading, chatId, onDeleteChat, onMenuClick }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim(), fileContent);
      setInputValue('');
    }
  };
  
  const handleConfirmDelete = () => {
    onDeleteChat(chatId);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center gap-4">
              <button onClick={onMenuClick} className="lg:hidden p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <MenuIcon />
              </button>
              <h2 className="text-lg font-semibold text-white truncate">
                  Chat with: <span className="font-bold text-sky-400">{fileName}</span>
              </h2>
          </div>
          <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-red-700/80 hover:bg-red-600/80 text-red-100 rounded-lg transition-colors"
          >
              <DeleteIcon />
              <span>Delete Chat</span>
          </button>
      </div>

      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start items-center space-x-3">
               <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              <div className="p-3 bg-slate-700 rounded-lg rounded-bl-none max-w-lg">
                <Loader />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-white/10 flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isLoading ? 'Thinking...' : 'Ask a question about the document...'}
            disabled={isLoading}
            className="flex-1 w-full px-4 py-3 bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-200 placeholder-gray-500 disabled:opacity-50 transition-all"
            autoComplete="off"
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="flex-shrink-0 p-3 rounded-full bg-sky-600 text-white hover:bg-sky-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <SendIcon />
          </button>
        </form>
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Chat Confirmation"
        message="Are you sure you want to delete this chat? This will remove the chat and its history permanently."
      />
    </div>
  );
};

export default ChatInterface;