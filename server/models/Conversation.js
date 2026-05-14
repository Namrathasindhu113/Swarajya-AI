import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({

  title: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  messages: [
    {
      sender: String,
      text: String,
    },
  ],

}, {
  timestamps: true,
});

export default mongoose.model(
  "Conversation",
  conversationSchema
);