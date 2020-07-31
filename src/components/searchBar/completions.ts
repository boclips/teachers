import { SuggestionType } from 'src/components/searchBar/SearchBarWrapper';

interface Word {
  text: string;
  offset: number;
}

const getWords = (text: string): Word[] => {
  const wordsWithOffsets = (words: string[], offset: number): Word[] => {
    if (words.length === 0) {
      return [];
    }
    const [word, ...remainingWords] = words;
    return [
      { text: word, offset },
      ...wordsWithOffsets(remainingWords, offset + word.length + 1),
    ];
  };

  return wordsWithOffsets(text.split(' '), 0);
};

interface Prefix {
  text: string;
  weight: number;
  offset: number;
}

const prefixes = (txt: string): Prefix[] => {
  const words = getWords(txt);
  return words
    .map((_, i) => i)
    .map((i) => ({
      text: words
        .map((word) => word.text)
        .slice(i)
        .join(' '),
      weight: -i + 1 / (txt.length + 1.0),
      offset: words[i].offset,
    }));
};

interface Match {
  text: string;
  id?: string;
  list: SuggestionType;
  matches: boolean;
  weight: number;
  offset: number;
}

const getMatch = (record: EnrichedEntry, txt: string): Match => {
  const matchingPrefix = prefixes(record.entry.value.trim()).find(
    (prefix) =>
      prefix.text.toLowerCase().indexOf(txt.trim().toLowerCase()) === 0,
  );
  const matches = !!matchingPrefix;
  return {
    matches,
    list: record.list,
    id: record.entry.id,
    text: record.entry.value.trim(),
    weight: matches ? matchingPrefix!!.weight : 0,
    offset: matches ? matchingPrefix!!.offset : 0,
  };
};

export interface CompletionChunk {
  text: string;
  matches: boolean;
}

export interface Completion {
  text: string;
  textWithHighlights: CompletionChunk[];
  list: SuggestionType;
  value: string;
  id?: string;
}

const getHighlights = (match: Match, text: string): CompletionChunk[] => {
  const textBeforeMatch = match.text.substr(0, match.offset);
  const textMatching = match.text.substr(match.offset, text.length);
  const textAfterMatch = match.text.substr(match.offset + text.length);

  return [
    { text: textBeforeMatch, matches: false },
    { text: textMatching, matches: true },
    { text: textAfterMatch, matches: false },
  ].filter((chunk) => chunk.text.length > 0);
};

const completions = (lists: Lists, txt: string): Completion[] => {
  const results = Object.keys(lists)
    .reduce((acc: EnrichedEntry[], listName: SuggestionType) => {
      for (const entry of lists[listName]) {
        acc.push({ list: listName, entry });
      }
      return acc;
    }, [])
    .map((entry) => getMatch(entry, txt))
    .filter((matchResult) => matchResult.matches)
    .sort((m1, m2) => m2.weight - m1.weight)
    .map((matchResult) => ({
      text: matchResult.text,
      id: matchResult.id,
      value: matchResult.text,
      textWithHighlights: getHighlights(matchResult, txt),
      list: matchResult.list,
    }));

  const subjects = results
    .filter((entry) => entry.list === 'subjects')
    .slice(0, 3);
  const topics = results.filter((entry) => entry.list === 'topics').slice(0, 4);
  const channels = results
    .filter((entry) => entry.list === 'channels')
    .slice(0, 3);

  return topics.concat(subjects).concat(channels);
};

export interface Suggestion {
  value: string;
  id?: string;
}

export type Lists = {
  subjects?: Suggestion[];
  channels?: Suggestion[];
  topics?: Suggestion[];
};

interface EnrichedEntry {
  list: SuggestionType;
  entry: Suggestion;
}

export const completionsFor = (lists: Lists) => (txt: string): Completion[] =>
  txt.length >= 3 ? completions(lists, txt) : [];
