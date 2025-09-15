export const CONNECTIONS = [
  {
    id: "user_id_1",
    name: "John Doe",
    profileImg:
      "https://i.pravatar.cc/40?img=1",
    messages : ["Hello", "How are you?"]
  },
  {
    id: "user_id_2",
    name: "Jane Smith",
    profileImg:
      "https://i.pravatar.cc/40?img=2",
    messages : []
  },
  {
    id: "user_id_3",
    name: "Bob Johnson",
    profileImg:
      "https://i.pravatar.cc/40?img=3",
    messages : ["I my name is Bob Johnson", "I am a software engineer"]
  },
  {
    id: "user_id_4",
    name: "Samantha Lee",
    profileImg:
      "https://i.pravatar.cc/40?img=4",
    messages : []
  },
  {
    id: "user_id_5",
    name: "William Chen",
    profileImg:
      "https://i.pravatar.cc/40?img=5",
    messages : ["I am a frog","My name is William Chen"]
  },
];


export type Connection = {
  id: string;
  name: string;
  profileImg: string;
  messages: string[];
};
