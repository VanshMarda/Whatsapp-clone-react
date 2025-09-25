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
    onNewConnection,
    onDeleteConnection,

    isCompactMode,
    toggleCompactMode,

    onEditMessage,
    onDeleteMessage,
    onChatSelect,
    onNewMessage,

    //selectedChat
    SelectedChat,
  } = useChatApp();

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-row h-full">
        <LeftPanel
          onChatSelect={onChatSelect}
          chatSelected={SelectedChat}
          connections={connections}
          onNewConnection={onNewConnection}
          onDeleteConnection={onDeleteConnection}
          isCompactMode={isCompactMode}
          onToggleCompactMode={toggleCompactMode}
        />
        <RightPanel
          onEditMessage={onEditMessage}
          onDeleteMessage={onDeleteMessage}
          chatSelected={SelectedChat}
          onNewMessage={onNewMessage}
          isCompactMode={isCompactMode}
        />
      </div>
    </div>
  );
}

export default App;
