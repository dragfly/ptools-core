export interface BaseConversion {
  name: string;
  base: number;
  value: string;
}

export function parseBase(input: string, fromBase: number): number {
  const trimmed = input.trim();
  const validChars = '0123456789abcdef'.slice(0, fromBase);
  const cleaned = trimmed.toLowerCase().replace(/^-/, '');

  for (const ch of cleaned) {
    if (!validChars.includes(ch)) {
      throw new Error(`Invalid character "${ch}" for base ${fromBase}`);
    }
  }

  const value = parseInt(trimmed, fromBase);
  if (isNaN(value)) throw new Error('Invalid number for the selected base');
  return value;
}

export function convertBase(value: number, toBase: number, prefix: string = ''): string {
  return (value < 0 ? '-' : '') + prefix + Math.abs(value).toString(toBase).toUpperCase();
}

export function convertAllBases(input: string, fromBase: number): BaseConversion[] {
  const value = parseBase(input, fromBase);
  const bases = [
    { name: 'Binary', base: 2, prefix: '0b' },
    { name: 'Octal', base: 8, prefix: '0o' },
    { name: 'Decimal', base: 10, prefix: '' },
    { name: 'Hexadecimal', base: 16, prefix: '0x' },
  ];
  return bases.map(({ name, base, prefix }) => ({
    name,
    base,
    value: convertBase(value, base, prefix),
  }));
}
