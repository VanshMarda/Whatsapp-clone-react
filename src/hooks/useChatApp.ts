//libs
import { useState, useCallback } from "react";

//hooks
import { useConnections } from "./useConnections";
import { useChat } from "./useChat";
import { useLocalStorage } from "./useLocalStorage";

//types
import { Connection } from "../constant/connections";

export const useChatApp = () => {
  // Use existing hooks
  const {
    connections,
    handleEditMessageInConnection,
    handleDeleteMessageInConnection,
    handleNewMessageInConnection,
    handleUpdateConnections,
    handleDeleteAConnection,
  } = useConnections();

  const {
    chatSelected,
    handleEditChatMessage,
    handleDeleteChatMessage,
    handleNewChatMessage,
    handleChatSelected,
  } = useChat();

  const {
    handleEditMessageInLocalStorage,
    handleDeleteMessageInLocalStorage,
    handleNewMessageInLocalStorage,
    setLocalStorage,
    removeLocalStorage,
  } = useLocalStorage();

  // Additional state from App.tsx
  const [isCompactMode, setIsCompactMode] = useState<boolean>(false);

  // Combined functions from App.tsx
  const handleEditMessage = useCallback((key: number, message: string) => {
    handleEditMessageInConnection(key, message, chatSelected?.id);
    handleEditChatMessage(key, message);
    handleEditMessageInLocalStorage(key, message, chatSelected?.id);
  }, [chatSelected, handleEditMessageInConnection, handleEditChatMessage, handleEditMessageInLocalStorage]);

  const handleDeleteMessage = useCallback((key: number) => {
    handleDeleteMessageInConnection(key, chatSelected?.id);
    handleDeleteChatMessage(key);
    handleDeleteMessageInLocalStorage(key, chatSelected?.id);
  }, [chatSelected, handleDeleteMessageInConnection, handleDeleteChatMessage, handleDeleteMessageInLocalStorage]);

  const handleChatSelect = useCallback((connection: Connection) => {
    const currentConnection =
      connections.find((conn) => conn.id === connection.id) || connection;
    handleChatSelected(currentConnection);
  }, [connections, handleChatSelected]);

  const handleNewMessage = useCallback((message: string) => {
    if (!chatSelected) return;
    handleNewMessageInConnection(message, chatSelected.id);
    handleNewChatMessage(message);
    handleNewMessageInLocalStorage(message, chatSelected?.id);
  }, [chatSelected, handleNewMessageInConnection, handleNewChatMessage, handleNewMessageInLocalStorage]);

  const handleNewConnection = useCallback((name: string, initialMessage: string) => {
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
    handleUpdateConnections(newConnection);
    handleChatSelect(newConnection);
    setLocalStorage(newConnection.id, newConnection);
  }, [handleUpdateConnections, handleChatSelect, setLocalStorage]);

  const handleDeleteConnection = useCallback((id: string) => {
    handleDeleteAConnection(id);
    removeLocalStorage(id);
    if (chatSelected?.id === id) {
      handleChatSelected(null);
    }
  }, [handleDeleteAConnection, removeLocalStorage, chatSelected, handleChatSelected]);

  const toggleCompactMode = useCallback(() => {
    setIsCompactMode(!isCompactMode);
  }, [isCompactMode]);

  return {
    // State
    connections,
    chatSelected,
    isCompactMode,
    
    // Main functions for App.tsx to use
    handleEditMessage,
    handleDeleteMessage,
    handleChatSelect,
    handleNewMessage,
    handleNewConnection,
    handleDeleteConnection,
    toggleCompactMode,
  };
};
