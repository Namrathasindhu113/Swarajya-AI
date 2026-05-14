import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const createEmbedding = async (
  text
) => {

  const response =
    await openai.embeddings.create({

      model: "text-embedding-3-small",

      input: text,

    });

  return response.data[0].embedding;

};

export const cosineSimilarity = (
  vecA,
  vecB
) => {

  let dotProduct = 0;

  let normA = 0;

  let normB = 0;

  for (
    let i = 0;
    i < vecA.length;
    i++
  ) {

    dotProduct +=
      vecA[i] * vecB[i];

    normA +=
      vecA[i] * vecA[i];

    normB +=
      vecB[i] * vecB[i];

  }

  return (
    dotProduct /
    (
      Math.sqrt(normA) *
      Math.sqrt(normB)
    )
  );

};