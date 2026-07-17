import type { User } from "../types/user";

const SESSION_KEY = "sollingo_user_session";

export function saveUserSession(user: User): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getUserSession(): User | null {
  const data = localStorage.getItem(SESSION_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
}

export function clearUserSession(): void {
  localStorage.removeItem(SESSION_KEY);
}