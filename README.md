# Swarajya AI

### A Multilingual AI-Powered Legal Rights & Government Services Assistant

---

## Overview

Swarajya AI is an intelligent conversational platform designed to simplify access to legal rights, government schemes, grievance procedures, and official documentation for Indian citizens.

The platform leverages conversational AI, Retrieval-Augmented Generation (RAG), multilingual processing, and document intelligence to bridge the gap between complex legal systems and everyday users through a modern AI-powered interface.

---

## Core Features

### AI-Powered Citizen Assistance

* Conversational AI support for legal and civic guidance
* Context-aware responses using advanced language models
* Simplified explanations for constitutional and legal topics

### Multilingual Support

Supports multiple regional languages including:

* English
* Hindi
* Tamil
* Telugu
* Kannada
* Malayalam
* Bengali
* Marathi
* Gujarati
* Punjabi
* Urdu

### PDF Intelligence & RAG System

* Upload and analyze PDF documents
* Retrieval-Augmented Generation (RAG)
* Context-based document querying
* AI-powered summarization and explanation

### Voice Interaction

* Speech-to-text support
* AI voice response generation
* Multilingual audio interaction

### Authentication & User Management

* JWT-based secure authentication
* Persistent user conversations
* Conversation history management

### Conversation Persistence

* Dynamic sidebar conversation history
* MongoDB conversation storage
* Real-time conversation retrieval

---

## Technical Stack

### Frontend

* React.js
* Vite
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### AI & NLP

* OpenRouter API
* OpenAI-compatible LLMs
* Retrieval-Augmented Generation (RAG)

### Document Processing

* pdfjs-dist
* Custom chunk retrieval pipeline

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## System Architecture

```text
Client (React + Vite)
        │
        ▼
Express.js Backend API
        │
 ┌───────────────┐
 │ OpenRouter AI │
 └───────────────┘
        │
 ┌───────────────┐
 │ MongoDB Atlas │
 └───────────────┘
        │
 ┌───────────────┐
 │ PDF RAG Layer │
 └───────────────┘
```

---

## Project Structure

```text
Swarajya-AI/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── models/
│   ├── rag/
│   ├── uploads/
│   ├── index.js
│   └── package.json
│
├── README.md
└── .env
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Namrathasindhu113/Swarajya-AI.git
cd Swarajya-AI
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

OPENROUTER_API_KEY=your_openrouter_api_key
```

---

## Running the Project

### Start Backend

```bash
cd server
node index.js
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## Deployment

### Frontend

[https://swarajya-ai.vercel.app](https://swarajya-ai.vercel.app)

### Backend

[https://swarajya-ai-backend.onrender.com](https://swarajya-ai-backend.onrender.com)

---

## Current Capabilities

* Multilingual AI conversations
* AI-powered PDF analysis
* Context-aware RAG pipeline
* Voice-enabled interaction
* Persistent conversation history
* Authentication and session management
* Cloud deployment architecture

---

## Future Enhancements

* Semantic vector database integration
* OCR support for scanned documents
* Real-time streaming AI responses
* Government API integrations
* AI complaint drafting system
* Mobile application deployment
* Advanced legal fine-tuned models

---

## Developer

**Namratha Sindhu**
Information Science Engineering Student
AI & Full Stack Development Enthusiast

---

## License

This project is licensed under the MIT License.
