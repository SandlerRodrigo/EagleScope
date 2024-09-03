import React from "react";
import { RiCrosshair2Line, RiGroupLine } from "react-icons/ri";
import { MdLogout, MdMenu } from "react-icons/md";
import { BsGlobeAmericas } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { GrConfigure } from "react-icons/gr";

export interface SidebarProps {
  selected?: "list" | "foundList" | "configFolder" | "";
}

const Sidebar: React.FC<SidebarProps> = ({ selected }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const nav = useNavigate();

  const handleClick = (route: string) => {
    nav(route, { replace: true });
    setIsSidebarOpen(false); // Fecha o sidebar ao navegar
  };

  const handleLogout = () => {
    nav("/", { replace: true });
    setIsSidebarOpen(false); // Fecha o sidebar ao fazer logout
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="relative">
      {/* Botão de menu para dispositivos móveis */}
      <MdMenu
        onClick={toggleSidebar}
        className="w-8 h-8 fill-primary hover:opacity-80 cursor-pointer fixed top-4 left-4 z-50 md:hidden"
      />

      {/* Overlay para fechar o sidebar ao clicar fora */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-2xl justify-between flex flex-col items-center px-4 py-8 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 md:w-20`}
      >
        {/* Icones do Sidebar */}
        <div className="flex flex-col gap-4 items-center">
          <RiCrosshair2Line className="w-10 h-10 text-primary" />
          <div className="w-1/2 border-2 border-gray-100 my-4 rounded-full"></div>
          <div
            onClick={selected === "list" ? undefined : () => handleClick("/list")}
            className={`rounded-xl drop-shadow-lg border-gray-100 border-2 hover:scale-110 min-w-12 min-h-12 flex justify-center items-center transition-all hover:cursor-pointer ${
              selected === "list" ? "bg-primary" : "bg-white"
            }`}
          >
            <RiGroupLine
              className={`w-6 h-6 ${
                selected === "list" ? "fill-white" : "fill-primary"
              }`}
            />
          </div>
          <div
            onClick={
              selected === "foundList" ? undefined : () => handleClick("/foundList")
            }
            className={`rounded-xl drop-shadow-lg border-gray-100 border-2 hover:scale-110 min-w-12 min-h-12 flex justify-center items-center transition-all hover:cursor-pointer ${
              selected === "foundList" ? "bg-primary" : "bg-white"
            }`}
          >
            <BsGlobeAmericas
              className={`w-6 h-6 ${
                selected === "foundList" ? "fill-white" : "fill-primary"
              }`}
            />
          </div>
          <div
            onClick={
              selected === "configFolder" ? undefined : () => handleClick("/configFolder")
            }
            className={`rounded-xl drop-shadow-lg border-gray-100 border-2 hover:scale-110 min-w-12 min-h-12 flex justify-center items-center transition-all hover:cursor-pointer ${
              selected === "configFolder" ? "bg-primary" : "bg-white"
            }`}
          >
            <GrConfigure
              className={`w-6 h-6 ${
                selected === "configFolder" ? "fill-white" : "fill-primary"
              }`}
            />
          </div>
        </div>

        {/* Botão de Logout */}
        <MdLogout
          onClick={handleLogout}
          className="w-8 h-8 fill-primary hover:opacity-40 hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
