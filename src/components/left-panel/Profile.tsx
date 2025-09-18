import { FaMoon } from "react-icons/fa";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

const Profile = ({ onToggleCompactMode }: { onToggleCompactMode: () => void }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
    {/* Profile */}
    <img
      src="https://i.pravatar.cc/40?img=5"
      alt="Profile"
      className="w-10 h-10 rounded-full cursor-pointer"
    />

    {/* Icons */}
    <div className="md:flex hidden cursor-pointer items-center gap-5 text-xl text-gray-300">
      <button onClick={onToggleCompactMode} className="hover:text-white transition-colors">
        <FaMoon />
      </button>
      <MdOutlineTipsAndUpdates />
      <MdOutlineMessage/>  
      <BsThreeDotsVertical/>
    </div>
  </div>
  )
}

export default Profile