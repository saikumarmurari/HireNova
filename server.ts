import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini AI Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// AI Generation Proxy endpoint using gemini-3.8-flash
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt, systemInstruction, responseMimeType, responseSchema } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!ai) {
      // Return helpful fallback response if key is not configured
      return res.json({
        fallback: true,
        text: `[Offline AI Mode]: Gemini API key is not currently configured in secrets. Using built-in analytical career intelligence logic to fulfill your request.`,
      });
    }

    const config: Record<string, any> = {};
    if (systemInstruction) {
      config.systemInstruction = systemInstruction;
    }
    if (responseMimeType) {
      config.responseMimeType = responseMimeType;
    }
    if (responseSchema) {
      config.responseSchema = responseSchema;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: Object.keys(config).length > 0 ? config : undefined,
    });

    return res.json({
      text: response.text ?? '',
      fallback: false,
    });
  } catch (error: any) {
    console.error('Error generating AI content:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate content',
      fallback: true,
    });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // In dev mode, mount Vite middlewares
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareerOrbit AI server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
