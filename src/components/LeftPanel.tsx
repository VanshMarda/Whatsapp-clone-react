import { Connection } from "../constant/connections";
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
  chatSelected: Connection | null;
  connections: Connection[];
  onNewConnection: (name: string, initialMessage: string) => void;
  isCompactMode: boolean;
  onToggleCompactMode: () => void;
}) => {

  return (
    <div className="basis-3/16 min-h-screen border-r border-gray-700 bg-[#111b21] text-white">    
      <Profile onToggleCompactMode={onToggleCompactMode} />
      <ul className="flex-1 overflow-y-auto">
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
      <StartNewChat onNewConnection={onNewConnection}/>
    </div>
  );
};

export default LeftPanel;
