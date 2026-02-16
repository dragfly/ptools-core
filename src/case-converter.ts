function splitWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toTitleCase(text: string): string {
  return text.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
}

export function toCamelCase(text: string): string {
  const words = splitWords(text);
  if (words.length === 0) return '';
  return words
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('');
}

export function toSnakeCase(text: string): string {
  return splitWords(text).map((w) => w.toLowerCase()).join('_');
}

export function toKebabCase(text: string): string {
  return splitWords(text).map((w) => w.toLowerCase()).join('-');
}
