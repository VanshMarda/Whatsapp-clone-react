//types
import { Connection } from "../constant/connections.tsx";

//components
import Profile from "./left-panel/Profile.tsx";
import ChatItem from "./left-panel/ChatItem.tsx";
import StartNewChat from "./left-panel/StartNewChat.tsx";

const LeftPanel = ({
  onDeleteConnection,
  onChatSelect,
  chatSelected,
  connections,
  onNewConnection,
  onToggleCompactMode,
}: {
  onDeleteConnection: (id: string) => void;
  onChatSelect: (connection: Connection) => void;
  chatSelected: Connection | undefined;
  connections: Connection[];
  onNewConnection: (name: string, initialMessage: string) => void;
  onToggleCompactMode: () => void;
}) => {

  return (
    <div className="w-80 h-full flex flex-col border-r border-gray-700 bg-[#161717] text-white overflow-hidden">    
      <Profile onToggleCompactMode={onToggleCompactMode} />
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar-dark">
        <ul className="flex flex-col">
          {connections.map((connection) => {
            return (
              <ChatItem
                onDeleteConnection={onDeleteConnection}
                onChatSelect={onChatSelect}
                key={connection.id}
                connection={connection}
                isSelected={chatSelected?.id === connection.id}
              />
            );
          })}
        </ul>
      </div>
      <StartNewChat onNewConnection={onNewConnection}/>
    </div>
  );
};

export default LeftPanel;
