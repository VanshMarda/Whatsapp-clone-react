//component
import LeftPanel from "./components/LeftPanel.tsx";
import RightPanel from "./components/RightPanel.tsx";

//styles
import "./App.css";

//hooks
import { useChatApp } from "./hooks/useChatApp.ts";

function App() {
  const {
    connections,
    chatSelected,
    isCompactMode,
    handleEditMessage,
    handleDeleteMessage,
    handleChatSelect,
    handleNewMessage,
    handleNewConnection,
    handleDeleteConnection,
    toggleCompactMode,
  } = useChatApp();

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-row h-full">
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
