//types
import { Connection } from "../constant/connections.ts";

//components
import NoChatSelected from "./right-panel/NoChatSelected.tsx";
import ChatSelected from "./right-panel/ChatSelected.tsx";

//libs
import { memo } from "react";

const RightPanel = ({
  chatSelected,
  onNewMessage,
  onDeleteMessage,
  onEditMessage,
}: {
  chatSelected: Connection | undefined;
  onNewMessage: (message: string) => void;
  onDeleteMessage: (key: number) => void;
  onEditMessage: (key: number, message: string) => void;
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
        />
      )}
    </>
  );
};

export default memo(RightPanel);
