import { Connection, Message } from "../constant/connections";

export const useLocalStorage = () => {
   const getConnectionsFromStorage = (): Record<string, Connection> => {
    const stored = localStorage.getItem("connectionIdVsInfo");
    return stored ? JSON.parse(stored) : {};
  };

  const setConnectionsToStorage = (
    connectionsObj: Record<string, Connection>
  ) => {
    localStorage.setItem("connectionIdVsInfo", JSON.stringify(connectionsObj));
  };

  const handleEditMessageInLocalStorage = (
    key: number,
    id: string | null,
    newMessage: Message
  ) => {
    if (id === null) return;
    const connectionsObj = getConnectionsFromStorage();
    connectionsObj[id] = {
      ...connectionsObj[id],
      messages: connectionsObj[id].messages.map((mess, index) => {
        if (index === key) {
          return newMessage;
        }
        return mess;
      }),
    };
    setConnectionsToStorage(connectionsObj);
  };

  const handleDeleteMessageInLocalStorage = (
    key: number,
    id: string | null,
    chatSelected: Connection
  ) => {
    if (id === null) return;
    const connectionsObj = getConnectionsFromStorage();
    connectionsObj[id] = {
      ...chatSelected,
      messages: chatSelected.messages.filter((_, index) => index !== key),
    };
    setConnectionsToStorage(connectionsObj);
  };

  const handleNewMessageInLocalStorage = (
    chatSelected: Connection,
    newMessage: Message,
    id: string | null
  ) => {
    if (id === null) return;
    const connectionsObj = getConnectionsFromStorage();
    connectionsObj[id] = {
      ...chatSelected,
      messages: [...chatSelected.messages, newMessage],
    };
    setConnectionsToStorage(connectionsObj);
  };

  const handleUpdateInLocalStorage = (
    newConnection: Connection
  ) => {
    const connectionsObj = getConnectionsFromStorage();
    connectionsObj[newConnection.id] = newConnection;
    setConnectionsToStorage(connectionsObj);
  };

  const handleDeleteInLocalStorage = (id: string) => {
    const connectionsObj = getConnectionsFromStorage();
    delete connectionsObj[id];
    setConnectionsToStorage(connectionsObj);
  };

  return {
    getConnectionsFromStorage,
    onEditMessageInLocalStorage: handleEditMessageInLocalStorage,
    onDeleteMessageInLocalStorage: handleDeleteMessageInLocalStorage,
    onNewMessageInLocalStorage: handleNewMessageInLocalStorage,
    onUpdateInLocalStorage: handleUpdateInLocalStorage,
    onDeleteInLocalStorage: handleDeleteInLocalStorage,
  };
};
