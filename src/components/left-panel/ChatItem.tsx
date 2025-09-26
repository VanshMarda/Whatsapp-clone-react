//libs
import { useState, useContext } from "react";

//context
import { modeContext } from "../../context/mode";

//types
import { Connection } from "../../constant/connections";

//components
import Modal from "../Modal";

//icons
import { FaTimes } from "react-icons/fa";

const ChatItem = ({
  onDeleteConnection,
  connection,
  onChatSelect,
  isSelected,
}: {
  onDeleteConnection: (id: string) => void;
  connection: Connection;
  onChatSelect:(connection:Connection)=>void;
  isSelected?: boolean;
}) => {
  const isCompactMode = useContext(modeContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
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
      <div className="flex-1 w-full pb-2 relative group">
        <button className="absolute top-1 right-1 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <FaTimes onClick={()=>setShowDeleteModal(true)}/>
        </button> 
        <div className="flex flex-col justify-between">
          <span className="text-sm sm:text-base">{connection.name}</span>
          
          {!isCompactMode && (
            <span 
              className="text-xs text-gray-500 line-clamp-1 overflow-hidden"
              title={connection.messages[connection.messages.length - 1]?.message || ""} 
            >
              {connection.messages[connection.messages.length - 1]?.message}
            </span>
          )}
        </div>
      </div>
    </li>
    {showDeleteModal && (
    <Modal
      title="Are you sure?"
      value={""}
      inputType="none"
      onChange={()=>{}}
      onSubmit={()=>onDeleteConnection(connection.id)}
        onCancel={()=>setShowDeleteModal(false)}
        submitButtonText="yes"
      />
    )}
    </>
  );
};

export default ChatItem;
