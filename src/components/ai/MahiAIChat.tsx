"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MahiAIAvatar from "./MahiAIAvatar";
import type { MahiAIChatResponse, MahiAIMessage, MahiAISourceMessage } from "@/types/mahi-ai";

const WELCOME_MESSAGE =
  "Hello! I'm Mahi_AI 👋\n\nI'm here to help you learn about Vidmahi Educational Foundation, our programs, mission, activities, reports, and ways to support our educational initiatives.\n\nHow may I assist you today?";

const POLICY_FALLBACK =
  "I specialize in information related to Vidmahi Educational Foundation and its educational initiatives.";

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeQuestion(question: string) {
  return question.trim().toLowerCase().replace(/\s+/g, " ");
}

function renderMarkdownLine(line: string, keyPrefix: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const tokens: Array<{ type: "text" | "link"; text: string; href?: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", text: line.slice(lastIndex, match.index) });
    }
    tokens.push({ type: "link", text: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < line.length) {
    tokens.push({ type: "text", text: line.slice(lastIndex) });
  }

  return tokens.map((token, index) => {
    const key = `${keyPrefix}-${index}`;

    if (token.type === "link" && token.href) {
      const href = token.href.trim();
      const safeHref = /^https?:\/\//i.test(href) || href.startsWith("/") ? href : `https://${href}`;

      return (
        <a
          key={key}
          href={safeHref}
          target={safeHref.startsWith("/") ? undefined : "_blank"}
          rel={safeHref.startsWith("/") ? undefined : "noreferrer noopener"}
          className="font-semibold text-[#0A2E6D] underline decoration-[#5A8F2D]/60 underline-offset-2"
        >
          {token.text}
        </a>
      );
    }

    const parts = token.text
      .split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
      .filter(Boolean)
      .map((segment, segmentIndex) => {
        if (segment.startsWith("**") && segment.endsWith("**")) {
          return (
            <strong key={`${key}-${segmentIndex}`} className="font-semibold text-[#0A2E6D]">
              {segment.slice(2, -2)}
            </strong>
          );
        }

        if (segment.startsWith("`") && segment.endsWith("`")) {
          return (
            <code
              key={`${key}-${segmentIndex}`}
              className="rounded bg-black/5 px-1.5 py-0.5 text-[0.82em] text-[#0A2E6D]"
            >
              {segment.slice(1, -1)}
            </code>
          );
        }

        return <span key={`${key}-${segmentIndex}`}>{segment}</span>;
      });

    return <span key={key}>{parts}</span>;
  });
}

function renderMessageContent(content: string) {
  const normalized = content.trim();
  if (!normalized) return null;

  return normalized.split(/\r?\n/).map((line, index) => {
    const key = `line-${index}`;

    if (/^\s*[-*]\s+/.test(line)) {
      return (
        <li key={key} className="ml-4 list-disc">
          {renderMarkdownLine(line.replace(/^\s*[-*]\s+/, ""), key)}
        </li>
      );
    }

    if (!line.trim()) {
      return <div key={key} className="h-2" />;
    }

    return (
      <p key={key} className="whitespace-pre-wrap leading-relaxed">
        {renderMarkdownLine(line, key)}
      </p>
    );
  });
}

interface MahiAIChatProps {
  open: boolean;
  onClose: () => void;
}

export default function MahiAIChat({ open, onClose }: MahiAIChatProps) {
  const [messages, setMessages] = useState<MahiAIMessage[]>([
    { id: "welcome", role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeAssistantId, setActiveAssistantId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const streamCacheRef = useRef(new Map<string, string>());
  const pendingRequestRef = useRef(false);

  const historyForApi = useMemo(
    () =>
      messages
        .filter((message) => message.id !== "welcome")
        .slice(-10)
        .map((message) => ({ role: message.role, content: message.content })) as MahiAISourceMessage[],
    [messages]
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open, isLoading]);

  useEffect(() => {
    if (!open) setErrorMessage("");
  }, [open]);

  async function handleSend(question: string) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || pendingRequestRef.current) return;

    const normalizedQuestion = normalizeQuestion(trimmedQuestion);
    const cachedAnswer = streamCacheRef.current.get(normalizedQuestion);

    setErrorMessage("");
    setInputValue("");
    setIsLoading(true);
    pendingRequestRef.current = true;

    const userMessage: MahiAIMessage = {
      id: createId(),
      role: "user",
      content: trimmedQuestion,
    };
    const assistantMessageId = createId();

    setMessages((current) => [
      ...current,
      userMessage,
      { id: assistantMessageId, role: "assistant", content: cachedAnswer ?? "" },
    ]);

    setActiveAssistantId(assistantMessageId);

    if (cachedAnswer) {
      setIsLoading(false);
      pendingRequestRef.current = false;
      setActiveAssistantId(null);
      return;
    }

    try {
      const response = await fetch("/api/mahi-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedQuestion, history: historyForApi }),
      });

      const contentType = response.headers.get("content-type") ?? "";

      if (!response.ok) {
        const errorPayload = contentType.includes("application/json")
          ? ((await response.json()) as { error?: string })
          : { error: await response.text() };
        throw new Error(errorPayload.error ?? "Unable to reach Mahi_AI.");
      }

      if (contentType.includes("application/json")) {
        const payload = (await response.json()) as MahiAIChatResponse;
        const answer = payload.answer || POLICY_FALLBACK;
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantMessageId ? { ...message, content: answer } : message
          )
        );
        streamCacheRef.current.set(normalizedQuestion, answer);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Unable to stream Mahi_AI response.");

      const decoder = new TextDecoder();
      let buffer = "";
      let streamedAnswer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let boundaryIndex = buffer.indexOf("\n\n");
        while (boundaryIndex !== -1) {
          const block = buffer.slice(0, boundaryIndex);
          buffer = buffer.slice(boundaryIndex + 2);

          const lines = block.split(/\r?\n/).map((line) => line.trim());
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;

            const payload = line.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;

            try {
              const parsed = JSON.parse(payload) as {
                delta?: string;
                answer?: string;
                error?: string;
              };
              if (parsed.error) throw new Error(parsed.error);

              if (parsed.answer) {
                streamedAnswer = parsed.answer;
                setMessages((current) =>
                  current.map((message) =>
                    message.id === assistantMessageId
                      ? { ...message, content: streamedAnswer }
                      : message
                  )
                );
              }

              if (parsed.delta) {
                streamedAnswer += parsed.delta;
                setMessages((current) =>
                  current.map((message) =>
                    message.id === assistantMessageId
                      ? { ...message, content: streamedAnswer }
                      : message
                  )
                );
              }
            } catch {
              continue;
            }
          }

          boundaryIndex = buffer.indexOf("\n\n");
        }
      }

      const finalAnswer = streamedAnswer.trim() || POLICY_FALLBACK;
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessageId ? { ...message, content: finalAnswer } : message
        )
      );
      streamCacheRef.current.set(normalizedQuestion, finalAnswer);
    } catch (error) {
      const fallback =
        error instanceof Error && error.message
          ? error.message
          : "Mahi_AI is temporarily unavailable. Please try again later.";

      setMessages((current) =>
        current.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                content:
                  "Mahi_AI is temporarily unavailable. Please try again later or contact the foundation directly.",
              }
            : message
        )
      );
      setErrorMessage(fallback);
    } finally {
      setIsLoading(false);
      pendingRequestRef.current = false;
      setActiveAssistantId(null);
    }
  }

  return (
    /**
     * Outer positioner — fixed to viewport bottom-right.
     * pointer-events-none when closed so it doesn't block clicks.
     */
    <div
      className={`fixed bottom-4 right-4 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-live="polite"
    >
      {/**
       * The chat panel itself.
       *
       * Key layout rules:
       *  • Fixed width on desktop (w-[380px]), fluid on mobile (w-[calc(100vw-2rem)])
       *  • Fixed height on desktop (h-[600px]), capped on mobile (max-h-[75vh])
       *  • flex flex-col so children can fill the space correctly
       *  • overflow-hidden on this wrapper stops the whole panel from scrolling
       */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label="Mahi_AI assistant"
        className={`
          flex flex-col
          w-[calc(100vw-2rem)] sm:w-[380px]
          h-[min(600px,75vh)] sm:h-[600px]
          overflow-hidden
          rounded-[24px]
          border border-white/30
          bg-white/80
          shadow-[0_24px_80px_rgba(10,46,109,0.35)]
          backdrop-blur-2xl
          transition-all duration-300 ease-out
          ${open
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-6 opacity-0 scale-[0.97]"
          }
        `}
      >
        {/* ── HEADER (never scrolls) ─────────────────────────────────── */}
        <div className="shrink-0 border-b border-[#0A2E6D]/10 bg-gradient-to-r from-[#0A2E6D]/95 via-[#5A8F2D]/90 to-[#F8AFC2]/85 px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <MahiAIAvatar size={48} showStatus />

            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold leading-tight">Mahi_AI</p>
              <p className="text-xs text-white/80">Vidmahi Foundation Assistant</p>
            </div>

            {/* Online badge */}
            <div className="flex items-center gap-1.5 text-xs text-white/85">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]" />
              <span>Online</span>
            </div>

            {/* Close button — always visible, right side of header */}
            <button
              type="button"
              onClick={onClose}
              className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white transition hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Close chat"
            >
              {/* × icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── MESSAGES (only this section scrolls) ──────────────────── */}
        <div className="min-h-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(248,250,252,0.94)_100%)] px-4 py-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const isUser = message.role === "user";
              const isPendingAssistant = message.id === activeAssistantId && isLoading;

              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[20px] px-4 py-3 text-sm shadow-sm ${
                      isUser
                        ? "rounded-br-md bg-[#0A2E6D] text-white"
                        : "rounded-bl-md border border-[#0A2E6D]/8 bg-white/95 text-slate-700"
                    }`}
                  >
                    {isPendingAssistant && !message.content ? (
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#5A8F2D] [animation-delay:-0.2s]" />
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#F2B233] [animation-delay:-0.1s]" />
                        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#F8AFC2]" />
                      </div>
                    ) : (
                      <div className="space-y-2">{renderMessageContent(message.content)}</div>
                    )}
                  </div>
                </div>
              );
            })}

            {errorMessage && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">
                {errorMessage}
              </div>
            )}

            {/* Scroll anchor */}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* ── FOOTER: suggestions + input (never scrolls) ───────────── */}
        <div className="shrink-0 border-t border-[#0A2E6D]/10 bg-white/90 px-4 pt-3 pb-4 backdrop-blur-xl">
          {/* Suggested questions — 2-column grid, 3 per column */}
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5A8F2D]">
            Suggested Questions
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              "What is Vidmahi Foundation?",
              "Who founded the foundation?",
              "What programs do you offer?",
              "How can I donate?",
              "How can I volunteer?",
              "Where is the foundation located?",
            ].map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => void handleSend(question)}
                disabled={isLoading}
                className="rounded-lg border border-[#0A2E6D]/15 bg-white px-2.5 py-1.5 text-left text-[11px] leading-snug text-slate-600 transition hover:border-[#5A8F2D]/50 hover:bg-[#5A8F2D]/5 hover:text-[#0A2E6D] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div className="mt-3 flex items-end gap-2 rounded-[20px] border border-[#0A2E6D]/10 bg-white px-3 py-2.5 shadow-inner">
            <label className="sr-only" htmlFor="mahi-ai-message">
              Ask Mahi_AI a question
            </label>
            <textarea
              id="mahi-ai-message"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void handleSend(inputValue);
                }
              }}
              placeholder="Ask about programs, reports, donations…"
              rows={1}
              className="min-h-[40px] flex-1 resize-none bg-transparent px-1 py-1.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => void handleSend(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#0A2E6D] px-4 text-sm font-semibold text-white transition hover:bg-[#08305f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Ask
            </button>
          </div>

          <p className="mt-2 text-[10px] leading-relaxed text-slate-400">
            Mahi_AI answers only foundation-related questions.
          </p>
        </div>
      </div>
    </div>
  );
}
