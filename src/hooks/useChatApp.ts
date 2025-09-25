//libs
import { useState, useCallback, useMemo } from "react";

//hooks
import { useConnections } from "./useConnections";
import { useChat } from "./useChat";
//types
import { Connection } from "../constant/connections";
import { useLocalStorage } from "./useLocalStorage";

export const useChatApp = () => {
  const {
    chats,
    selectedChat,
    onEditMessage,
    onDeleteMessage,
    onNewMessage,
    onUpdate,
    onDelete,
    onChangeCurrentChat,
  } = useChats();

  return {
    // State
    chats,
    onCreateNewChat: handleNewConnection,
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
