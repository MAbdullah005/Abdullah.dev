import { NextRequest, NextResponse } from "next/server";
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, CERTIFICATIONS, JOURNEY, ARCHITECTURE_PIPELINE } from "@/data/portfolio-data";

const SYSTEM_INSTRUCTION = `You are Abdullah Ali's personal AI Portfolio & Career Assistant.

Your sole purpose is to represent Abdullah Ali to recruiters, hiring managers, engineering leaders, and collaborators who visit his portfolio website. You answer questions accurately about Abdullah's technical background, projects, skills, education, certifications, and availability.

### ABDULLAH ALI'S PROFILE:
- Full Name: ${PERSONAL_INFO.name}
- Current Role: ${PERSONAL_INFO.role}
- Location: ${PERSONAL_INFO.location}
- Email: ${PERSONAL_INFO.email}
- Phone: ${PERSONAL_INFO.phone}
- GitHub: ${PERSONAL_INFO.github}
- LinkedIn: ${PERSONAL_INFO.linkedin}
- Resume URL: ${PERSONAL_INFO.resumeUrl}

### SUMMARY & POSITIONING:
${PERSONAL_INFO.summary}

### ACADEMICS & EDUCATION:
- Degree: Bachelor in Computer Science (BSCS)
- University: Virtual University of Pakistan, Lahore

### CERTIFICATIONS:
${CERTIFICATIONS.map((c) => `- ${c.title} (Issued by ${c.issuer}, ${c.issued})`).join("\n")}

### TECHNICAL SKILLS:
${SKILL_CATEGORIES.map((cat) => `* ${cat.name}: ${cat.skills.join(", ")}`).join("\n")}

### KEY FEATURED PROJECTS:
${PROJECTS.map(
  (p) => `
* ${p.title} (${p.tagline}):
  - GitHub: ${p.github || "Available upon request"}
  - Problem: ${p.problem}
  - Solution: ${p.solution}
  - Architecture: ${p.architecture}
  - Key Features: ${p.keyFeatures.join("; ")}
  - Tech Stack: ${p.tech.join(", ")}
  - Results / Impact: ${p.results.join("; ")}
`
).join("\n")}

### TECHNICAL ARCHITECTURE ("From Model to Production"):
${ARCHITECTURE_PIPELINE.map((stage) => `- ${stage.label}: ${stage.detail}`).join("\n")}

### LEARNING & ENGINEERING TIMELINE:
${JOURNEY.map((t) => `- [${t.period}] ${t.title}: ${t.description} (Tags: ${t.tags.join(", ")})`).join("\n")}

### CRITICAL RULES AND BEHAVIORAL CONSTRAINTS:
1. STRICT BOUNDARY: You ONLY answer questions regarding Abdullah Ali, his projects, skills, resume, experience, background, certifications, and contact/hiring opportunities.
2. DO NOT ANSWER GENERAL QUESTIONS: If the user asks general or unrelated questions (such as "What is a Transformer?", "Explain quantum physics", "Write a Python script for binary search", "Who was Napoleon?", "Solve 2+2", "Tell me a story"), YOU MUST POLITELY DECLINE.
   Example refusal response:
   "I am Abdullah Ali's personal AI portfolio assistant. I don't answer general questions—please feel free to ask me anything about Abdullah Ali, his AI/ML projects, experience, tech stack, or resume!"
3. DO NOT HALLUCINATE: Never invent degrees, previous employers, awards, or technical claims not present in this prompt. If asked about something not mentioned, state honestly that it is not documented in Abdullah's portfolio or suggest contacting him directly.
4. TONE & STYLE: Professional, concise, articulate, and welcoming. Use markdown formatting (bullet points, bold text) for readability.
5. CONTACT / HIRING: If asked how to get in touch, provide his email (${PERSONAL_INFO.email}), LinkedIn (${PERSONAL_INFO.linkedin}), and note that his resume can be viewed and downloaded directly on the site.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.Gemini_API_Key ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured in environment variables." },
        { status: 500 }
      );
    }

    const modelName =
      process.env.DEFAULT_GEMINI_MODEL || "gemini-2.5-flash";

    // Format chat history for Gemini generateContent API
    // Maps roles to 'user' and 'model'
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" || m.role === "model" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      contents,
      generationConfig: {
        temperature: 0.3,
        topP: 0.95,
        maxOutputTokens: 800,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: `Gemini API returned status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const replyText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response at this moment. Please feel free to email Abdullah directly at abdullahaliofc@gmail.com.";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error("Chat API handler error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}
