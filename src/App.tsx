//component
import LeftPanel from "./components/LeftPanel.tsx";
import RightPanel from "./components/RightPanel.tsx";

//styles
import "./App.css";

//hooks
import { useChat } from "./hooks/useChat.ts";
import ModeContextProvider from "./context/ModeContextProvider.tsx";

function App() {
  const {
    chats,
    onNewChat,
    onDeleteChat,

    onEditMessage,
    onDeleteMessage,
    onSelectChat,
    onNewMessage,

    selectedChat,
  } = useChat();

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-row h-full">
        <ModeContextProvider>
          <LeftPanel
            onSelectChat={onSelectChat}
            chatSelected={selectedChat}
            connections={chats}
            onNewChat={onNewChat}
            onDeleteChat={onDeleteChat}
          />
          <RightPanel
            key={selectedChat?.id}
            onEditMessage={onEditMessage}
            onDeleteMessage={onDeleteMessage}
            chatSelected={selectedChat}
            onNewMessage={onNewMessage}
          />
        </ModeContextProvider>
      </div>
    </div>
  );
}

export default App;
