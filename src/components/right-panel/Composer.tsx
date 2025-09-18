import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const Composer = ({
  onNewMessage,
}: {
  onNewMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");
  return (
    <div className="flex bottom-0 gap-3 w-full p-3 bg-[#202c33]">
      <button className="text-gray-400 hover:text-white cursor-pointer">
        <FaPlus />
      </button>
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 p-2 rounded-lg bg-[#2a3942] text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onNewMessage(message);
            setMessage("");
          }
        }}
      />
      <button className="text-gray-400 hover:text-white cursor-pointer">
        <IoMdSend
          onClick={() => {
            onNewMessage(message);
            setMessage("");
          }}
        />
      </button>
    </div>
  );
};

export default Composer;
