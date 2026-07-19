import type { RawLevelItem } from "../types/levelItems";
import { apiGet } from "./client";

export async function downloadLevel(levelNumber: number): Promise<RawLevelItem[]> {
  
  return apiGet<RawLevelItem[]>(`/level${levelNumber}.json`);
}