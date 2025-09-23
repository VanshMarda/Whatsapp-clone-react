//libs
import { useState, useEffect, useCallback } from "react";

//types
import { Connection } from "../constant/connections";

export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    console.log("effect rerendered again")
    // keys are not getting fetched in the order of creation
    const keys = Object.keys(localStorage);
    const values = keys.map((key) => localStorage.getItem(key));
    setConnections(values.map((value) => JSON.parse(value || "{}")));
  }, []);

  const handleEditMessageInConnection = useCallback((
    key: number,
    message: string,
    id: string | undefined 
   ) => {
    console.log("yooo");
    setConnections(
      connections.map((connection) => {
        if (connection.id === id) {
          return {
            ...connection,
            messages: connection.messages.map((mess, index) => {
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
          };
        }
        return connection;
      })
    );
  },[connections])

  const handleDeleteMessageInConnection = useCallback((
    key: number,
    id: string | undefined
  ) => {
    setConnections(
      connections.map((connection) => {
        if (connection.id !== id) return connection;
        return {
          ...connection,
          messages: connection.messages.filter((_, index) => index !== key),
        };
      })
    );
  },[connections])

  const handleNewMessageInConnection =useCallback((
    message: string,
    id: string | undefined
  ) => {
    // console.log(message,id)
    console.log(connections)
    setConnections((prevConnections) =>
      prevConnections.map((connection) =>
        connection.id === id
          ? {
              ...connection,
              messages: [
                ...connection.messages,
                {
                  id: `message_id_${Date.now()}`,
                  message,
                  time: new Date().toLocaleTimeString(),
                },
              ],
            }
          : connection
      )
    );
  },[connections])

  const handleUpdateConnections= useCallback((newConnection: Connection)=> {
    setConnections((prevConnections) => [...prevConnections, newConnection]);
  },[connections])

  const handleDeleteAConnection = useCallback((id:string)=> {
    setConnections(connections.filter((connection) => connection.id !== id));
  },[connections])

  return {
    connections,
    handleEditMessageInConnection,
    handleDeleteMessageInConnection,
    handleNewMessageInConnection,
    handleUpdateConnections,
    handleDeleteAConnection,
    setConnections
  };
}
