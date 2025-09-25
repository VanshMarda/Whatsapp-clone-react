//libs
import { useCallback, useState } from "react";

export const useChat = () => {
  const [chatSelected, setChatSelected] = useState<string | null>(null);

  const handleChatSelected = useCallback(
    (id: string | null) => {
      if(id === null)setChatSelected(null)
      setChatSelected(id);
    },
    [chatSelected]
  );

  return {
    chatSelectedId : chatSelected,
    handleChatSelectedId :handleChatSelected,
  };
};
