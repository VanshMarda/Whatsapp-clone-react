import { FaPlus } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const Composer = () => {
    return (
      <div className="flex gap-3 p-3 bg-[#202c33]">
        <button className="text-gray-400 hover:text-white cursor-pointer">
          <FaPlus />
        </button>
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 rounded-lg bg-[#2a3942] text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
        />
        <button className="text-gray-400 hover:text-white cursor-pointer">
          <IoMdSend />
        </button>
      </div>
    );
  };
  
  export default Composer;
  