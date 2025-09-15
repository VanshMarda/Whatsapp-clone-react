import { Connection } from "../../constant/connections";

const ChatList = ({
  connection,
  idx,
  handleChatSelect,
  isSelected,
}: {
  connection: Connection;
  idx: number;
  handleChatSelect:(connection:Connection)=>void;
  isSelected?: boolean;
}) => {
  return (
    <li
      key={idx}
      className={`flex items-center gap-3 px-4 py-3 border-b border-gray-700 hover:bg-[#202c33] cursor-pointer ${
        isSelected 
          ? "bg-[#2a3942]" 
          : "hover:bg-[#202c33]"
      }`}
      onClick={()=>handleChatSelect(connection)}
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

export default ChatList;
