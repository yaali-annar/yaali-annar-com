import type { FC, PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import usePersistedState from "@/hooks/use-persisted-state";

interface PersistedStateContextProps<T> {
  state: T;
  setPersistedState: (value: T) => void;
}

const createPersistedStateContext = <T,>(storageKey: string, initialValue: T) => {
  const PersistedStateContext = createContext<PersistedStateContextProps<T> | undefined>(undefined);

  const PersistedStateProvider: FC<PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
    const [state, setPersistedState] = usePersistedState<T>(initialValue, storageKey);
    return (
      <PersistedStateContext.Provider value={{ state, setPersistedState }}>
        {children}
      </PersistedStateContext.Provider>
    );
  };

  const usePersistedStateContext = (): PersistedStateContextProps<T> => {
    const context = useContext(PersistedStateContext);
    if (!context) {
      throw new Error("usePersistedStateContext must be used within a PersistedStateProvider");
    }
    return context;
  };

  return { PersistedStateProvider, usePersistedStateContext };
};

export default createPersistedStateContext;