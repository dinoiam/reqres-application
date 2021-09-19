const LOCALSTORAGE_KEY = 'reqres';

type LocalStorageValue = { token: string };

export function setLocalStorage(value: LocalStorageValue): void {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(value));
}

export function removeLocalStorage(): void {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

export function getTokenFromLocalStorage(): string | null {
  const localStorageValue = localStorage.getItem(LOCALSTORAGE_KEY);
  if (localStorageValue) {
    return (JSON.parse(localStorageValue) as LocalStorageValue).token;
  }
  return null;
}

export function isAuthenticated(): boolean {
  return getTokenFromLocalStorage() ? true : false;
}
