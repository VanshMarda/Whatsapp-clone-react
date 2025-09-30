import { createContext, ReactNode, useContext, useState, memo } from "react";

const ModeContext = createContext({
  isCompactMode: false,
  toggleCompactMode: () => {},
});

export const useModeContextProvider = () => useContext(ModeContext);

const ModeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isCompactMode, setIsCompactMode] = useState(false);

  const toggleCompactMode = () => {
    setIsCompactMode(!isCompactMode);
  };

  return (
    <ModeContext.Provider value={{ isCompactMode, toggleCompactMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default memo(ModeContextProvider);
