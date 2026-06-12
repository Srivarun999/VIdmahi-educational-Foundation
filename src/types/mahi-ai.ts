export type MahiAIRole = "user" | "assistant";

export interface MahiAIMessage {
  id: string;
  role: MahiAIRole;
  content: string;
}

export interface MahiAISourceMessage {
  role: MahiAIRole;
  content: string;
}

export interface MahiAIChatRequest {
  message: string;
  history?: MahiAISourceMessage[];
}

export interface MahiAIChatResponse {
  answer: string;
  cached?: boolean;
  source?: string;
}
