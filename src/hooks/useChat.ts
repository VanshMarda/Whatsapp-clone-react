//libs
import { useCallback, useState, useMemo } from "react";

//types
import { Connection } from "../constant/connections";

//hooks
import { useLocalStorage } from "./useLocalStorage";

//utils
import { getNewConnection, getNewMessage } from "../utils/chatUtils";

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
                    ? getNewMessage(message)
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

  const handleSelectChat = useCallback(
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
                getNewMessage(message),
                ],
              }
            : chat
        )
      );
    },
    [chats, selectedChat]
  );

  const handleNewChat = useCallback(
    (name: string, initialMessage: string) => {
      const newConnection = getNewConnection(name, initialMessage);
      setchats((prevchats) => [...prevchats, newConnection]);
      handleSelectChat(newConnection);
    },
    [chats, handleSelectChat]
  );

  const handleDeleteChat = useCallback(
    (id: string) => {
      setchats((prevChats) => prevChats.filter((chat) => chat.id !== id));
    },
    [chats]
  );

  return {
    chats,

    onNewChat: handleNewChat,
    onDeleteChat: handleDeleteChat,

    selectedChat,
    onEditMessage: handleEditMessage,
    onDeleteMessage: handleDeleteMessage,
    onNewMessage: handleNewMessage,
    onSelectChat: handleSelectChat,
  };
}
