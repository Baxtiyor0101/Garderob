// translate.js
import fs from "fs";
import axios from "axios";
import { transliterate as tr } from "transliteration";

const uzCryl = JSON.parse(
  fs.readFileSync("src/locales/uzCryl/translation.json", "utf-8")
);

const uzLatin = {};
const ru = {};

const translateToRussian = async (text) => {
  try {
    const res = await axios.post(
      "https://libretranslate.com/translate",
      {
        q: text,
        source: "uz",
        target: "ru",
        format: "text",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res.data.translatedText;
  } catch (error) {
    console.error("Translation error:", error.message);
    return "";
  }
};

const run = async () => {
  for (const key in uzCryl) {
    uzLatin[key] = tr(key); // Cyrillic to Latin
    ru[key] = await translateToRussian(key); // Uzbek to Russian
  }

 
  fs.writeFileSync(
    "src/locales/ru/translation.json",
    JSON.stringify(ru, null, 2)
  );
};

run();
