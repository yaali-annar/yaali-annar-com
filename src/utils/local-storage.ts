/**
 * Store data in localStorage as Base64 encoded JSON using Generics
 * @param key - The key under which to store the data
 * @param value - The value to store, must be serializable to JSON
 * @throws Error if value cannot be serialized to JSON
 */
const storeData = <T>(key: string, value: T): void => {
  try {
    const json = JSON.stringify(value);
    const uriComponent = encodeURIComponent(json);
    const base64 = btoa(uriComponent);
    localStorage.setItem(key, base64);
  } catch (err) {
    throw new Error(`Failed to store data: ${(err as Error).message}`);
  }
};

/**
 * Retrieve data from localStorage, decode it, and parse it as JSON using Generics
 * @param key - The key under which the data is stored
 * @returns The parsed JSON data
 * @throws Error if data is missing or invalid
 */
const retrieveData = <T>(key: string): T => {
  const base64 = localStorage.getItem(key);

  if (!base64) {
    throw new Error(`No data found for key: ${key}`);
  }

  try {
    const uriComponent = atob(base64);
    const json = decodeURIComponent(uriComponent);
    return JSON.parse(json) as T;
  } catch (err) {
    throw new Error(
      `Failed to retrieve or parse data for key: ${key} - ${
        (err as Error).message
      }`
    );
  }
};

export { retrieveData, storeData };
