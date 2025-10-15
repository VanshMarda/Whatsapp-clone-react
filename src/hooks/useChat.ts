//libs
import { useState, useMemo } from "react";

//types
import { Connection } from "../constant/connections";
import { Action } from "../types/actions";

//hooks
import { useLocalStorage } from "./useLocalStorage";

//utils
import { getNewConnection, getNewMessage } from "../utils/chatUtils";
import { ACTION_TYPES } from "../constant/actionTypes";

export function useChat() {
  const [chats, setchats] = useLocalStorage<Connection[]>("chats", []);
  const [selectedChatId, setselectedChatId] = useState<string | undefined>(
    undefined
  );

  const selectedChat = useMemo(
    () => chats.find((chat) => chat.id === selectedChatId),
    [chats, selectedChatId]
  );

  const handleAction = (action: Action) => {
    switch (action.type) {
      case ACTION_TYPES.ON_DELETE_CHAT:
        {
          setchats((prevChats) =>
            prevChats.filter((chat) => chat.id !== action.payload.id)
          );
        }
        break;
      case ACTION_TYPES.ON_EDIT_MESSAGE:
        {
          setchats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === selectedChat?.id
                ? {
                    ...chat,
                    messages: chat.messages.map((mess, index) =>
                      index === action.payload.key
                        ? getNewMessage(action.payload.message)
                        : mess
                    ),
                  }
                : chat
            )
          );
        }
        break;
      case ACTION_TYPES.ON_SELECT_CHAT:
        {
          setselectedChatId(action.payload.id);
        }
        break;
      case ACTION_TYPES.ON_NEW_CHAT:
        {
          const newConnection = getNewConnection(
            action.payload.name,
            action.payload.message
          );
          setchats((prevchats) => [...prevchats, newConnection]);
          setselectedChatId(newConnection.id);
        }
        break;
      case ACTION_TYPES.ON_NEW_MESSAGE:
        {
          setchats((prevchats) =>
            prevchats.map((chat) =>
              chat.id === selectedChat?.id
                ? {
                    ...chat,
                    messages: [
                      ...chat.messages,
                      getNewMessage(action.payload.message),
                    ],
                  }
                : chat
            )
          );
        }
        break;
      case ACTION_TYPES.ON_DELETE_MESSAGE:
        {
          setchats((prevchats) =>
            prevchats.map((chat) =>
              chat.id === selectedChat?.id
                ? {
                    ...chat,
                    messages: chat.messages.filter(
                      (_, index) => index !== action.payload.key
                    ),
                  }
                : chat
            )
          );
        }
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
