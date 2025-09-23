export type Connection = {
  id: string;
  name: string;
  profileImg: string;
  messages: {
    id: string;
    message: string;
    time: string;
  }[];
};
