export function shuffle(array: any[]) {
  const result = [...array].sort(() => Math.random() - 0.5);
  return result;
}
