import { Connection } from "../constant/connections";
import Profile from "./left-panel/Profile.tsx";
import ChatItem from "./left-panel/ChatItem.tsx";

const LeftPanel = ({
  onChatSelect,
  chatSelected,
  connections,
}: {
  onChatSelect: (connection: Connection) => void;
  chatSelected: Connection | null;
  connections: Connection[];
}) => {

  return (
    <div className="basis-1/4 h-screen border-r border-gray-700 bg-[#111b21] text-white">
      <Profile />
      <ul className="flex-1 overflow-y-auto">
        {connections.map((connection) => {
          return (
            <ChatItem
              onChatSelect={onChatSelect}
              key={connection.id}
              connection={connection}
              isSelected={chatSelected?.id === connection.id}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default LeftPanel;
