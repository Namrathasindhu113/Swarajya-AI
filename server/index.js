import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import multer from "multer";
import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import mongoose from "mongoose";
import Chat from "./models/Chat.js";
import Conversation from "./models/Conversation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import {
  processPDF,
  retrieveRelevantChunks,
} from "./rag/ragService.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();
let pdfChunks = [];

const upload = multer({
  dest: "uploads/",
});

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// CHAT ROUTE
app.post("/chat", async (req, res) => {

  try {

    const {
      message,
      pdfText,
      conversationId,
      language = "English",
    } = req.body;

    let relevantContext = "";

if (
  pdfChunks.length > 0
) {

  relevantContext =
    await retrieveRelevantChunks(
      message,
    );

}

    const completion =
      await openai.chat.completions.create({

        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "system",
            content:`You are Swarajya AI, a helpful citizen assistant.
            Always reply in ${language} language.`,
          },
          {
            role: "user",
            content: pdfText
              ? `Relevant PDF Context:\n${relevantContext}\n\nUser Question: ${message}`
              : message,
          },
        ],

      });

    const reply =
      completion.choices[0].message.content;

    // SAVE TO CONVERSATION
    if (conversationId) {

  await Conversation.findByIdAndUpdate(
    conversationId,
    {

      $set: {
        title: message.substring(0, 30),
      },

      $push: {
        messages: {
          $each: [
            {
              sender: "user",
              text: message,
            },
            {
              sender: "ai",
              text: reply,
            },
          ],
        },
      },

    }
  );

}
    // SAVE TO CHAT HISTORY
    await Chat.create({
      userMessage: message,
      aiMessage: reply,
    });

    res.json({
      reply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });

  }

});
// HISTORY ROUTE
app.get("/history", async (req, res) => {

  try {

    const chats =
      await Chat.find().sort({
        createdAt: 1,
      });

    res.json(chats);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to fetch history",
    });

  }

});


// PDF UPLOAD ROUTE
app.post(
  "/upload-pdf",
  upload.single("pdf"),
  async (req, res) => {

    try {

      const chunks = await processPDF(
        req.file.path
      );

      pdfChunks = chunks;

      res.json({
        chunks,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: "PDF processing failed",
      });

    }

  }
);

// NEW CHAT
app.post("/new-chat", async (req, res) => {

  try {

    const { userId } = req.body;

    const conversation =
      await Conversation.create({

        title: "New Chat",

        userId,

        messages: [],

      });

    res.json(conversation);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to create chat",
    });

  }

});

// SIGNUP ROUTE
app.post("/signup", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({

        name,

        email,

        password: hashedPassword,

      });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Signup failed",
    });

  }

});

// LOGIN ROUTE
app.post("/login", async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        error: "User not found",
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        error: "Invalid credentials",
      });

    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Login failed",
    });

  }

});

// GET CONVERSATIONS
app.get("/conversations/:userId", async (req, res) => {

  try {

    const conversations =
      await Conversation.find({
        userId: req.params.userId,
      }).sort({
        createdAt: -1,
      });

    res.json(conversations);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error:
        "Failed to fetch conversations",
    });

  }

});

// GET SINGLE CONVERSATION
app.get("/conversations/:id", async (req, res) => {

  try {

    const conversation =
      await Conversation.findById(
        req.params.id
      );

    res.json(conversation);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Conversation not found",
    });

  }

});

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});
