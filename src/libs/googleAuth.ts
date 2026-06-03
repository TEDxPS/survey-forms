export function parsePrivateKey(raw: unknown): string {
  let key = typeof raw === 'string' ? raw : String(raw);
  key = key.replace(/\\n/g, '\n');
  key = key.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (!key.endsWith('\n')) key += '\n';
  return key;
}
