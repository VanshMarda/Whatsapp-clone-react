export type Connection = {
  id: string;
  name: string;
  profileImg: string;
  messages: Message[];
};

export type Message = {
  id: string;
  message: string;
  time: string;
};

export type Action = {
  type: string;
  payload: any;
};