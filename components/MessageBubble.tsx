
import React from 'react';
import { type Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const UserIcon: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    </div>
);

const AiIcon: React.FC = () => (
    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
);


const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { sender, text } = message;
  const isUser = sender === 'user';

  const containerClasses = isUser ? 'flex justify-end items-start space-x-3' : 'flex justify-start items-start space-x-3';
  const bubbleClasses = isUser
    ? 'bg-sky-600 text-white rounded-lg rounded-br-none'
    : 'bg-slate-700 text-gray-200 rounded-lg rounded-bl-none';

  return (
    <div className={`${containerClasses} animate-fade-in-up`}>
      {!isUser && <AiIcon />}
      <div className={`p-4 max-w-lg ${bubbleClasses}`}>
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
       {isUser && <UserIcon />}
    </div>
  );
};

export default MessageBubble;
