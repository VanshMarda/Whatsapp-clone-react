//types
import { Connection } from "../constant/connections.tsx";

//components
import Profile from "./left-panel/Profile.tsx";
import ChatItem from "./left-panel/ChatItem.tsx";
import StartNewChat from "./left-panel/StartNewChat.tsx";

const LeftPanel = ({
  onDeleteChat,
  onSelectChat,
  chatSelected,
  connections,
  onNewChat,
}: {
  onDeleteChat: (id: string) => void;
  onSelectChat: (connection: Connection) => void;
  chatSelected: Connection | undefined;
  connections: Connection[];
  onNewChat: (name: string, initialMessage: string) => void;
}) => {
  return (
    <div className="w-80 h-full flex flex-col border-r border-gray-700 bg-[#161717] text-white overflow-hidden">
      <Profile />
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar-dark">
        <ul className="flex flex-col">
          {connections.map((connection) => {
            return (
              <ChatItem
                onDeleteChat={onDeleteChat}
                onSelectChat={onSelectChat}
                key={connection.id}
                connection={connection}
                isSelected={chatSelected?.id === connection.id}
              />
            );
          })}
        </ul>
      </div>
      <StartNewChat onNewChat={onNewChat} />
    </div>
  );
};

export default LeftPanel;
