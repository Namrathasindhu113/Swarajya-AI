import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaMicrophone } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

function App() {

  const token = localStorage.getItem("token");

  if (!token) {

    window.location.href = "/login";

    return null;

  }

useEffect(() => {

  fetchConversations();

  if (!token) {

    window.location.href = "/login";

  }

}, []);

const decoded =
  jwtDecode(token);

const userId =
  decoded.id || decoded._id;

  console.log("USER ID:", userId);

  const welcomeMessage = {
    sender: "ai",
    text: "👋 Hello! I am Swarajya AI. How can I help you today?"
  };

  const [messages, setMessages] = useState([
    welcomeMessage
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [pdfText, setPdfText] = useState("");

  const [language, setLanguage] =
  useState("English");

  const [currentConversationId,
    setCurrentConversationId] = useState("");

  const [conversations, setConversations] =
    useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {

    fetchConversations();


  }, []);

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  const fetchConversations = async () => {

  try {

      const response =
      await axios.get(
        `https://swarajya-ai-backend.onrender.com/conversations/${userId}`
      );

    console.log(
      "CONVERSATIONS:",
      response.data
    );

    setConversations(
      response.data || []
    );

  } catch (error) {

    console.log(error);

    setConversations([]);

  }

 };

  const createNewChat = async () => {

    try {

      const response = await axios.post(
        "https://swarajya-ai-backend.onrender.com/new-chat",

        {
          userId,
        }
      );

      fetchConversations();

      setCurrentConversationId(
        response.data._id
      );

      setMessages([
        welcomeMessage
      ]);

      setPdfText("");

    } catch (error) {

      console.log(error);

    }

  };

const speakText = (
  text,
  lang = "English"
 ) => {

  window.speechSynthesis.cancel();

const speech =
    new SpeechSynthesisUtterance(
      text
    );

  const languageMap = {

    English: "en-IN",

    Hindi: "hi-IN",

    Tamil: "ta-IN",

    Telugu: "te-IN",

    Kannada: "kn-IN",

    Malayalam: "ml-IN",

    Bengali: "bn-IN",

    Marathi: "mr-IN",

    Gujarati: "gu-IN",

    Punjabi: "pa-IN",

    Urdu: "ur-PK",

  };

  speech.lang =
    languageMap[lang] ||
    "en-IN";

  speech.rate = 1;

  speech.pitch = 1;

  const voices =
    window.speechSynthesis.getVoices();

  const matchedVoice =
    voices.find((voice) =>
      voice.lang
        .toLowerCase()
        .includes(
          speech.lang
            .toLowerCase()
        )
    );

  if (matchedVoice) {

    speech.voice =
      matchedVoice;

  }

  window.speechSynthesis.speak(
    speech
  );

};

  const handlePdfUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("pdf", file);

    try {

      const response = await axios.post(
        "https://swarajya-ai-backend.onrender.com/upload-pdf",
        formData
      );

      setPdfText(response.data.text);
      console.log(response.data);
      console.log(response.data.text);

      alert("PDF uploaded successfully!");

    } catch (error) {

      console.log(error);

      alert("PDF upload failed");

    }

  };

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert("Speech Recognition not supported");

      return;

    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.start();

    recognition.onresult = (event) => {

      const transcript =
        event.results[0][0].transcript;

      setInput(transcript);

    };

  };

  const loadConversation = async (id) => {

  try {

    const response = await axios.get(
      `https://swarajya-ai-backend.onrender.com/conversation/${id}`
    );

    setCurrentConversationId(id);

    if (
      response.data &&
      response.data.messages
    ) {

      setMessages(
        response.data.messages
      );

    }

  } catch (error) {

    console.log(error);

  }

};

  const handleSend = async () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const userInput = input;

    setInput("");

    setLoading(true);

    try {

      const response = await axios.post(
        "https://swarajya-ai-backend.onrender.com/chat",
        {
          message: userInput,
          language,
          pdfText: pdfText,
          conversationId:
            currentConversationId,
        }
      );

      const aiMessage = {
        sender: "ai",
        text: response.data.reply,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
        
      ]);

      fetchConversations();

      
    } catch (error) {

      console.log(error);

      const errorMessage = {
        sender: "ai",
        text: "⚠️ Something went wrong.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}
      <div className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen p-4">

        <button
          onClick={createNewChat}
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold mb-6 transition"
        >
          + New Chat
        </button>

        <div className="space-y-3">

          {Array.isArray(conversations) &&
            conversations.map((chat) => (

  <div
    key={chat._id}
    onClick={() =>
      loadConversation(chat._id)
    }
    className="bg-slate-800 hover:bg-slate-700 transition p-4 rounded-2xl cursor-pointer mb-3 text-white"
  >

    {
      chat.title ||
      chat.messages?.[0]?.text ||
      "New Chat"
    }

  </div>

))}
        </div>

      </div>

      {/* Main */}
      <div className="flex-1">

        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">

          <h1 className="text-3xl font-bold text-cyan-400">
            Swarajya AI
          </h1>

          <div className="flex gap-3">

  {localStorage.getItem("token") ? (

    <button
      onClick={() => {

        localStorage.removeItem("token");

        window.location.href = "/login";

      }}
      className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold transition"
    >
      Logout
    </button>

  ) : (

    <>

      <button
        onClick={() => {
          window.location.href = "/login";
        }}
        className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl font-semibold transition"
      >
        Login
      </button>

      <button
        onClick={() => {
          window.location.href = "/signup";
        }}
        className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-semibold transition"
      >
        Signup
      </button>

    </>

  )}

</div>
        </nav>

        {/* Hero */}
        <section className="text-center mt-10 px-4">

          <h2 className="text-5xl font-bold leading-tight">
            Multilingual
            <span className="text-cyan-400">
              {" "}AI Citizen Assistant
            </span>
          </h2>

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
            Swarajya AI helps citizens understand legal rights,
            government schemes, complaint procedures,
            and official documents using AI-powered conversations.
          </p>

        </section>

        {/* Chat */}
        <div className="max-w-5xl mx-auto mt-10 px-4 pb-20">

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">

            {/* Messages */}
            <div className="space-y-4 min-h-[500px] max-h-[500px] overflow-y-auto">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[75%] px-5 py-4 rounded-2xl whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-800 text-white"
                    }`}
                  >

                    <div className="flex items-center gap-2">

                      <span>{msg.text}</span>

                      {msg.sender === "ai" && (

                        <button
                          onClick={() =>
                            speakText(msg.text,language)
                          }
                          className="bg-cyan-500 hover:bg-cyan-600 px-2 py-1 rounded-lg text-sm"
                        >
                          🔊
                        </button>

                      )}

                    </div>

                  </div>

                </div>

              ))}

              {loading && (

                <div className="flex justify-start">

                  <div className="bg-slate-800 px-5 py-3 rounded-2xl animate-pulse">
                    🤖 Thinking...
                  </div>

                </div>

              )}

              <div ref={chatEndRef}></div>

            </div>

            {/* Input */}
            <div className="flex gap-4 mt-8">
              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value)
                }
                className="bg-slate-800 text-white px-4 py-3 rounded-xl"
            >

  <option>English</option>
  <option>Hindi</option>
  <option>Kannada</option>
  <option>Tamil</option>
  <option>Telugu</option>
  <option>Malayalam</option>
  <option>Bengali</option>
  <option>Marathi</option>
  <option>Gujarati</option>
  <option>Punjabi</option>
  <option>Odia</option>
  <option>Assamese</option>
  <option>Urdu</option>
  <option>Konkani</option>
  <option>Manipuri</option>
  <option>Kashmiri</option>
  <option>Sanskrit</option>
  <option>Nepali</option>
  <option>Bodo</option>
  <option>Dogri</option>
  <option>Maithili</option>
  <option>Santali</option>
  <option>Sindhi</option>

</select>

              {/* PDF */}
              <label className="bg-slate-800 hover:bg-slate-700 px-5 py-4 rounded-2xl cursor-pointer transition">

                📄

                <input
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={handlePdfUpload}
                />

              </label>

              {/* Input */}
              <input
                type="text"
                placeholder="Ask about laws, schemes, rights..."
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400"
                onKeyDown={(e) => {

                  if (e.key === "Enter") {

                    handleSend();

                  }

                }}
              />

              {/* Voice */}
              <button
                onClick={startListening}
                className="bg-slate-800 hover:bg-slate-700 px-5 py-4 rounded-2xl transition"
              >

                <FaMicrophone size={20} />

              </button>

              {/* Send */}
              <button
                onClick={handleSend}
                className="bg-cyan-500 hover:bg-cyan-600 px-6 py-4 rounded-2xl font-semibold transition"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default App;