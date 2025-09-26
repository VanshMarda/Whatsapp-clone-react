import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const getConnectionsFromStorage = (key: string): T => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  };

  const setConnectionsToStorage = (key: string) => {
    localStorage.setItem(key, JSON.stringify(state));
  };

  const [state, setState] = useState<T>(() => {
    return getConnectionsFromStorage(key);
  });

  useEffect(() => {
    console.log("Called the sync useeffect ");
    setConnectionsToStorage(key);
  }, [state]);

  return [state, setState] as const;
};
