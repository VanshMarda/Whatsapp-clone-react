//libs
import { useEffect, useState } from "react";

//components
import LeftPanel from "./components/LeftPanel.tsx";
import RightPanel from "./components/RightPanel.tsx";

//styles
import "./App.css";

//types
import { Connection } from "./constant/connections";

// useLocalStorage(key, defaultValue) // ->
// const [state, setState] = useState(() => {getLocalStorage(key) ?? defaultValue})
// useEffect(() => {
//.     syncLocalStorage(key, state);
// }, [state])
// return {state, handleChange}

// 1. useConnections
// 2. useLocalStorage
// 3. useMessages -> handleEdit, handleDelete,
// 4. useChatApp -> useConnection, useLocalStorage, useMessages
// libs, components, providers, hooks, utils, types, constants, icons, styles

function App() {
  //chats
  const [connections, setConnections] = useState<Connection[]>([]);
  //selectedConnection
  const [chatSelected, setChatSelected] = useState<Connection | null>(null);

  //context
  const [isCompactMode, setIsCompactMode] = useState<boolean>(false);

  // function to get connections from localStorage
  // connectionIds => list of connection ids
  // connectionIdVsInfo => {[user_id_123]: {}, [user_id_124]: {}}
  useEffect(() => {
    const keys = Object.keys(localStorage).reverse();
    const values = keys.map((key) => localStorage.getItem(key));
    setConnections(values.map((value) => JSON.parse(value || "{}")));
  }, []);

  function handleEditMessage(key: number, message: string) {
    setConnections(
      connections.map((connection) => {
        if (connection.id === chatSelected?.id) {
          return {
            ...connection,
            messages: connection.messages.map((mess, index) => {
              if (index === key) {
                return {
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

    setChatSelected((prevSelected) => ({
      ...prevSelected!,
      messages: prevSelected!.messages.map((mess, index) => {
        if (index === key) {
          return {
            message,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        }
        return mess;
      }),
    }));

    localStorage.setItem(
      chatSelected!.id,
      JSON.stringify({
        ...chatSelected,
        messages: chatSelected!.messages.map((mess, index) => {
          if (index === key) {
            return {
              message,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
          }
          return mess;
        }),
      })
    );
  }

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
    localStorage.setItem(
      chatSelected!.id,
      JSON.stringify({
        ...chatSelected,
        messages: chatSelected!.messages.filter((_, index) => index !== key),
      })
    );
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
          ? {
              ...connection,
              messages: [
                ...connection.messages,
                { message, time: new Date().toLocaleTimeString() },
              ],
            }
          : connection
      )
    );

    setChatSelected((prevSelected) => ({
      ...prevSelected!,
      messages: [
        ...prevSelected!.messages,
        {
          message,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    }));

    // add new message to localStorage
    localStorage.setItem(
      chatSelected.id,
      JSON.stringify({
        ...chatSelected,
        messages: [
          ...chatSelected.messages,
          {
            message,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      })
    );
  }

  // hook for connection
  // function to add new connection
  function handleNewConnection(name: string, initialMessage: string) {
    const newConnection: Connection = {
      id: `user_id_${Date.now()}`, // Simple ID generation
      name: name,
      profileImg: `https://i.pravatar.cc/40?img=${
        Math.floor(Math.random() * 50) + 1
      }`, // Random avatar
      messages: initialMessage
        ? [
            {
              message: initialMessage,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]
        : [],
    };

    setConnections((prevConnections) => [...prevConnections, newConnection]);
    setChatSelected(newConnection); // Automatically select the new chat
    // add new connection to localStorage
    localStorage.setItem(newConnection.id, JSON.stringify(newConnection));
  }

  // function to delete connection
  function handleDeleteConnection(id: string) {
    setConnections(connections.filter((connection) => connection.id !== id));
    localStorage.removeItem(id);
    if (chatSelected?.id === id) {
      setChatSelected(null);
    }
  }

  // function to toggle compact mode
  function toggleCompactMode() {
    setIsCompactMode(!isCompactMode);
  }

  return (
    <div className="w-screen">
      <div className="flex flex-row ">
        <LeftPanel
          onChatSelect={handleChatSelect}
          chatSelected={chatSelected}
          connections={connections}
          onNewConnection={handleNewConnection}
          onDeleteConnection={handleDeleteConnection}
          isCompactMode={isCompactMode}
          onToggleCompactMode={toggleCompactMode}
        />
        <RightPanel
          onEditMessage={handleEditMessage}
          onDeleteMessage={handleDeleteMessage}
          chatSelected={chatSelected}
          onNewMessage={handleNewMessage}
          isCompactMode={isCompactMode}
        />
      </div>
    </div>
  );
}

export default App;
