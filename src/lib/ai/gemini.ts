import crypto from "node:crypto";
import { DONATION_FORM_URL, VOLUNTEER_FORM_URL } from "@/constants";
import { aboutContent } from "@/data/about";
import { contactInfo } from "@/data/contact";
import { annualReports } from "@/data/reports";
import { heroSlides } from "@/data/site";
import { programs } from "@/data/programs";
import { getKnowledgeFallbackMessage, getProjectKnowledge } from "./knowledge";
import type { MahiAISourceMessage } from "@/types/mahi-ai";

// ─── Config ────────────────────────────────────────────────────────────────────

const GEMINI_MODEL = "gemini-2.5-flash";
const CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes
const MAX_OUTPUT_TOKENS = 1024;

// ─── Types ─────────────────────────────────────────────────────────────────────

type CachedAnswer = {
  answer: string;
  expiresAt: number;
};

type GeminiContent = {
  role: "user" | "model";
  parts: Array<{ text: string }>;
};

type GeminiStreamChunk = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
    finishReason?: string;
  }>;
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
  };
};

// ─── Cache ──────────────────────────────────────────────────────────────────────

const responseCache = new Map<string, CachedAnswer>();

function createCacheKey(message: string, history: MahiAISourceMessage[]): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify({ message, history }))
    .digest("hex");
}

function getCached(key: string): string | null {
  const entry = responseCache.get(key);
  if (entry && entry.expiresAt > Date.now()) return entry.answer;
  if (entry) responseCache.delete(key); // evict expired
  return null;
}

function setCached(key: string, answer: string): void {
  responseCache.set(key, { answer, expiresAt: Date.now() + CACHE_TTL_MS });
}

// ─── Off-topic guard ────────────────────────────────────────────────────────────
// Only used as a lightweight pre-flight to avoid sending clearly unrelated
// messages (e.g. "write me a poem about cats") to the Gemini API.
// All genuine foundation questions go straight to Gemini — no hardcoded answers.

const FOUNDATION_KEYWORDS = new Set([
  "vidmahi", "foundation", "mahi", "mahi_ai", "mahi ai",
  "donate", "donation", "contribute", "contribution",
  "volunteer", "program", "programs", "coaching",
  "report", "reports", "gallery", "photo",
  "founder", "mission", "vision", "about",
  "contact", "email", "phone", "address", "location", "located", "where",
  "bhuthkur", "nirmal", "telangana", "navodaya", "gurukul",
  "students", "school", "education", "educational",
  "help", "support", "join", "annual", "how to",
]);

function isFoundationRelated(text: string): boolean {
  const normalized = text.toLowerCase();
  // Pass through any message that contains at least one known keyword
  for (const kw of FOUNDATION_KEYWORDS) {
    if (normalized.includes(kw)) return true;
  }
  // Also pass through short, context-free greetings and follow-up phrases
  // so multi-turn conversation works naturally
  const shortMessage = normalized.trim().split(/\s+/).length <= 5;
  const isGreetingOrFollowUp = /^(hi|hello|hey|thanks|thank you|okay|ok|yes|no|sure|please|tell me more|go on|what else|continue)/.test(normalized.trim());
  return shortMessage || isGreetingOrFollowUp;
}

// ─── System Prompt ──────────────────────────────────────────────────────────────

function buildSystemPrompt(knowledge: string): string {
  const programList = programs
    .map((p) => `  • ${p.title} — ${p.location}${p.description ? `: ${p.description}` : ""}`)
    .join("\n");

  const reportList =
    annualReports.length > 0
      ? annualReports
          .map((r) => {
            const parts = [`Year: ${r.year}`];
            if (r.donationReport) parts.push(`Donation Report: ${r.donationReport}`);
            if (r.expenditureReport) parts.push(`Expenditure Report: ${r.expenditureReport}`);
            return `  • ${parts.join(" | ")}`;
          })
          .join("\n")
      : "  • No reports currently listed.";

  const heroList = heroSlides.map((s) => `  • ${s.alt}`).join("\n");
  const aboutText = [...aboutContent.paragraphs, ...(aboutContent.additionalParagraphs ?? [])].join(" ");

  return `
You are Mahi AI, the official intelligent assistant of Vidmahi Educational Foundation.
You are warm, articulate, knowledgeable, and deeply committed to the foundation's mission.
You respond like a premium AI — naturally, conversationally, and with genuine care.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOUNDATION FACTS (always accurate — use these directly)
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:        Vidmahi Educational Foundation
Founder:     Singari Sri Varun
Mission:     Supporting government school students through free coaching, guidance, and community support
Address:     ${contactInfo.address}
Email:       ${contactInfo.email}
Phone:       ${contactInfo.phone}
Donate:      ${DONATION_FORM_URL}
Volunteer:   ${VOLUNTEER_FORM_URL}

Programs:
${programList}

Annual Reports:
${reportList}

Media / Gallery highlights:
${heroList}

About:
${aboutText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULL KNOWLEDGE BASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
${knowledge}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEHAVIOR GUIDELINES
━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Always answer from the facts and knowledge base above. Never invent information.
2. Respond in clear, flowing prose — no robotic bullet dumps unless listing items genuinely calls for it.
3. For donation or volunteer questions, always include the relevant URL naturally in your reply.
4. If something is not covered in your knowledge, say: "I don't have specific details on that right now — please reach out to the foundation directly at ${contactInfo.email} or ${contactInfo.phone} and they'll be happy to help."
5. If a question is clearly unrelated to Vidmahi Foundation (e.g. general coding help, weather, news), politely decline and refocus: "I'm Mahi AI, and I'm here specifically to help with everything about Vidmahi Educational Foundation. Is there something about our programs, donations, or initiatives I can help you with?"
6. Keep responses concise but complete — typically 2–4 sentences for simple questions, a short structured reply for complex ones.
7. Never start your reply with "I" as the very first word. Vary your openers naturally.
8. Maintain a tone that is encouraging, human, and reflects the foundation's values of education and community upliftment.
`.trim();
}

