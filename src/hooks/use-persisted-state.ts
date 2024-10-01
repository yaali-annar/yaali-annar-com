import { retrieveData, storeData } from "@/utils/local-storage";
import { useCallback, useEffect, useState } from "react";

const usePersistedState = <T>(
  initialValue: T,
  storageKey: string
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(initialValue);

  const retrieveState = useCallback(() => {
    try {
      const stateFromStorage = retrieveData<T>(storageKey);
      setState(stateFromStorage);
    } catch {
      // Do nothing;
    }
  }, [storageKey]);

  const setPersistedState = useCallback(
    (value: T) => {
      storeData(storageKey, value);
      retrieveState();
    },
    [retrieveState, storageKey]
  );

  useEffect(() => retrieveState(), [retrieveState]);

  return [state, setPersistedState];
};

export default usePersistedState;
