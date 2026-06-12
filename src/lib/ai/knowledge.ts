import fs from "node:fs/promises";
import path from "node:path";

let cachedKnowledge: string | null = null;

export async function getProjectKnowledge(): Promise<string> {
  if (cachedKnowledge) {
    return cachedKnowledge;
  }

  const knowledgePath = path.join(process.cwd(), "PROJECT_KNOWLEDGE.md");
  cachedKnowledge = await fs.readFile(knowledgePath, "utf8");
  return cachedKnowledge;
}

export function getKnowledgeFallbackMessage(): string {
  return "I do not currently have information about that topic. Please contact the foundation directly for assistance.";
}
