//components
import MessageItem from "./MessageItem";
import EncryptionNotice from "./EncryptionNotice";
import { useMemo, memo } from "react";
import { Action } from "../../types/actions";

const MessageList = ({
  onAction,
  messages,
}: {
  onAction: (action:Action)=> void,
  messages: { message: string; time: string; id: string }[];
}) => {

  const backgroundImage = useMemo(() => { 
    return "https://i.pinimg.com/736x/58/c3/33/58c33377dfcbb3022493dec49d098b02.jpg";
  }, []);

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
              time={message.time}
              onAction={onAction}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default memo(MessageList);
