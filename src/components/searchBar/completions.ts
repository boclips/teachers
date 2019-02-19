const prefixes = (txt: string): string[] => {
  const words = txt.split(' ');

  return words
    .map((_, i) => i)
    .map(i => words.slice(i).join(' '));
};

const matches = (dbEntry: string, txt: string): boolean => {
  return prefixes(dbEntry).some(prefix => prefix.toLowerCase().indexOf(txt.toLowerCase()) === 0);
}

export const completionsFor = (db: string[]) => (txt: string): string[] =>
  txt.length >= 3
    ? db.filter(entry => matches(entry, txt))
    : [];
