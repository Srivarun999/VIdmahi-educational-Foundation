import { NextResponse } from "next/server";
import type { MahiAIChatRequest } from "@/types/mahi-ai";
import { getMahiAiAnswer, runMahiAiAnswer } from "@/lib/ai/gemini";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MahiAIChatRequest;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const history = Array.isArray(body.history) ? body.history : [];

    if (!process.env.GEMINI_API_KEY) {
      const result = await getMahiAiAnswer(message, history);
      return NextResponse.json(result, { status: 200 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          const result = await runMahiAiAnswer(message, history, (delta) => {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
          });

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ answer: result.answer, cached: result.cached, source: result.source })}\n\n`));

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (error) {
          const details = error instanceof Error ? error.message : "Unexpected error.";
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Mahi_AI is temporarily unavailable. Please try again later or contact the foundation directly.", details })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error.";
    return NextResponse.json(
      {
        error:
          "Mahi_AI is temporarily unavailable. Please try again later or contact the foundation directly.",
        details: message,
      },
      { status: 500 }
    );
  }
}
