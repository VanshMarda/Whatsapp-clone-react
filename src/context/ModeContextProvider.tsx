import { createContext, ReactNode, useContext, useState } from "react";

const ModeContext = createContext({
  isCompactMode: false,
  toggleCompactMode: () => {},
});

export const useModeContextProvider = () => useContext(ModeContext);

const ModeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isCompactMode, setIsCompactMode] = useState(false);

  // useCallback
  const toggleCompactMode = () => {
    setIsCompactMode(!isCompactMode);
  };

  // Memoise value

  return (
    <ModeContext.Provider value={{ isCompactMode, toggleCompactMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeContextProvider;
