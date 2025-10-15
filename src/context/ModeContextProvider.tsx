import {
  createContext,
  ReactNode,
  useContext,
  useState,
  memo,
  useMemo,
  useCallback,
} from "react";

const ModeContext = createContext({
  isCompactMode: false,
  toggleCompactMode: () => {},
});

export const useModeContextProvider = () => useContext(ModeContext);

const ModeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isCompactMode, setIsCompactMode] = useState(false);

  const toggleCompactMode = useCallback(() => {
    setIsCompactMode(!isCompactMode);
  }, [setIsCompactMode]);

  const value = useMemo(() => {
    return { isCompactMode, toggleCompactMode };
  }, [isCompactMode, toggleCompactMode]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

export default memo(ModeContextProvider);
