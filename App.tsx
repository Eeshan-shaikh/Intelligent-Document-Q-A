import React, { useState, useCallback } from 'react';
import { type Message, type ChatSession } from './types';
import { askQuestion } from './services/geminiService';
import FileUpload from './components/FileUpload';
import ChatInterface from './components/ChatInterface';
import ChatHistory from './components/ChatHistory';

const NewChatIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const App: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFileUpload = (content: string, name: string) => {
    const newSession: ChatSession = {
      id: `chat_${Date.now()}`,
      fileName: name,
      fileContent: content,
      messages: [
        {
          id: 'initial-ai-message',
          sender: 'ai',
          text: `Document "${name}" is ready. What would you like to know?`,
        },
      ],
    };

    setChatHistory(prev => [...prev, newSession]);
    setActiveChatId(newSession.id);
    setError(null);
  };

  const handleSendMessage = useCallback(async (question: string, fileContent: string) => {
    if (!activeChatId) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: question };
    
    setChatHistory(prev => prev.map(chat => 
      chat.id === activeChatId ? { ...chat, messages: [...chat.messages, userMessage] } : chat
    ));
    
    setIsLoading(true);
    setError(null);

    try {
      const answer = await askQuestion(fileContent, question);
      const aiMessage: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: answer };
      setChatHistory(prev => prev.map(chat => 
        chat.id === activeChatId ? { ...chat, messages: [...chat.messages, aiMessage] } : chat
      ));
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Error fetching response: ${errorMessage}`);
      const aiErrorMessage: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: "Sorry, I encountered an error. Please try again." };
      setChatHistory(prev => prev.map(chat => 
        chat.id === activeChatId ? { ...chat, messages: [...chat.messages, aiErrorMessage] } : chat
      ));
    } finally {
      setIsLoading(false);
    }
  }, [activeChatId]);
  
  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
  };
  
  const handleNewChat = () => {
    setActiveChatId(null);
  };

  const handleDeleteChat = (idToDelete: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== idToDelete));
    setActiveChatId(null);
  };

  const activeChat = chatHistory.find(c => c.id === activeChatId);

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-900 text-gray-200 font-sans">
        {/* Mobile Overlay */}
        {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-10 lg:hidden" />}
        
        {/* Sidebar */}
        <aside className={`
            fixed lg:relative z-20
            h-full w-full max-w-sm flex-shrink-0
            flex flex-col 
            bg-slate-900/80 backdrop-blur-lg border-r border-white/10
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
        `}>
            <div className="p-6 flex flex-col h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-white">Chat History</h2>
                    <button 
                      onClick={() => {
                        handleNewChat();
                        setIsSidebarOpen(false);
                      }}
                      className="flex items-center px-3 py-2 text-sm bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors"
                    >
                      <NewChatIcon />
                      New Chat
                    </button>
                </div>
                <ChatHistory 
                    history={chatHistory} 
                    activeChatId={activeChatId} 
                    onSelectChat={(id) => {
                      handleSelectChat(id);
                      setIsSidebarOpen(false);
                    }}
                />
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            {activeChat ? (
                <ChatInterface
                    messages={activeChat.messages}
                    fileName={activeChat.fileName}
                    fileContent={activeChat.fileContent}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    chatId={activeChat.id}
                    onDeleteChat={handleDeleteChat}
                    onMenuClick={() => setIsSidebarOpen(true)}
                />
            ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                    <div className="bg-slate-900/50 rounded-2xl p-10 backdrop-blur-sm border border-white/10 max-w-2xl w-full">
                        <header className="mb-8">
                            <h1 className="text-4xl font-bold text-white tracking-tight">Intelligent Document Q&A</h1>
                            <p className="text-gray-400 mt-3 text-lg">Your personal RAG-powered document assistant.</p>
                        </header>
                        <FileUpload onFileUpload={(content, name) => {
                          handleFileUpload(content, name);
                          setIsSidebarOpen(false);
                        }} />
                    </div>
                </div>
            )}
            {error && <div className="p-4 text-red-400 bg-red-900/50 text-center flex-shrink-0">{error}</div>}
        </main>
    </div>
  );
};

export default App;