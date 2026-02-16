const ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const REVERSE_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

export function encodeEntities(text: string): string {
  return text.replace(/[&<>"']/g, (char) => ENTITY_MAP[char]);
}

export function decodeEntities(text: string): string {
  return text.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (entity) => REVERSE_MAP[entity]);
}
