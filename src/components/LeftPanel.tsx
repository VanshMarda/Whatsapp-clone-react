import { CONNECTIONS, Connection } from "../constant/connections";
import Profile from "./left-panel/Profile.tsx";
import  ChatList  from "./left-panel/ChatList.tsx";


const LeftPanel = ({handleChatSelect, chatSelected}:{handleChatSelect:(connection:Connection)=>void, chatSelected:Connection}) => {
  return (
    <div className="basis-1/4 h-screen border-r border-gray-700 bg-[#111b21] text-white">
      <Profile/>
      <ul className="flex-1 overflow-y-auto">
        {CONNECTIONS.map((connection, idx) => {
            return <ChatList handleChatSelect={handleChatSelect} key={idx} connection={connection} idx={idx} isSelected={connection.id === chatSelected.id}/>
        })}
      </ul>
    </div>
  );
};

export default LeftPanel;
