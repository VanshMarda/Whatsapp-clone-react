import whatsappWeb from "../assets/whatsappWeb.png";
import { Connection } from "../constant/connections";
import MessagesArea from "./right-panel/MessageArea";
import Composer from "./right-panel/Composer.tsx";
import { IoSearchSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { memo } from "react";

function NoChatSelected() {
  return (
    <div className="flex-1 bg-[#252d31] flex flex-col items-center justify-center text-center text-gray-300">
      <img src={whatsappWeb} alt="WhatsApp Web" className="b-8" />
      <h1 className="text-3xl text-gray-200 mb-4">WhatsApp Web</h1>
      <p className="text-sm max-w-md text-gray-400">
        Send and receive messages without keeping your phone online.
        <br />
        Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
      </p>
    </div>
  );
}

function ChatSelected({
  chatSelected,
  handleNewMessage,
  handleDeleteMessage,
}: {
  chatSelected: Connection;
  handleNewMessage: (message: string) => void;
  handleDeleteMessage: (key: number) => void;
}) {
  return (
    <div className="flex-1 flex flex-col bg-[#0b141a]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#202c33] border-l border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src={chatSelected.profileImg}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-white font-medium">{chatSelected.name}</h2>
          </div>
        </div>

        <div className="flex items-center gap-5 text-gray-400">
          <button className="hover:text-white cursor-pointer">
            <IoSearchSharp />
          </button>
          <button className="hover:text-white cursor-pointer">
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>
      <MessagesArea
        messages={chatSelected.messages}
        handleDeleteMessage={handleDeleteMessage}
      />
      <Composer handleNewMessage={handleNewMessage} />
    </div>
  );
}

const RightPanel = ({
  chatSelected,
  handleNewMessage,
  handleDeleteMessage,
}: {
  chatSelected: Connection;
  handleNewMessage: (message: string) => void;
  handleDeleteMessage: (key: number) => void;
}) => {
  return (
    <>
      {chatSelected === null ? (
        <NoChatSelected />
      ) : (
        <ChatSelected
          handleDeleteMessage={handleDeleteMessage}
          chatSelected={chatSelected}
          handleNewMessage={handleNewMessage}
        />
      )}
    </>
  );
};

export default memo(RightPanel);
