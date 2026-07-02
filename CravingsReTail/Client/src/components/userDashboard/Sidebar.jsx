import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { TiHeartFullOutline } from "react-icons/ti";
import { TbSettingsExclamation } from "react-icons/tb";

const MenuItems = [
  { name: "Overview", icon: <MdOutlineDashboard /> },
  { name: "Orders", icon: <IoFastFood /> },
  { name: "WishList", icon: <TiHeartFullOutline /> },
  { name: "Settings", icon: <TbSettingsExclamation /> },
];

const Sidebar = ({ active, setActive }) => {
  return (
    <>
      <div className="p-3">
        <div className="border-b-2 text-center text-xl">User Dashboard</div>

        <div className="space-y-1 p-4 mt-4">
          {MenuItems.map((item, idx) => (
            <button
              key={idx}
              className={`flex gap-3 font-semibold items-center border border-transparent hover:border-(--primary) w-full p-3 rounded-lg ${active === item.name && "bg-(--secondary) text-(--primary-text)"}`}
              onClick={() => setActive(item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