// ─── Gemini message format ──────────────────────────────────────────────────────

function toGeminiContents(history: MahiAISourceMessage[]): GeminiContent[] {
  return history
    .filter((entry) => entry.content?.trim())
    .map((entry) => ({
      role: entry.role === "assistant" ? "model" : "user",
      parts: [{ text: entry.content.trim() }],
    }));
}

// ─── SSE stream parser ──────────────────────────────────────────────────────────
// Gemini SSE sends newline-delimited JSON chunks, each prefixed with "data: ".
// This parser is resilient to partial chunks and multi-line data frames.

function extractDeltasFromSseBlock(block: string): string[] {
  const deltas: string[] = [];

  for (const line of block.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;

    const raw = trimmed.slice(5).trim();
    if (!raw || raw === "[DONE]") continue;

    try {
      const chunk = JSON.parse(raw) as GeminiStreamChunk;
      const text = chunk.candidates?.[0]?.content?.parts
        ?.map((p) => p.text ?? "")
        .join("") ?? "";

      if (text) deltas.push(text);
    } catch {
      // Partial JSON or non-data line — skip silently
    }
  }

  return deltas;
}

// ─── Core streaming call ────────────────────────────────────────────────────────

async function streamGeminiResponse(
  apiKey: string,
  systemPrompt: string,
  history: MahiAISourceMessage[],
  userMessage: string,
  onDelta?: (delta: string) => void
): Promise<string> {
  const requestBody = {
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      ...toGeminiContents(history),
      { role: "user", parts: [{ text: userMessage }] },
    ],
    generationConfig: {
      temperature: 0.4,       // Slightly higher for natural, varied language
      topP: 0.92,
      topK: 40,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      candidateCount: 1,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ],
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok || !response.body) {
    const errorBody = await response.text().catch(() => "Unknown error");
    throw new Error(`Gemini API error ${response.status}: ${errorBody}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";
  let fullAnswer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Process all complete SSE blocks (separated by double newline)
    let boundaryIndex: number;
    while ((boundaryIndex = buffer.indexOf("\n\n")) !== -1) {
      const block = buffer.slice(0, boundaryIndex);
      buffer = buffer.slice(boundaryIndex + 2);

      for (const delta of extractDeltasFromSseBlock(block)) {
        fullAnswer += delta;
        onDelta?.(delta);
      }
    }
  }

  // Flush any remaining buffer content
  if (buffer.trim()) {
    for (const delta of extractDeltasFromSseBlock(buffer)) {
      fullAnswer += delta;
      onDelta?.(delta);
    }
  }

  return fullAnswer.trim();
}

// ─── Public API ─────────────────────────────────────────────────────────────────

/**
 * Convenience wrapper — returns a plain answer string.
 * Use `runMahiAiAnswer` directly if you need streaming deltas or metadata.
 */
export async function getMahiAiAnswer(
  message: string,
  history: MahiAISourceMessage[]
): Promise<string> {
  const result = await runMahiAiAnswer(message, history);
  return result.answer;
}

/**
 * Main entry point. All messages — regardless of topic — flow through Gemini.
 * The system prompt instructs the model to handle off-topic messages gracefully.
 *
 * @param message   The user's latest message
 * @param history   Prior conversation turns
 * @param onDelta   Optional streaming callback, called with each text delta
 */
export async function runMahiAiAnswer(
  message: string,
  history: MahiAISourceMessage[],
  onDelta?: (delta: string) => void
): Promise<{ answer: string; cached: boolean; source: "cache" | "policy" | "gemini" }> {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    return {
      answer: "Please go ahead and ask your question — I'm here to help!",
      cached: false,
      source: "policy",
    };
  }

  // Lightweight off-topic filter — only blocks clearly unrelated content
  if (!isFoundationRelated(trimmedMessage)) {
    return {
      answer:
        "I'm Mahi AI, dedicated to helping with everything about Vidmahi Educational Foundation — programs, donations, volunteers, and more. Feel free to ask anything related to the foundation!",
      cached: false,
      source: "policy",
    };
  }

  // Cache check (only for non-streaming calls — when onDelta is not provided)
  if (!onDelta) {
    const cacheKey = createCacheKey(trimmedMessage, history);
    const cached = getCached(cacheKey);
    if (cached) {
      return { answer: cached, cached: true, source: "cache" };
    }
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY environment variable is not set. Please configure it to enable Mahi AI."
    );
  }

  const knowledge = await getProjectKnowledge();
  const systemPrompt = buildSystemPrompt(knowledge);

  let answer = await streamGeminiResponse(
    apiKey,
    systemPrompt,
    history,
    trimmedMessage,
    onDelta
  );

  if (!answer) {
    answer = getKnowledgeFallbackMessage();
  }

  // Cache the result (for future non-streaming requests with the same input)
  const cacheKey = createCacheKey(trimmedMessage, history);
  setCached(cacheKey, answer);

  return { answer, cached: false, source: "gemini" };
}