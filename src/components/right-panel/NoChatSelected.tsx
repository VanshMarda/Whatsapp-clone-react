//assets
import whatsappWeb from "../../assets/whatsappWeb.png";

const NoChatSelected = () => {
  return (
    <div className="flex-1 h-full bg-[#252d31] flex flex-col items-center justify-center text-center text-gray-300 overflow-hidden">
      <img src={whatsappWeb} alt="WhatsApp Web" className="b-8" />
      <h1 className="text-3xl text-gray-200 mb-4">WhatsApp Web</h1>
      <p className="text-sm max-w-md text-gray-400">
        Send and receive messages without keeping your phone online.
        <br />
        Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
      </p>
    </div>
  );
};

export default NoChatSelected;
