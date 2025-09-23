//libs
import { useState } from "react";

//icons
import { FaEdit, FaLock, FaTimes } from "react-icons/fa";

//components
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
    <div className="max-w-xs bg-[#154d37] w-full text-gray-200 px-3  flex flex-col rounded-lg relative group">
      <div className="break-words  whitespace-pre-wrap">
        <div className="w-full pr-5 pt-2">
        {message}
        <div className="flex absolute top-1 right-1 justify-end w-full">
          <button className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <FaEdit onClick={() => setShowEditModal(true)} />
          </button>
          <button className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <FaTimes onClick={() => setShowDeleteModal(true)} />
          </button>
        </div>
      </div>
      </div>
      {!isCompactMode && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-400">
            {time}
          </span>
        </div>
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
  messages: { message: string; time: string;id:string }[];
  onDeleteMessage: (key: number) => void;
  isCompactMode?: boolean;
}) => {
  const backgroundImage =
    "https://i.pinimg.com/736x/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg";

  return (
    <div
      className="min-h-full px-6 py-4 bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col justify-end items-end gap-5 min-h-full">
        <EncryptionNotice />
        {messages.length === 0 ? (
          <></>
        ) : (
          messages.map((message, index) => (
            <MessageItem
              index={index}
              key={message.id}
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
