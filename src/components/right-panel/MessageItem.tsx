//libs
import { useState } from "react";

//icons
import { FaEdit, FaTimes } from "react-icons/fa";

//components
import Modal from "../Modal";

//context
import { useModeContextProvider } from "../../context/ModeContextProvider";
import { Action } from "../../constant/connections";
import { ACTION_TYPES } from "../../constant/actionTypes";

const MessageItem = ({
  index,
  message,
  time,
  onAction,
}: {
  index: number;
  message: string;
  time: string;
  onAction: (action: Action) => void;
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMessage, setEditMessage] = useState(message);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isCompactMode } = useModeContextProvider();
  const handleEditMessageSubmit = () => {
    onAction({
      type: ACTION_TYPES.ON_EDIT_MESSAGE,
      payload: {
        key: index,
        message: editMessage,
      },
    });
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
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      )}
      {showEditModal && (
        <Modal
          title="Edit Message"
          value={editMessage}
          inputType="textarea"
          onChange={setEditMessage}
          onSubmit={() => handleEditMessageSubmit()}
          onCancel={() => handleEditMessageCancel()}
          submitButtonText="Save"
        />
      )}
      {showDeleteModal && (
        <Modal
          title="Are you sure?"
          value={""}
          inputType="none"
          onChange={() => {}}
          onSubmit={() =>
            onAction({
              type: ACTION_TYPES.ON_DELETE_MESSAGE,
              payload: {
                key: index,
              },
            })
          }
          onCancel={() => setShowDeleteModal(false)}
          submitButtonText="yes"
        />
      )}
    </div>
  );
};

export default MessageItem;
