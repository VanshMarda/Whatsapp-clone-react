import { useState } from "react";
import { FaEdit, FaLock, FaTimes } from "react-icons/fa";
import Modal from "../Modal";
const EncryptionNotice = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <p className=" flex gap-2 text-xs bg-[#202c33] text-green-500 px-3 py-2  rounded-lg">
        <FaLock /> Messages and calls are end-to-end encrypted. Only people in
        this chat can read, listen to, or share them.
      </p>
    </div>
  );
};

const MessageItem = ({
  onEditMessage,
  index,
  message,
  time,
  onDeleteMessage,
  isCompactMode,
}: {
  onEditMessage: (key: number, message: string) => void;
  index: number;
  message: string;
  time: string;
  onDeleteMessage: (key: number) => void;
  isCompactMode?: boolean;
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMessage, setEditMessage] = useState(message);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleEditMessageSubmit = () => {
    onEditMessage(index, editMessage);
    setShowEditModal(false);
  };
  const handleEditMessageCancel = () => {
    setShowEditModal(false);
    setEditMessage(message);
  };
  return (
    <div className="max-w-xs bg-[#154d37] w-full text-gray-200 px-3 py-2 flex rounded-lg items-end relative group">
      <button className="absolute top-1 right-1 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <FaTimes onClick={() => setShowDeleteModal(true)} />
      </button>
      <button className="absolute top-1 right-8 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <FaEdit onClick={() => setShowEditModal(true)} />
      </button>
      {message}
      {!isCompactMode && (
        <span className="text-xs text-gray-400 flex-1 flex justify-end">
          {time}
        </span>
      )} 
      {showEditModal && (
        <Modal
          title="Edit Message"
          value={editMessage}
          inputType="textarea"
          onChange={setEditMessage}
          onSubmit={()=>handleEditMessageSubmit()}
          onCancel={()=>handleEditMessageCancel()}
          submitButtonText="Save"
        />
      )}
      {showDeleteModal && (
        <Modal
          title="Are you sure?"
          value={""}
          inputType="none"
          onChange={()=>{}}
          onSubmit={()=>onDeleteMessage(index)}
          onCancel={()=>setShowDeleteModal(false)}
          submitButtonText="yes"
        />
      )}
    </div>
  );
};

const MessageList = ({
  onEditMessage,
  messages,
  onDeleteMessage,
  isCompactMode,
}: {
  onEditMessage: (key: number, message: string) => void;
  messages: { message: string; time: string }[];
  onDeleteMessage: (key: number) => void;
  isCompactMode?: boolean;
}) => {
  const backgroundImage =
    "https://i.pinimg.com/736x/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg";

  return (
    <div
      className="flex-1 px-6 py-4 bg-center overflow-y-auto"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col h-full justify-end items-end gap-5">
        <EncryptionNotice />
        {messages.length === 0 ? (
          <></>
        ) : (
          messages.map((message, index) => (
            <MessageItem
              index={index}
              key={index}
              message={message.message} 
              onEditMessage={onEditMessage}
              time={message.time}
              onDeleteMessage={onDeleteMessage}
              isCompactMode={isCompactMode}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;
