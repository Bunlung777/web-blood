import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Activity, BarChart3, Home, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);;

  // กำหนดรายการเมนูตาม Path ที่คุณระบุ
  const menuItems = [
    { 
      path: "/", 
      name: "หน้าหลัก", 
      icon: <Home size={20} /> 
    },
    { 
      path: "/App", 
      name: "ตัวชี้วัดตามราชการ", 
      icon: <Activity size={20} /> 
    },
    { 
      path: "/Graph", 
      name: "ตัวชี้วัดโรงพยาบาล", 
      icon: <BarChart3 size={20} /> 
    },
  ];

  // ฟังก์ชันสำหรับปิดเมนูมือถือเมื่อกดลิงก์
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-kanit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo / Brand Name */}
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5bafeb] to-[#0683dd] flex items-center justify-center text-white font-bold text-lg">
                R
              </div>
              <span className="font-bold text-xl text-slate-800 tracking-tight">
                RLU <span className="text-[#0683dd]">Loei</span>
              </span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-50 text-[#0683dd]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0683dd]"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0683dd]"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-blue-50 text-[#0683dd]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0683dd]"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;