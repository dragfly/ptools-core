export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
}

export function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export function countSentences(text: string): number {
  return text.trim() === '' ? 0 : text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
}

export function countParagraphs(text: string): number {
  return text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
}

export function textStats(text: string): TextStats {
  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: countWords(text),
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    lines: text === '' ? 0 : text.split('\n').length,
  };
}
