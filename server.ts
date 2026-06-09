import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize server-side Gemini client with proper telemetry headers
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Endpoint to summarize thesis section/deepest node texts securely
app.post("/api/summarize", async (req, res) => {
  try {
    const { title, text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: "No section text provided for summarization." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Provide a precise academic synthesis (summarized as 2-3 structured bullets) for the following thesis segment. Use formal academic vocabulary.

Section Title: ${title || 'Thesis Section'}
Content Segment: ${text}`,
      config: {
        systemInstruction: "You are an advanced academic evaluator and structural thesis compiler. You synthesize thesis drafts into condensed key points.",
      }
    });

    res.json({ summary: response.text || "No summary generated." });
  } catch (error: any) {
    console.error("Gemini compilation service encountered an issue:", error);
    res.status(500).json({ error: error.message || "Gemini service is currently processing another workspace. Please try again." });
  }
});

// Vite middleware integration
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom server booting on port ${PORT}`);
  });
}

bootstrap();
