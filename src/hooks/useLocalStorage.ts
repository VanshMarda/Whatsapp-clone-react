import { useEffect, useState } from "react";
import { Connection, Message } from "../constant/connections";

export const useLocalStorage = <T>({ key: string, defaultValue: T }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<T>(() => {
    getItemFromLocalStorage(key) ?? defaultValue;
  });

  useEffect(() => {
    setIsLocalStorage(key);
  }, [state]);

  return [state, setState];
};
