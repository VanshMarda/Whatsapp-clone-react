//types
import { Action, Connection } from "../constant/connections.tsx";

//components
import Profile from "./left-panel/Profile.tsx";
import ChatItem from "./left-panel/ChatItem.tsx";
import StartNewChat from "./left-panel/StartNewChat.tsx";

const LeftPanel = ({
  chatSelected,
  connections,
  onAction,
}: {
  chatSelected: Connection | undefined;
  connections: Connection[];
  onAction: (action: Action) => void;
}) => {
  return (
    <div className="w-80 h-full flex flex-col border-r border-gray-700 bg-[#161717] text-white overflow-hidden">
      <Profile />
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar-dark">
        <ul className="flex flex-col">
          {connections.map((connection) => {
            return (
              <ChatItem 
                onAction={onAction}
                key={connection.id}
                connection={connection}
                isSelected={chatSelected?.id === connection.id}
              />
            );
          })}
        </ul>
      </div>
      <StartNewChat onAction={onAction}  />
    </div>
  );
};

export default LeftPanel;
