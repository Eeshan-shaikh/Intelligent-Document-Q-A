# Intelligent Document Q&A  

A document-question-answering system built with Retrieval-Augmented Generation (RAG).  
Upload a document (PDF/TXT etc.), ask questions about its content, and get intelligent answers driven by an LLM and embeddings.

---

## 🚀 Table of Contents  
- [Why this project?](#why-this-project)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  

---

## 🧠 Why this project?  
In many real-world scenarios, you have documents (reports, user manuals, research papers) and you want to **ask questions about them** rather than scan manually.  
This project — where we **retrieve** relevant chunks from a document, then **augment** a model’s context with them, and finally **generate** an answer grounded in the document. :contentReference[oaicite:1]{index=1}  
It enables smarter, more context-aware answers tied to your own uploaded documents.

---

## ✅ Features  
- Upload a document (PDF, TXT, maybe DOCX)  
- Extract and chunk the text intelligently  
- Generate embeddings for chunks and store a vector index  
- Accept user queries and retrieve the most relevant chunks  
- Pass the retrieved context + query into an LLM to generate the answer  
- Show the answer along with citation/source chunks (optional)  
- Clean & minimal UI for streaming queries  

---

## 🧰 Tech Stack  
- **Frontend**: React + TypeScript  
- **Backend/API**: Node.js / Express 
- **Document processing**: PDF parsing, text extraction, chunking  
- **Embeddings**: e.g., Sentence-Transformers / OpenAI embeddings (depending on implementation)  
- **Vector store**: (e.g., Pinecone / Chroma / local index)  
- **Large Language Model (LLM)**: (Gemini API as per your description)  
- `.gitignore`, `metadata.json`, and config files included  

---

## 🛠 Getting Started  

### Prerequisites  
- Node.js (v16+ recommended)  
- npm or yarn  
- API keys for (if used):  
  - LLM service (e.g., Gemini)  
  - Embeddings service  
  - Vector database (Pinecone, etc)  
- Access to a PDF or text document to test  

### Installation  
```bash
# Clone repository
git clone https://github.com/Eeshan-shaikh/Intelligent-Document-Q-A.git
cd Intelligent-Document-Q-A

# Install dependencies
npm install
# or
yarn install

### Running Locally
# For development
npm run dev
# or
yarn dev

# Build for production
npm run build
# Then serve
npm run preview

