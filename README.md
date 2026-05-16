````md
# Swarajya AI

Swarajya AI is a multilingual AI-powered citizen assistance platform designed to improve accessibility to legal rights, government schemes, constitutional information, and public grievance guidance for Indian citizens.

The platform combines conversational AI, Retrieval-Augmented Generation (RAG), multilingual processing, document understanding, and voice interaction to simplify complex civic and legal information into understandable, actionable guidance.

---

## Project Vision

The objective of Swarajya AI is to bridge the gap between citizens and public/legal systems through artificial intelligence.

The platform is designed to:
- Improve accessibility to legal and constitutional knowledge
- Simplify government processes and welfare awareness
- Enable multilingual interaction for broader inclusivity
- Assist users in understanding official documents and PDFs
- Provide AI-powered guidance in a conversational format

---

## Core Features

### AI-Powered Citizen Assistance
- Conversational AI support for legal and civic guidance
- Context-aware responses using large language models
- Simplified explanations for complex topics

### Multilingual Support
Supports multiple Indian regional languages including:
- English
- Hindi
- Tamil
- Telugu
- Kannada
- Malayalam
- Bengali
- Marathi
- Gujarati
- Punjabi
- Urdu

### Retrieval-Augmented Generation (RAG)
- Upload and analyze PDF documents
- Extract contextual information from documents
- Ask questions directly related to uploaded PDFs
- AI-powered summarization and contextual retrieval

### Voice Interaction
- AI-generated voice responses
- Speech synthesis for multilingual output
- Browser-based speech recognition support

### Authentication & User Management
- Secure JWT-based authentication
- User-specific conversation management
- Persistent chat history storage

### Persistent Conversations
- Multiple conversation sessions
- Sidebar-based conversation history
- Conversation restoration from MongoDB database

---

## Technical Architecture

### Frontend
- React.js
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### AI & NLP
- OpenRouter API
- OpenAI-compatible models
- Retrieval-Augmented Generation pipeline

### Document Processing
- pdfjs-dist
- Custom chunk-based retrieval system

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## System Workflow

1. User sends a multilingual query or uploads a PDF document.
2. Backend processes the request and retrieves relevant contextual information.
3. AI model generates context-aware responses.
4. Conversations are stored in MongoDB for persistence.
5. Responses are returned in the selected regional language.
6. Optional speech synthesis converts responses into voice output.

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
````

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

## Running the Application

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

### Frontend Deployment

Hosted on Vercel:
https://swarajya-ai.vercel.app

### Backend Deployment

Hosted on Render:
https://swarajya-ai-backend.onrender.com

---

## Current Capabilities

* AI-powered multilingual conversations
* PDF understanding and summarization
* Contextual document querying
* Persistent user conversations
* Voice-enabled responses
* Cloud deployment with MongoDB integration
* Authentication and user session handling

---

## Future Enhancements

* Advanced semantic vector search
* Real-time streaming AI responses
* OCR support for scanned documents
* Mobile application support
* AI-generated complaint drafting
* Integration with government service APIs
* Enhanced legal dataset fine-tuning

---

## Developer

Namratha Sindhu
Information Science Engineering Student
AI and Full Stack Development Enthusiast

---

## License

This project is licensed under the MIT License.

```
```
