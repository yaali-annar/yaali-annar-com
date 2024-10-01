const encodeData = <T>(value: T): string => {
  try {
    const json = JSON.stringify(value);
    const uriComponent = encodeURIComponent(json);
    return btoa(uriComponent);
  } catch (err) {
    throw new Error(`Failed to store data: ${(err as Error).message}`);
  }
};

const decodeData = <T>(value: string): T => {
  try {
    const uriComponent = atob(value);
    const json = decodeURIComponent(uriComponent);
    return JSON.parse(json) as T;
  } catch (err) {
    throw new Error(`Failed to decode data: ${(err as Error).message}`);
  }
};

export { encodeData, decodeData };
