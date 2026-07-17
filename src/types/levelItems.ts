export type LanguageCode = "tr" | "en" | "pt" | "fr" | "ku";

export interface RawLevelItem {
  tr: string;
  en: string;
  pt: string;
  fr: string;
  ku: string;
  [audioKey: string]: string;
}

export interface LevelItem {
  id: string;
  word: string;
  translation: string;
  audioUrl?: string;
}

export type Level = RawLevelItem[];