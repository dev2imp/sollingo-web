export interface Language {
  name: string;
  code: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { name: "Turkish", code: "tr" },
  { name: "English", code: "en" },
  { name: "Portuguese", code: "pt" },
  { name: "French", code: "fr" },
  { name: "Kurdish", code: "ku" },
];

export interface LanguagePair {
  id: string;
  source: Language;
  target: Language;
}