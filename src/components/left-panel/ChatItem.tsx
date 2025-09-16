import { Connection } from "../../constant/connections";

const ChatItem = ({
  connection,
  onChatSelect,
  isSelected,
}: {
  connection: Connection;
  onChatSelect:(connection:Connection)=>void;
  isSelected?: boolean;
}) => {
  return (
    <li
      className={`flex items-center gap-3 px-4 py-3 border-b border-gray-700 hover:bg-[#202c33] cursor-pointer ${
        isSelected 
          ? "bg-[#2a3942]" 
          : "hover:bg-[#202c33]"
      }`}
      onClick={()=>onChatSelect(connection)}
    >
      {/* Avatar */}
      <img
        src={connection.profileImg}
        alt={connection.name}
        className="w-10 h-10 rounded-full"
      />
      {/* Chat info */}
      <div className="flex-1 pb-2">
        <div className="flex justify-between">
          <span className="font-medium">{connection.name}</span>
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
