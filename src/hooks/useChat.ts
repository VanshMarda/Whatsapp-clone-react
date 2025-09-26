//libs
import { useCallback, useState, useMemo } from "react";

//types
import { Connection } from "../constant/connections";

//hooks
import { useLocalStorage } from "./useLocalStorage";

export function useChat() {
  const [chats, setchats] = useLocalStorage<Connection[]>("chats", []);
  const [selectedChatId, setselectedChatId] = useState<string | null>(null);

  const selectedChat = useMemo(
    () => chats.find((chat) => chat.id === selectedChatId),
    [chats, selectedChatId]
  );

  const handleEditMessage = useCallback(
    (key: number, message: string) => {
      setchats(
        chats.map((chat) =>
          chat.id === selectedChat?.id
            ? {
                ...chat,
                messages: chat.messages.map((mess, index) =>
                  index === key
                    ? {
                        id: `message_id_${Date.now()}`,
                        message,
                        time: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                      }
                    : mess
                ),
              }
            : chat
        )
      );
    },
    [chats, selectedChat]
  );

  const handleDeleteMessage = useCallback(
    (key: number) => {
      if (selectedChat === undefined) return;
      setchats(
        chats.map((chat) => {
          if (chat.id !== selectedChat.id) return chat;
          return {
            ...chat,
            messages: chat.messages.filter((_, index) => index !== key),
          };
        })
      );
    },
    [chats, selectedChat]
  );

  const handleChatSelect = useCallback(
    (chat: Connection) => {
      const currentConnection =
        chats.find((conn) => conn.id === chat.id) || chat;
      setselectedChatId(currentConnection.id);
    },
    [chats, setselectedChatId]
  );

  const handleNewMessage = useCallback(
    (message: string) => {
      if (selectedChat === undefined) return;
      setchats((prevchats) =>
        prevchats.map((chat) =>
          chat.id === selectedChat.id
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: `message_id_${Date.now()}`,
                    message,
                    time: new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  },
                ],
              }
            : chat
        )
      );
    },
    [chats, selectedChat]
  );

  const handleNewConnection = useCallback(
    (name: string, initialMessage: string) => {
      const newConnection: Connection = {
        id: `user_id_${Date.now()}`,
        name: name,
        profileImg: `https://i.pravatar.cc/40?img=${
          Math.floor(Math.random() * 50) + 1
        }`,
        messages: initialMessage
          ? [
              {
                id: `message_id_${Date.now()}`,
                message: initialMessage,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ]
          : [],
      };
      setchats((prevchats) => [...prevchats, newConnection]);
      handleChatSelect(newConnection);
    },
    [chats, handleChatSelect]
  );

  const handleDeleteConnection = useCallback(
    (id: string) => {
      setchats(chats.filter((chat) => chat.id !== id));
    },
    [chats]
  );

  return {
    chats,

    onNewConnection: handleNewConnection,
    onDeleteConnection: handleDeleteConnection,

    selectedChat,
    onEditMessage: handleEditMessage,
    onDeleteMessage: handleDeleteMessage,
    onNewMessage: handleNewMessage,
    onChatSelect: handleChatSelect,
  };
}
