import React from 'react';
import { RiCrosshair2Line, RiGroupLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { BsGlobeAmericas } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export interface SidebarProps {
  selected?: "list" | "foundList" | "";
}

const Sidebar: React.FC<SidebarProps> = ({ selected }) => {
  const nav = useNavigate();

  const handleClick = (route: string) => {
    nav(route, { replace: true });
  };

  const handleLogout = () => {
    nav("/", { replace: true });
  };

  console.log(selected)

  return (
    <div className="w-20 h-screen bg-white shadow-2xl justify-between flex flex-col items-center px-4 py-8">
      <div className="flex flex-col gap-4 items-center">
        <RiCrosshair2Line className="w-10 h-10 text-primary" />
        <div className="w-1/2 border-2 border-gray-100 my-4 rounded-full"></div> 
        <div 
          onClick={selected === "list" ? undefined : () => handleClick("/list")}
          className={`rounded-xl drop-shadow-lg border-gray-100 border-2 hover:scale-110 min-w-12 min-h-12 flex justify-center items-center transition-all hover:cursor-pointer ${selected === "list" ? "bg-primary" : "bg-white"}`}
        >
          <RiGroupLine className={`w-6 h-6 ${selected === "list" ? "fill-white" : "fill-primary"}`} />
        </div>
        <div 
          onClick={selected === "foundList" ? undefined : () => handleClick("/foundList")}
          className={`rounded-xl drop-shadow-lg border-gray-100 border-2 hover:scale-110 min-w-12 min-h-12 flex justify-center items-center transition-all hover:cursor-pointer ${selected === "foundList" ? "bg-primary" : "bg-white"}`}
        >
          <BsGlobeAmericas className={`w-6 h-6 ${selected === "foundList" ? "fill-white" : "fill-primary"}`} />
        </div>
      </div>
      <MdLogout onClick={handleLogout} className="w-8 h-8 fill-primary hover:opacity-40 hover:cursor-pointer" />
    </div>
  );
};

export default Sidebar;
