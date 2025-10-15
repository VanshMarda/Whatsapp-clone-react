import { ACTION_TYPES } from "../constant/actionTypes";

type OnDeleteChatAction = {
  type: typeof ACTION_TYPES.ON_DELETE_CHAT;
  payload: {
    id: string;
  };
};

type OnEditMessageAction = {
  type: typeof ACTION_TYPES.ON_EDIT_MESSAGE;
  payload: {
    key: number;
    message: string;
  };
};

type OnSelectChatAction = {
  type: typeof ACTION_TYPES.ON_SELECT_CHAT;
  payload: {
    id: string;
  };
};

type OnNewChatAction = {
  type: typeof ACTION_TYPES.ON_NEW_CHAT;
  payload: {
    name: string;
    message: string;
  };
};
type OnNewMessageAction = {
  type: typeof ACTION_TYPES.ON_NEW_MESSAGE;
  payload: {
    message: string;
  };
};
type OnDeleteMessageAction = {
  type: typeof ACTION_TYPES.ON_DELETE_MESSAGE;
  payload: {
    key: number;
  };
};

export type Action =
  | OnDeleteChatAction
  | OnEditMessageAction
  | OnSelectChatAction
  | OnNewChatAction
  | OnNewMessageAction
  | OnDeleteMessageAction;
