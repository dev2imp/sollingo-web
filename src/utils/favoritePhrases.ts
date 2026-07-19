import type { ExerciseQuestion } from "../services/questionSelector";

export const FAVORITE_REVIEW_THRESHOLD = 10;
const FAVORITE_PHRASES_KEY = "sollingo_favorite_phrases";


function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}
export function addFavoritePhrases(item: ExerciseQuestion): string {
     const id = generateId();
     const favorites = getFavoritePhrases();
     favorites[id] = item;
     localStorage.setItem(FAVORITE_PHRASES_KEY, JSON.stringify(favorites));
     return id;
}

export function getFavoritePhrases(): Record<string, ExerciseQuestion> {
  const data = localStorage.getItem(FAVORITE_PHRASES_KEY);
  if (!data) return {};
  try {
    return JSON.parse(data) as Record<string, ExerciseQuestion>;
  } catch {
    return {};
  }
}
export function removeItemFromFavoritePhrases(id: string): void {
  const favorites = getFavoritePhrases();
  delete favorites[id];
  localStorage.setItem(FAVORITE_PHRASES_KEY, JSON.stringify(favorites));
}


export function clearFavoritePhrases(): void {
  localStorage.removeItem(FAVORITE_PHRASES_KEY);
}