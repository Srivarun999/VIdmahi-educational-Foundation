interface MahiAISuggestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

const suggestions = [
  "What is Vidmahi Foundation?",
  "Who founded the foundation?",
  "What programs do you offer?",
  "How can I donate?",
  "How can I volunteer?",
  "Where is the foundation located?",
];

export default function MahiAISuggestions({ onSelect, disabled }: MahiAISuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          disabled={disabled}
          className="rounded-full border border-[#0A2E6D]/15 bg-white/90 px-3 py-2 text-left text-xs font-medium text-[#0A2E6D] transition hover:-translate-y-0.5 hover:border-[#5A8F2D]/40 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
