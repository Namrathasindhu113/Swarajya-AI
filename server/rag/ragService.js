import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import {
  createEmbedding,
  cosineSimilarity,
} from "./vectorStore.js";



export const processPDF = async (filePath) => {

  const dataBuffer =
    fs.readFileSync(filePath);

  const pdf =
    await pdfjsLib.getDocument({
      data: new Uint8Array(dataBuffer),
    }).promise;

  let extractedText = "";

  for (
    let i = 1;
    i <= pdf.numPages;
    i++
  ) {

    const page =
      await pdf.getPage(i);

    const content =
      await page.getTextContent();

    const strings =
      content.items.map(
        item => item.str
      );

    extractedText +=
      strings.join(" ") + "\n";

  }

  const chunks = [];

  const chunkSize = 500;

  for (
    let i = 0;
    i < extractedText.length;
    i += chunkSize
  ) {

   const chunk =
  extractedText.slice(
    i,
    i + chunkSize
  );

const embedding =
  await createEmbedding(chunk);

chunks.push({
  text: chunk,
  embedding,
});

  }

  return chunks;

};

export const retrieveRelevantChunks =
  async (
    question,
    pdfChunks
  ) => {

    const questionEmbedding =
      await createEmbedding(
        question
      );

    const similarities =
      pdfChunks.map((chunk) => {

        const similarity =
          cosineSimilarity(
            questionEmbedding,
            chunk.embedding
          );

        return {
          text: chunk.text,
          similarity,
        };

      });

    similarities.sort(
      (a, b) =>
        b.similarity -
        a.similarity
    );

    return similarities
      .slice(0, 3)
      .map((c) => c.text)
      .join("\n");

};