import { Term } from '../pages/api/terms';

export default class MyStorage {
  readonly #storage: Storage;

  constructor(storage: Storage) {
    this.#storage = storage;
  }

  getTerms() {
    const value = this.#get('terms');
    if (value === null) return null;

    const parsedValue = JSON.parse(value);
    if (!this.#isTermArray(parsedValue)) return null;
    return parsedValue;
  }
  setTerms(terms: Term[]) {
    this.#set('terms', JSON.stringify(terms));
  }

  getUpdatedTimestamp() {
    const value = this.#get('updatedTimestamp');
    if (value === null) return null;
    return Number(value);
  }
  setUpdatedTimestamp(timestamp: number) {
    this.#set('updatedTimestamp', String(timestamp));
  }

  #get(key: myStorageKeys): null | string {
    return this.#storage.getItem(key);
  }
  #set(key: myStorageKeys, value: string): void {
    return this.#storage.setItem(key, value);
  }

  #isTermArray(object: any): object is Term[] {
    return (
      object &&
      Array.isArray(object) &&
      typeof object[0].english === 'string' &&
      typeof object[0].korean === 'string' &&
      typeof object[0].type === 'string' &&
      typeof object[0].field === 'string' &&
      typeof object[0].description === 'string'
    );
  }
}

type myStorageKeys = 'terms' | 'updatedTimestamp';
