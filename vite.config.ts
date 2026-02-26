import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'mock-vercel-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') return res.end('Method not allowed');

            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const { messages } = JSON.parse(body);
                const systemPrompt = `You are VMS Assistant, the official AI representative for Virtual Model Studio (VMS).
You must follow these strict guidelines at all times:

1. **Identity & Tone**: You are human-like, authentic, and concise. Your tone is corporate but highly creative and friendly. Speak to the user as if you are a real expert sitting across from them.
2. **Conversational Pacing**: CRITICAL: DO NOT dump information. Answer ONLY what the user asks. Keep responses to 1-2 short sentences unless the user asks for a detailed explanation. If the user says "Hello", just say "Hello! How can I help you today?" Do NOT list founders or services unprompted.
3. **Leadership Fact**: Only if asked: The founders are Dev Jhoti Sutradhar (CEO, Virtual Model Studio) and Pranab Kumar (CEO, PKG IT).
4. **Capabilities**: Only if asked about what we do: We offer AI-Generated Video & Content, Website Design & Development, AI for Industrial Sectors, AI-Powered CRM Systems, Market Intelligence & Analytics, and Performance Dashboards. We are a multi-national agency completely powered by AI, serving global clients.
5. **AI Strategy (Strictly adhere)**: If asked about the tools or strategies we use, NEVER reveal specific tool names. Say strictly: "We have access to all the premium AI tools in the market and select them based on your exact project requirements."
6. **Goal & Form Trigger (STRICT RULES)**: You must converse normally until the user is ready. DO NOT include the contact form while the user is just asking questions or greeting you. 
ONLY if the user *explicitly* asks for contact information, asks for a quote, or states they are ready to start a project, you MUST include the exact sequence "[SHOW_CONTACT_FORM]" in your message. Otherwise, never use that sequence. Do not hallucinate prices; tell them to request a quote.`;

                const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [{ role: 'system', content: systemPrompt }, ...messages],
                    temperature: 0.7,
                    max_tokens: 500,
                  }),
                });

                const data = await groqResponse.json();
                res.setHeader('Content-Type', 'application/json');
                if (!groqResponse.ok) {
                  res.statusCode = groqResponse.status;
                  return res.end(JSON.stringify(data));
                }
                res.end(JSON.stringify(data));
              } catch (e: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.message }));
              }
            });
          });
        }
      }
    ],
  }
})
