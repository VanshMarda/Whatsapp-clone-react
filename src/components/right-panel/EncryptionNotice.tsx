import { FaLock } from "react-icons/fa";

const EncryptionNotice = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <p className=" flex gap-2 text-xs bg-[#161717] text-green-500 px-3 py-2  rounded-lg">
        <FaLock /> Messages and calls are end-to-end encrypted. Only people in
        this chat can read, listen to, or share them.
      </p>
    </div>
  );
};

export default EncryptionNotice;
