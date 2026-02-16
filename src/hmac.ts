export type HmacAlgorithm = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export async function hmac(text: string, key: string, algorithm: HmacAlgorithm): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: { name: algorithm } },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(text));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
