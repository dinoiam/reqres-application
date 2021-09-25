const LOCALSTORAGE_KEY = 'reqres';

type LocalStorageValue = { token: string };

/**
 * Save the Object inside the localStorage
 *
 * @param value - The value to save inside the localStorage
 *
 * @returns void
 *
 */
export function setLocalStorage(value: LocalStorageValue): void {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(value));
}

/**
 * Remove the item from the localStorage
 *
 *
 * @returns void
 *
 */
export function removeLocalStorage(): void {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

/**
 * Get the token saved inside the localStorage
 *
 *
 * @returns The token saved or null
 *
 */
export function getTokenFromLocalStorage(): string | null {
  const localStorageValue = localStorage.getItem(LOCALSTORAGE_KEY);
  if (localStorageValue) {
    return (JSON.parse(localStorageValue) as LocalStorageValue).token;
  }
  return null;
}

/**
 * Check if the token inside the localStorage exist
 *
 *
 * @returns Return true if exist, false otherwise
 *
 */
export function isAuthenticated(): boolean {
  return getTokenFromLocalStorage() ? true : false;
}
