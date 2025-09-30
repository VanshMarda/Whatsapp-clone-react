//libs
import { useCallback, useState, useMemo } from "react";

//types
import { Action, Connection } from "../constant/connections";

//hooks
import { useLocalStorage } from "./useLocalStorage";

//utils
import { getNewConnection, getNewMessage } from "../utils/chatUtils";
import { ACTION_TYPES } from "../constant/actionTypes";

export function useChat() {
  const [chats, setchats] = useLocalStorage<Connection[]>("chats", []);
  const [selectedChatId, setselectedChatId] = useState<string | undefined>(undefined);

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
                  index === key ? getNewMessage(message) : mess
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
    (chatId: string) => {
      const currentConnection =
        chats.find((conn) => conn.id === chatId);
      setselectedChatId(currentConnection? currentConnection.id : undefined);
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
                messages: [...chat.messages, getNewMessage(message)],
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
      handleSelectChat(newConnection.id);
    },
    [chats, handleSelectChat]
  );

  const handleDeleteChat = useCallback(
    (id: string) => {
      setchats((prevChats) => prevChats.filter((chat) => chat.id !== id));
    },
    [chats]
  );

  const handleAction = (action: Action) => {
    switch (action.type) {
      case ACTION_TYPES.ON_DELETE_CHAT:
        handleDeleteChat(action.payload.id);
        break;
      case ACTION_TYPES.ON_EDIT_MESSAGE:
        handleEditMessage(action.payload.key, action.payload.message);
        break;
      case ACTION_TYPES.ON_SELECT_CHAT:
        handleSelectChat(action.payload.id);
        break;
      case ACTION_TYPES.ON_NEW_CHAT:
        handleNewChat(action.payload.name, action.payload.message);
        break;
      case ACTION_TYPES.ON_NEW_MESSAGE:
        handleNewMessage(action.payload.message);
        break;
      case ACTION_TYPES.ON_DELETE_MESSAGE:
        handleDeleteMessage(action.payload.key);
        break;
      default:
        break;
    }
  };

  return {
    chats,
    onAction: handleAction,
    selectedChat,
  };
}
