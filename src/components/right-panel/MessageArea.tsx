const EncryptionNotice = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <p className="text-xs bg-[#202c33] text-gray-400 px-3 py-2  rounded-lg">
        🔒 Messages and calls are end-to-end encrypted. Only people in this
        chat can read, listen to, or share them.
      </p>
    </div>
  );
};

const MessageArea = ({ messages }: { messages: string[] }) => {
  const backgroundImage =
    "https://preview.redd.it/3jfjc53fsyb61.jpg?width=1080&crop=smart&auto=webp&s=161a8f34a8749e4bf539c7a3b22d30983b46daef";

  return (
    <div
      className="flex-1 px-6 py-4 bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Encryption Notice */}
      {/* <div className="flex mb-4 justify-center ">
        
      </div> */}

      {/* Example Messages */}
      <div className="flex flex-col h-full justify-end items-end gap-5">
        <EncryptionNotice />
        {messages.length === 0 ?  <></> : 
        messages.map((message, index) => (
          <div
            key={index}
            className="max-w-xs bg-[#202c33] w-full text-gray-200 px-3 py-2 rounded-lg items-end"
          >
            {message}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MessageArea;
