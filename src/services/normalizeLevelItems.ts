import type { RawLevelItem, LevelItem, LanguageCode } from "../types/levelItems";

export function normalizeLevelItems(
  rawItems: RawLevelItem[],
  sourceLang: LanguageCode,
  targetLang: LanguageCode
): LevelItem[] {
  return rawItems.map((raw) => {
    const targetWord = raw[targetLang];
    const sourceWord = raw[sourceLang];

    // audio keys might have stray trailing/leading spaces (seen in real data),
    // so try exact match first, then fall back to a trimmed match
    let audioDataUri: string | undefined = raw[targetWord];

    if (!audioDataUri) {
      const trimmedTarget = targetWord.trim();
      const matchingKey = Object.keys(raw).find((key) => key.trim() === trimmedTarget);
      audioDataUri = matchingKey ? raw[matchingKey] : undefined;
    }

    return {
      id: targetWord,
      word: targetWord,
      translation: sourceWord,
      audioUrl: audioDataUri || undefined,
    };
  });
}