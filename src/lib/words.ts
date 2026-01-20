import _words from "../../data/words.yml";
const words = _words as Record<string, Record<string, string>>;

export const getCategories = () => {
  const w = Object.entries(words);
  return w.map(([category, wordList]) => ({
    name: category,
    count: Object.keys(wordList).length,
  }));
};

export const getWords = (categories?: string[]) => {
  if (!categories || categories.length === 0) {
    return Object.entries(words).flatMap(([category, wordList]) =>
      Object.entries(wordList).map(([word, hint]) => ({ word, hint, category })),
    );
  } else {
    return categories.flatMap((category) => {
      const wordList = words[category];
      if (!wordList) return [];
      return Object.entries(wordList).map(([word, hint]) => ({ word, hint, category }));
    });
  }
};
