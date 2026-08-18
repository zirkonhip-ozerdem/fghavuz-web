const WORDS_PER_MINUTE = 200;

export function estimateReadingMinutes(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  if (wordCount === 0) return 0;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
