//assets
import whatsappWeb from "../assets/whatsappWeb.png";

//types
import { Connection } from "../constant/connections";

//components
import MessageList from "./right-panel/MessageList.tsx";
import Composer from "./right-panel/Composer.tsx";

//icons
import { IoSearchSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

//libs
import { memo, useRef, useEffect } from "react";

//one component per file
function NoChatSelected() {
  return (
    <div className="flex-1 h-full bg-[#252d31] flex flex-col items-center justify-center text-center text-gray-300 overflow-hidden">
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
  onEditMessage,
  chatSelected,
  onNewMessage,
  onDeleteMessage,
  isCompactMode,
}: {
  onEditMessage: (key: number, message: string) => void;
  chatSelected: Connection;
  onNewMessage: (message: string) => void;
  onDeleteMessage: (key: number) => void;
  isCompactMode: boolean;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatSelected.messages]);

  return (
    <div className="flex-1 h-full flex flex-col bg-[#0b141a] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#202c33] border-l border-gray-800 sticky z-10 top-0 shrink-0">
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
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <MessageList
          messages={chatSelected.messages}
          onDeleteMessage={onDeleteMessage}
          onEditMessage={onEditMessage}
          isCompactMode={isCompactMode}
        />

        <div ref={messagesEndRef} />
      </div>
      <div className="shrink-0">
        <Composer onNewMessage={onNewMessage} />
      </div>
    </div>
  );
}

const RightPanel = ({
  chatSelected,
  onNewMessage,
  onDeleteMessage,
  onEditMessage,
  isCompactMode,
}: {
  chatSelected: Connection | undefined;
  onNewMessage: (message: string) => void;
  onDeleteMessage: (key: number) => void;
  onEditMessage: (key: number, message: string) => void;
  isCompactMode: boolean;
}) => {
  return (
    <>
      {chatSelected === undefined ? (
        <NoChatSelected />
      ) : (
        <ChatSelected
          onEditMessage={onEditMessage}
          onDeleteMessage={onDeleteMessage}
          chatSelected={chatSelected}
          onNewMessage={onNewMessage}
          isCompactMode={isCompactMode}
        />
      )}
    </>
  );
};

export default memo(RightPanel);
