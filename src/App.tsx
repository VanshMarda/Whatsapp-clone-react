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

    onAction,
    
    selectedChat,
  } = useChat();
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="flex flex-row h-full">
        <ModeContextProvider>
          <LeftPanel
            chatSelected={selectedChat}
            connections={chats}
            onAction={onAction}
          />
          <RightPanel
            key={selectedChat?.id}
            onAction={onAction}
            chatSelected={selectedChat}
          />
        </ModeContextProvider>
      </div>
    </div>
  );
}

export default App;



// types folder - create a seperate folder
// action types - 2 files one for ACTION_TYPES constant in constants/actionTypes
// one for Action and other types in types/actions
