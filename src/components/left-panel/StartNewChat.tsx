//libs
import { useState } from "react";

//components
import Modal from "../Modal";

//types
import { Action } from "../../types/actions";
import { ACTION_TYPES } from "../../constant/actionTypes";

type StartNewChatProps = {
  onAction: (action: Action) => void;
};

const StartNewChat = ({ onAction }: StartNewChatProps) => {
  const [showNameModal, setShowNameModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleNameSubmit = () => {
    if (name.trim()) {
      setSelectedName(name.trim());
      setShowNameModal(false);
      setShowMessageModal(true);
      setName("");
    }
  };

  const handleMessageSubmit = () => {
    onAction({
      type:ACTION_TYPES.ON_NEW_CHAT,
      payload: {
        name:selectedName,
        message:message
      }
    });
    setShowMessageModal(false);
    setSelectedName("");
    setMessage("");
  };

  const handleCancel = () => {
    setShowNameModal(false);
    setShowMessageModal(false);
    setSelectedName("");
    setName("");
    setMessage("");
  };

  return (
    <>
      <div className="w-full p-4 flex justify-center items-center">
        <button 
          className="bg-[#2a3942] text-white p-4 rounded-lg hover:cursor-pointer hover:bg-[#3a4952] transition-colors" 
          onClick={() => setShowNameModal(true)}
        >
          Start a New Chat
        </button>
      </div>
      {showNameModal && (
        <Modal
          title="Start a New Chat"
          label="Enter name:"
          placeholder="Type a name..."
          inputType="text"
          value={name}
          onChange={setName}
          onSubmit={handleNameSubmit}
          onCancel={handleCancel}
          submitButtonText="Start a New Chat"
          submitButtonDisabled={!name.trim()}
        />
      )}
      {showMessageModal && (
        <Modal
          title={`Send Message to ${selectedName}`}
          label="Enter message:"
          placeholder="Type your message..."
          inputType="textarea"
          value={message}
          onChange={setMessage}
          onSubmit={handleMessageSubmit}
          onCancel={handleCancel}
          submitButtonText="Save"
        />
      )}
    </>
  );
};

export default StartNewChat;