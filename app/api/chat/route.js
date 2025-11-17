import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// Read the system prompt from context.md
const promptFilePath = path.join(process.cwd(), "prompts", "context.md");
let systemPrompt = "";
try {
  systemPrompt = fs.readFileSync(promptFilePath, "utf-8");
} catch (err) {
  console.warn("Could not read system prompt file; proceeding with empty system prompt.");
  systemPrompt = "";
}

export async function POST(request) {
  try {
    const body = await request.json();
    const userMessage = body?.message;
    
    if (!userMessage) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === "") {
      // Fallback to simple response if API key is missing
      return NextResponse.json({ 
        reply: `You said: "${userMessage}". I'm Shreerama's AI assistant! (Note: AI API not configured)` 
      });
    }

    const modelName = "anthropic/claude-3.5-sonnet"; 
    const url = "https://openrouter.ai/api/v1/chat/completions";
    
    // Prepare messages array for OpenRouter API
    const messages = [
      ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
      { role: "user", content: userMessage }
    ];

    // Call OpenRouter API
    const openrouterRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Shreerama AI Assistant"
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          ...messages,
          {
            role: "system",
            content: "When responding about projects or lists, use bullet points (• or -) instead of paragraphs. Keep responses concise and well-structured. For technical details, use clear headings and bullet points."
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    const openrouterJson = await openrouterRes.json();

    if (!openrouterRes.ok) {
      console.error("OpenRouter API error:", openrouterJson);
      return NextResponse.json({ 
        error: "OpenRouter API error", 
        details: openrouterJson 
      }, { status: 502 });
    }

    let reply = "";
    if (openrouterJson?.choices?.[0]?.message?.content) {
      reply = openrouterJson.choices[0].message.content;
    } else {
      reply = "Sorry, I couldn't generate a response.";
    }

    return NextResponse.json({ reply });

  } catch (err) {
    console.error("Error in chat API", err);
    return NextResponse.json({ 
      error: "Something went wrong", 
      details: String(err) 
    }, { status: 500 });
  }
}
