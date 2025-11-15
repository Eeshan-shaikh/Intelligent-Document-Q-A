export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export interface ChatSession {
  id: string;
  fileName: string;
  fileContent: string;
  messages: Message[];
}
