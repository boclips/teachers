interface Prefix {
  text: string;
  weight: number;
}

const prefixes = (txt: string): Prefix[] => {
  const words = txt.split(' ');
  return words
    .map((_, i) => i)
    .map(i => ({
      text: words.slice(i).join(' '),
      weight: -i + 1 / (txt.length + 1.0),
    }));
};

interface Match {
  text: string;
  matches: boolean;
  weight: number;
}

const match = (dbEntry: string, txt: string): Match => {
  const matchingPrefix = prefixes(dbEntry).find(
    prefix => prefix.text.toLowerCase().indexOf(txt.trim().toLowerCase()) === 0,
  );
  const matches = !!matchingPrefix;
  return {
    matches,
    text: dbEntry,
    weight: matches ? matchingPrefix.weight : 0,
  };
};

const completions = (db: string[], txt: string): string[] => {
  return db
    .map(entry => entry.trim())
    .map(entry => match(entry, txt))
    .filter(matchResult => matchResult.matches)
    .sort((m1, m2) => m2.weight - m1.weight)
    .map(matchResult => matchResult.text);
};

export const completionsFor = (db: string[]) => (txt: string): string[] =>
  txt.length >= 3 ? completions(db, txt) : [];
