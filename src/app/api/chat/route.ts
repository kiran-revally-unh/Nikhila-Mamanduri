// Site assistant endpoint. With an AI Gateway key (AI_GATEWAY_API_KEY) it answers
// with Claude and tools;
// without one it streams a built-in answer from the site content, so the chat
// always works.
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateId,
  isStepCount,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { buildInstructions, fallbackAnswer } from "@/lib/assistant/knowledge";
import { underRateLimit } from "@/lib/spam";
import { assistantTools, bookingOptions, caseStudy, contactCard, handoff } from "@/lib/assistant/tools";

export const maxDuration = 30;

const MODEL = "anthropic/claude-haiku-5.5";
const MAX_MESSAGES = 16;
const MAX_CHARS = 1000;

function lastUserText(messages: UIMessage[]) {
  const last = [...messages].reverse().find((m) => m.role === "user");
  return (last?.parts ?? [])
    .map((p) => (p.type === "text" ? p.text : ""))
    .join(" ")
    .slice(0, MAX_CHARS);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  if (!underRateLimit(req, "chat", 40, 10 * 60 * 1000)) {
    return new Response("Too many messages — please wait a few minutes.", { status: 429 });
  }
  const { messages: all }: { messages: UIMessage[] } = await req.json();
  const messages = (all ?? []).slice(-MAX_MESSAGES);

  // AI mode is opt-in: only an explicit AI_GATEWAY_API_KEY turns it on (the Vercel OIDC
  // token is present on every Vercel deployment, so it must not switch AI on by itself).
  if (process.env.AI_GATEWAY_API_KEY) {
    const result = streamText({
      model: MODEL,
      instructions: buildInstructions(),
      messages: await convertToModelMessages(messages),
      tools: assistantTools,
      stopWhen: isStepCount(4),
      maxOutputTokens: 500,
    });
    return createUIMessageStreamResponse({ stream: toUIMessageStream({ stream: result.stream }) });
  }

  // Built-in fallback: stream a real answer word by word, then any cards.
  const { text, cards } = fallbackAnswer(lastUserText(messages));
  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      writer.write({ type: "start" });
      await sleep(450);
      const id = generateId();
      writer.write({ type: "text-start", id });
      for (const word of text.split(/(\s+)/)) {
        writer.write({ type: "text-delta", id, delta: word });
        if (word.trim()) await sleep(28);
      }
      writer.write({ type: "text-end", id });
      for (const card of cards) {
        const toolCallId = generateId();
        writer.write({ type: "tool-input-available", toolCallId, toolName: card.tool, input: card.input });
        const output =
          card.tool === "showBookingOptions"
            ? bookingOptions()
            : card.tool === "showContactCard"
              ? contactCard()
              : card.tool === "showCaseStudy"
                ? caseStudy(card.input.slug)
                : handoff(card.input.topic);
        writer.write({ type: "tool-output-available", toolCallId, output });
      }
      writer.write({ type: "finish" });
    },
  });
  return createUIMessageStreamResponse({ stream });
}
