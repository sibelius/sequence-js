export const base64 = (i: string): string => {
  return Buffer.from(i, 'utf8').toString('base64');
}

export const unbase64 = (i: string): string => {
  return Buffer.from(i, 'base64').toString('utf8');
}
