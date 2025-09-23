//libs
import { useCallback, useState } from "react";

//types
import { Connection } from "../constant/connections";

export const useChat = () => {
  const [chatSelected, setChatSelected] = useState<Connection | null>(null);

  const handleEditChatMessage = useCallback(
    (key: number, message: string) => {
      setChatSelected((prevSelected) => ({
        ...prevSelected!,
        messages: prevSelected!.messages.map((mess, index) => {
          if (index === key) {
            return {
              id: `message_id_${Date.now()}`,
              message,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
          }
          return mess;
        }),
      }));
    },
    [chatSelected]
  );

  const handleDeleteChatMessage = useCallback(
    (key: number) => {
      setChatSelected((prevSelected) => ({
        ...prevSelected!,
        messages: prevSelected!.messages.filter((_, index) => index !== key),
      }));
    },
    [chatSelected]
  );

  const handleNewChatMessage = useCallback(
    (message: string) => {
      setChatSelected((prevSelected) => ({
        ...prevSelected!,
        messages: [
          ...prevSelected!.messages,
          {
            id: `message_id_${Date.now()}`,
            message,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      }));
    },
    [chatSelected]
  );

  const handleChatSelected = useCallback(
    (connection: Connection | null) => {
      setChatSelected(connection);
    },
    [chatSelected]
  );

  return {
    chatSelected,
    handleEditChatMessage,
    handleDeleteChatMessage,
    handleNewChatMessage,
    handleChatSelected,
  };
};
