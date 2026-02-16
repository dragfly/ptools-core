export type HashAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function hash(text: string, algorithm: HashAlgorithm): Promise<string> {
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest(algorithm, data);
  return toHex(buffer);
}

export async function hashAll(text: string): Promise<Record<HashAlgorithm, string>> {
  const algorithms: HashAlgorithm[] = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
  const results = await Promise.all(algorithms.map((algo) => hash(text, algo)));
  return Object.fromEntries(algorithms.map((algo, i) => [algo, results[i]])) as Record<HashAlgorithm, string>;
}
