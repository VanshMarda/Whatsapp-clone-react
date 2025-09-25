//types
import { Connection } from "../constant/connections";

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
  isCompactMode,
  onToggleCompactMode,
}: {
  onDeleteConnection: (id: string) => void;
  onChatSelect: (connection: Connection) => void;
  chatSelected: Connection | undefined;
  connections: Connection[];
  onNewConnection: (name: string, initialMessage: string) => void;
  isCompactMode: boolean;
  onToggleCompactMode: () => void;
}) => {

  return (
    <div className="w-80 h-full flex flex-col border-r border-gray-700 bg-[#111b21] text-white overflow-hidden">    
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
                isCompactMode={isCompactMode}
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
