//libs
import { useState, useCallback, useMemo } from "react";

//hooks
import { useConnections } from "./useConnections";
import { useChat } from "./useChat";
//types
import { Connection } from "../constant/connections";
import { useLocalStorage } from "./useLocalStorage";

export const useChatApp = () => {
  // Use existing hooks
  const {
    connections,
    oneEditMessage,
    onDeleteMessage,
    onNewMessage,
    onUpdate,
    onDelete,
  } = useConnections();

  const {
    onEditMessageInLocalStorage,
    onDeleteMessageInLocalStorage,
    onNewMessageInLocalStorage,
    onUpdateInLocalStorage,
    onDeleteInLocalStorage,
  } = useLocalStorage();

  const { chatSelectedId, handleChatSelectedId } = useChat();

  const SelectedChat: Connection | undefined = useMemo(
    () => connections.find((connection) => connection.id === chatSelectedId),
    [connections, chatSelectedId]
  );

  // Additional state from App.tsx
  const [isCompactMode, setIsCompactMode] = useState<boolean>(false);

  // Combined functions from App.tsx
  const handleEditMessage = useCallback(
    (key: number, message: string) => {
      if (!SelectedChat) return;
      const messageObject = oneEditMessage(key, message, SelectedChat);
      if (!messageObject) return;
      onEditMessageInLocalStorage(key, chatSelectedId, messageObject);
    },
    [SelectedChat, oneEditMessage]
  );

  const handleDeleteMessage = useCallback(
    (key: number) => {
      if (!SelectedChat) return;
      onDeleteMessage(key, SelectedChat);
      onDeleteMessageInLocalStorage(key, SelectedChat.id, SelectedChat);
    },
    [chatSelectedId, onDeleteMessage]
  );

  const handleChatSelect = useCallback(
    (connection: Connection) => {
      const currentConnection =
        connections.find((conn) => conn.id === connection.id) || connection;
      handleChatSelectedId(currentConnection.id);
    },
    [connections, handleChatSelectedId]
  );

  const handleNewMessage = useCallback(
    (message: string) => {
      if (!SelectedChat) return;
      const newMessageObj = onNewMessage(message, SelectedChat);
      if (!newMessageObj) return;
      onNewMessageInLocalStorage(SelectedChat, newMessageObj, chatSelectedId);

    },
    [onNewMessage, SelectedChat]
  );

  const handleNewConnection = useCallback(
    (name: string, initialMessage: string) => {
      const newConnection: Connection = {
        id: `user_id_${Date.now()}`, // Simple ID generation
        name: name,
        profileImg: `https://i.pravatar.cc/40?img=${
          Math.floor(Math.random() * 50) + 1
        }`, // Random avatar
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
      onUpdate(newConnection);
      onUpdateInLocalStorage(newConnection);
      handleChatSelect(newConnection);
    },
    [onUpdate, handleChatSelect]
  );

  const handleDeleteConnection = useCallback(
    (id: string) => {
      onDelete(id);
      onDeleteInLocalStorage(id);
      if (chatSelectedId === id) {
        handleChatSelectedId(null);
      }
    },
    [onDelete, chatSelectedId, handleChatSelectedId]
  );

  const toggleCompactMode = useCallback(() => {
    setIsCompactMode(!isCompactMode);
  }, [isCompactMode]);

  return {
    // State
    connections,
    onNewConnection: handleNewConnection,
    onDeleteConnection: handleDeleteConnection,

    isCompactMode,
    toggleCompactMode,

    // Main functions for App.tsx to use
    SelectedChat,
    onEditMessage: handleEditMessage,
    onDeleteMessage: handleDeleteMessage,
    onChatSelect: handleChatSelect,
    onNewMessage: handleNewMessage,
  };
};
