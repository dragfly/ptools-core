export interface PasswordOptions {
  uppercase?: boolean;
  lowercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
}

export interface PasswordStrength {
  label: 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  entropy: number;
}

export function generatePassword(length: number, options: PasswordOptions = {}): string {
  const { uppercase = true, lowercase = true, numbers = true, symbols = true } = options;

  let chars = '';
  if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (!chars) return '';

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (n) => chars[n % chars.length]).join('');
}

export function passwordStrength(length: number, options: PasswordOptions = {}): PasswordStrength {
  const { uppercase = true, lowercase = true, numbers = true, symbols = true } = options;

  let charsetSize = 0;
  if (uppercase) charsetSize += 26;
  if (lowercase) charsetSize += 26;
  if (numbers) charsetSize += 10;
  if (symbols) charsetSize += 26;

  const entropy = charsetSize > 0 ? Math.log2(charsetSize) * length : 0;

  if (entropy < 40) return { label: 'Weak', entropy };
  if (entropy < 60) return { label: 'Fair', entropy };
  if (entropy < 80) return { label: 'Strong', entropy };
  return { label: 'Very Strong', entropy };
}
