import { Injectable } from '@angular/core';

type Primitive = string | number | boolean;

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  set(key: string, value: Primitive): void {
    localStorage.setItem(key, String(value));
  }

  getString(key: string): string | null {
    return localStorage.getItem(key);
  }

  getNumber(key: string): number | null {
    const value = this.getString(key);
    return value !== null ? Number(value) : null;
  }

  getBoolean(key: string): boolean | null {
    const value = this.getString(key);
    if (value === null) return null;

    return value === 'true';
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
