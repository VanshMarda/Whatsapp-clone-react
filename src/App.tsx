//component
import LeftPanel from "./components/LeftPanel.tsx";
import RightPanel from "./components/RightPanel.tsx";

//styles
import "./App.css";

//hooks
import { useChat } from "./hooks/useChat.ts";
import { modeContext } from "./context/mode.tsx";
import {useState } from "react";

function App() {
  const [isCompactMode, setIsCompactMode] = useState(false)
  const {
    chats,
    onNewConnection,
    onDeleteConnection,

    onEditMessage,
    onDeleteMessage,
    onChatSelect,
    onNewMessage,

    selectedChat,
  } = useChat();

const toggleCompactMode = () => {
  setIsCompactMode(!isCompactMode)
}

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-row h-full">
        <modeContext.Provider value={isCompactMode}>
        <LeftPanel
          onChatSelect={onChatSelect}
          chatSelected={selectedChat}
          connections={chats}
          onNewConnection={onNewConnection}
          onDeleteConnection={onDeleteConnection}
          onToggleCompactMode={toggleCompactMode}
        />
        <RightPanel
          onEditMessage={onEditMessage}
          onDeleteMessage={onDeleteMessage}
          chatSelected={selectedChat}
          onNewMessage={onNewMessage}
        />
        </modeContext.Provider>
      </div>
    </div>
  );
}

export default App;
