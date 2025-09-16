export const CONNECTIONS: Connection[] = [
  {
    id: "user_id_1",
    name: "John Doe",
    profileImg:
      "https://i.pravatar.cc/40?img=1",
    messages : [
      {
        message: "Hello",
        time: "10:00"
      },
      {
        message: "How are you?",
        time: "10:01"
      }
    ]
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
    messages : [
      {
        message: "I my name is Bob Johnson",
        time: "10:00",
      },
      {
        message: "I am a software engineer",
        time: "10:01",
      }
    ]  },
  {
    id: "user_id_4",
    name: "Samantha Lee",
    profileImg:
      "https://i.pravatar.cc/40?img=4",
    messages : [
      {
        message: "I am a software engineer",
        time: "10:00 ",
      },
      {
        message: "I am a software engineer",
        time: "10:01 ",
      }
    ]
  },
  {
    id: "user_id_5",
    name: "William Chen",
    profileImg:
      "https://i.pravatar.cc/40?img=5",
    messages : [
      {
        message: "I am a frog",
        time: "10:00",
      },
      {
        message: "My name is William Chen",
        time: "10:01",
      }
    ]
  },
];


export type Connection = {
  id: string;
  name: string;
  profileImg: string;
  messages: {
    message: string;
    time: string;
  }[];
};
