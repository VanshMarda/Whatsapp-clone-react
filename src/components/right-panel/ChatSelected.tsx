//libs
import { useRef, useEffect, useCallback, memo } from "react";

//icons
import { IoSearchSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

//types
import { Action, Connection } from "../../constant/connections";

//components
import MessageList from "./MessageList";
import Composer from "./Composer";
import { flushSync } from "react-dom";
import { ACTION_TYPES } from "../../constant/actionTypes";

const ChatSelected = ({
  onAction,
  chatSelected,
}: {
  onAction: (action: Action) => void;
  chatSelected: Connection;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = useCallback (()=>{
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  },[])

  const handleNewMessage = useCallback((message : string)=>{
    flushSync(()=>{
      onAction({
        type:ACTION_TYPES.ON_NEW_MESSAGE,
        payload:{
          message:message
        }
      })
    });
    scrollToEnd();
  },[]);

  useEffect(() => {
    scrollToEnd();
  }, []);

  return (
    <div className="flex-1 h-full flex flex-col bg-[#000000] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-[#161717] border-l border-gray-800 sticky z-10 top-0 shrink-0">
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
          onAction={onAction}
        />
        <div ref={messagesEndRef} />
      </div>
      <div className="shrink-0">
        <Composer onNewMessage={handleNewMessage} />
      </div>
    </div>
  );
};

export default memo(ChatSelected);
