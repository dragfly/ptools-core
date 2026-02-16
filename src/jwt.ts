export interface JwtTimestamp {
  field: string;
  value: number;
  date: string;
  expired: boolean;
}

export interface JwtDecodeResult {
  header: string;
  payload: string;
  timestamps: JwtTimestamp[];
}

function decodeBase64Url(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  return decodeURIComponent(
    atob(padded)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}

export function decodeJwt(token: string): JwtDecodeResult {
  const parts = token.trim().split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT: expected 3 parts separated by dots');
  }

  let header: string;
  try {
    header = JSON.stringify(JSON.parse(decodeBase64Url(parts[0])), null, 2);
  } catch {
    throw new Error('Invalid JWT header');
  }

  let payload: string;
  try {
    payload = JSON.stringify(JSON.parse(decodeBase64Url(parts[1])), null, 2);
  } catch {
    throw new Error('Invalid JWT payload');
  }

  const timestamps = extractTimestamps(payload);

  return { header, payload, timestamps };
}

export function extractTimestamps(payloadJson: string): JwtTimestamp[] {
  try {
    const parsed = JSON.parse(payloadJson);
    const fields = ['exp', 'iat', 'nbf'];
    return fields
      .filter((f) => typeof parsed[f] === 'number')
      .map((f) => ({
        field: f,
        value: parsed[f],
        date: new Date(parsed[f] * 1000).toISOString(),
        expired: f === 'exp' && parsed[f] * 1000 < Date.now(),
      }));
  } catch {
    return [];
  }
}
