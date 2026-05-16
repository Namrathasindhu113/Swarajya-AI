import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

let storedChunks = [];

export const processPDF = async (filePath) => {

  const data = new Uint8Array(
    fs.readFileSync(filePath)
  );

  const pdf =
    await pdfjsLib.getDocument({
      data,
    }).promise;

  let text = "";

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
        (item) => item.str
      );

    text +=
      strings.join(" ") + " ";

  }

  storedChunks =
    text.match(/.{1,500}/g) || [];

  return storedChunks;

};

export const retrieveRelevantChunks =
  async (query) => {

    if (
      storedChunks.length === 0
    ) {

      return "No PDF uploaded";

    }

    return storedChunks
      .slice(0, 3)
      .join(" ");

};