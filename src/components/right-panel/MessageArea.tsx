import { FaLock, FaTimes } from "react-icons/fa";

const EncryptionNotice = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <p className=" flex gap-2 text-xs bg-[#202c33] text-green-500 px-3 py-2  rounded-lg">
        <FaLock />  Messages and calls are end-to-end encrypted. Only people in this
        chat can read, listen to, or share them.
      </p>
    </div>
  );
};

const Message = ({ index,message,handleDeleteMessage }: { index: number,message: string,handleDeleteMessage:(key:number)=>void }) => {
  return (
    <div
      className="max-w-xs bg-[#154d37] w-full text-gray-200 px-3 py-2 rounded-lg items-end relative group"
    >
      <button className="absolute top-1 right-1 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <FaTimes onClick={()=>handleDeleteMessage(index)} />
      </button>
      {message}
    </div>
  );
};

const MessageArea = ({ messages,handleDeleteMessage }: { messages: string[],handleDeleteMessage:(key:number)=>void }) => {
  const backgroundImage =
    "https://i.pinimg.com/736x/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg";

  return (
    <div
      className="flex-1 px-6 py-4 bg-center overflow-y-auto"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col h-full justify-end items-end gap-5">
        <EncryptionNotice />
        {messages.length === 0 ?  <></> : 
        messages.map((message, index) => (
          <Message index={index} key={index} message={message} handleDeleteMessage={handleDeleteMessage} />
          ))
        }
      </div>
    </div>
  );
};

export default MessageArea;
