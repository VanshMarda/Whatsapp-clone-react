import { useState } from "react";
import "./App.css";
import LeftPanel from "./components/LeftPanel.tsx";
import RightPanel from "./components/RightPanel.tsx";
import { Connection, CONNECTIONS } from "./constant/connections";

function App() {
  const [chatSelected, setChatSelected] = useState<Connection | null>(null);
  const [connections, setConnections] = useState<Connection[]>(CONNECTIONS);

  // function to delete message
  function handleDeleteMessage(key: number) {
    setConnections(
      connections.map((connection) => {
        if (connection.id !== chatSelected?.id) return connection;
        return {
          ...connection,
          messages: connection.messages.filter((_, index) => index !== key),
        };
      })
    );
    setChatSelected((prevSelected) => ({
      ...prevSelected!,
      messages: prevSelected!.messages.filter((_, index) => index !== key),
    }));
  }

  // function to select chat
  function handleChatSelect(connection: Connection) {
    const currentConnection =
      connections.find((conn) => conn.id === connection.id) || connection;
    setChatSelected(currentConnection);
  }

  // function to add new message
  function handleNewMessage(message: string) {
    if (!chatSelected) return;

    setConnections((prevConnections) =>
      prevConnections.map((connection) =>
        connection.id === chatSelected.id
          ? { ...connection, messages: [...connection.messages, message] }
          : connection
      )
    );

    setChatSelected((prevSelected) => ({
      ...prevSelected!,
      messages: [...prevSelected!.messages, message],
    }));
  }

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-row">
        <LeftPanel
          handleChatSelect={handleChatSelect}
          chatSelected={chatSelected}
          connections={connections}
        />
        <RightPanel
          handleDeleteMessage={handleDeleteMessage}
          chatSelected={chatSelected!}
          handleNewMessage={handleNewMessage}
        />
      </div>
    </div>
  );
}

export default App;
