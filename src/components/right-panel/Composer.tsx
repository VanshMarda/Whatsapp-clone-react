//libs
import { useState } from "react";

//icons
import { FaPlus } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const Composer = ({
  onNewMessage,
}: {
  onNewMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");
  return (
    <div className="flex sticky z-10 bottom-0 gap-3 w-full p-3 bg-[#161717]">
      <button className="text-gray-400 hover:text-white cursor-pointer">
        <FaPlus />
      </button>
      <textarea
        placeholder="Type a message"
        className="flex-1 p-2 rounded-lg bg-[#2a3942] text-sm text-gray-200 placeholder-gray-500 focus:outline-none resize-none"
        rows={1}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (message.trim() !== "") {
              onNewMessage(message);
              setMessage("");
            }
          }
          // If Shift+Enter, allow default (new line)
        }}
      />
      <button className="text-gray-400 hover:text-white cursor-pointer">
        <IoMdSend
          onClick={() => {
            if (message.trim() !== "") {
              onNewMessage(message);
              setMessage("");
            }
          }}
        />
      </button>
    </div>
  );
};

export default Composer;
