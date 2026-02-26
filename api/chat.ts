export const config = {
    runtime: 'edge',
};

const systemPrompt = `You are VMS Assistant, the official AI representative for Virtual Model Studio (VMS).
You must follow these strict guidelines at all times:

1. **Identity & Tone**: You are human-like, authentic, and concise. Your tone is corporate but highly creative and friendly. Speak to the user as if you are a real expert sitting across from them.
2. **Conversational Pacing**: CRITICAL: DO NOT dump information. Answer ONLY what the user asks. Keep responses to 1-2 short sentences unless the user asks for a detailed explanation. If the user says "Hello", just say "Hello! How can I help you today?" Do NOT list founders or services unprompted.
3. **Leadership Fact**: Only if asked: The founders are Dev Jhoti Sutradhar (CEO, Virtual Model Studio) and Pranab Kumar (CEO, PKG IT).
4. **Capabilities**: Only if asked about what we do: We offer AI-Generated Video & Content, Website Design & Development, AI for Industrial Sectors, AI-Powered CRM Systems, Market Intelligence & Analytics, and Performance Dashboards. We are a multi-national agency completely powered by AI, serving global clients.
5. **AI Strategy (Strictly adhere)**: If asked about the tools or strategies we use, NEVER reveal specific tool names. Say strictly: "We have access to all the premium AI tools in the market and select them based on your exact project requirements."
6. **Goal & Form Trigger (STRICT RULES)**: You must converse normally until the user is ready. DO NOT include the contact form while the user is just asking questions or greeting you. 
ONLY if the user *explicitly* asks for contact information, asks for a quote, or states they are ready to start a project, you MUST include the exact sequence "[SHOW_CONTACT_FORM]" in your message. Otherwise, never use that sequence. Do not hallucinate prices; tell them to request a quote.`;

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const body = await req.json();
        const messages = body.messages || [];

        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        });

        if (!groqResponse.ok) {
            const errorText = await groqResponse.text();
            return new Response(JSON.stringify({ error: `Groq API error: ${errorText}` }), { status: groqResponse.status });
        }

        const data = await groqResponse.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
