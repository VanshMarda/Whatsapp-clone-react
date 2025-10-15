//types
import { Connection } from "../constant/connections.ts";
import { Action } from "../types/actions.ts";

//components
import NoChatSelected from "./right-panel/NoChatSelected.tsx";
import ChatSelected from "./right-panel/ChatSelected.tsx";

//libs
import { memo } from "react";

const RightPanel = ({
  chatSelected,
  onAction,
}: {
  chatSelected: Connection | undefined;
  onAction: (action: Action) => void;
}) => {
  return (
    <>
      {chatSelected === undefined ? (
        <NoChatSelected />
      ) : (
        <ChatSelected onAction={onAction} chatSelected={chatSelected} />
      )}
    </>
  );
};

export default memo(RightPanel);
