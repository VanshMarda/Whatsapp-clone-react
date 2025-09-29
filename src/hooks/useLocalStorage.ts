import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const getValues = (key: string): T => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  };

  // setValues
  const setValues = (key: string) => {
    localStorage.setItem(key, JSON.stringify(state));
  };

  const [state, setState] = useState<T>(() => {
    
    return getValues(key);
  });

  useEffect(() => {
    console.log("Called the sync useeffect ");
    setValues(key);
  }, [state]);

  return [state, setState] as const;
};
