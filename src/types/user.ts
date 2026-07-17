import type { LanguagePair } from "./languagePair";

export interface User {
  selectedLanguagePair: LanguagePair;
  selectedLevel: number;
}