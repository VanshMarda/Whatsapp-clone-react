//libs
import { useCallback } from "react";

//types
import { Connection } from "../constant/connections";

import { useLocalStorage } from "./useLocalStorage";

export function useConnections() {
  const [connections, setConnections] = useLocalStorage("connections", []);

  // const fetchConnections = () => {
  //   const connectionsObj = getConnectionsFromStorage();
  //   const connectionsArray = Object.values(connectionsObj);
  //   setConnections(connectionsArray);
  // };

  // useEffect(() => {
  //   fetchConnections();
  // }, []);

  const handleEditMessage = useCallback(
    (key: number, message: string, selectedChat: Connection | null) => {
      setConnections(
        connections.map((connection) => {
          if (connection.id === selectedChat?.id) {
            return {
              ...connection,
              messages: connection.messages.map((mess, index) => {
                if (index === key) {
                  return newMessage;
                }
                return mess;
              }),
            };
          }
          return connection;
        })
      );
      return newMessage;
    },
    [connections]
  );

  const handleDeleteMessage = useCallback(
    (key: number, selectedChat: Connection | null) => {
      if (selectedChat === null) return;
      setConnections(
        connections.map((connection) => {
          if (connection.id !== selectedChat.id) return connection;
          return {
            ...connection,
            messages: connection.messages.filter((_, index) => index !== key),
          };
        })
      );
    },
    [connections]
  );

  const handleNewMessage = useCallback(
    (message: string, selectedChat: Connection | null) => {
      if (selectedChat === null) return;
      const newMessage = {
        id: `message_id_${Date.now()}`,
        message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setConnections((prevConnections) =>
        prevConnections.map((connection) =>
          connection.id === selectedChat.id
            ? {
                ...connection,
                messages: [...connection.messages, newMessage],
              }
            : connection
        )
      );
      return newMessage;
    },
    [connections]
  );

  const handleUpdate = useCallback(
    (newConnection: Connection) => {
      setConnections((prevConnections) => [...prevConnections, newConnection]);
    },
    [connections]
  );

  const handleDelete = useCallback(
    (id: string) => {
      setConnections(connections.filter((connection) => connection.id !== id));
    },
    [connections]
  );

  return {
    connections,
    oneEditMessage: handleEditMessage,
    onDeleteMessage: handleDeleteMessage,
    onNewMessage: handleNewMessage,
    onUpdate: handleUpdate,
    onDelete: handleDelete,
  };
}
