import { Connection } from "../constant/connections";

export const getNewMessage = (message: string) => ({
  id: `message_id_${Date.now()}`,
  message,
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
});

export const getNewConnection = (name: string, initialMessage: string = ""): Connection => ({
  id: `user_id_${Date.now()}`,
  name,
  profileImg: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 50) + 1}`,
  messages: initialMessage ? [getNewMessage(initialMessage)] : [],
});
