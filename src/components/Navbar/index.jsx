import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    {
      to: "/",
      label: "Бош саҳифа",
      icon: "homePage.svg",
      match: (path) => path === "/",
    },
    {
      to: "/income-expense",
      label: "Кирим-чиқим",
      icon: "incomeExpense.svg",
      match: (path) => path === "/income-expense",
    },
    {
      to: "/reports",
      label: "Ҳисоботлар",
      icon: "reports.svg",
      match: (path) => path === "/reports",
    },
  ];

  return (
    <nav className="flex items-center justify-between bg-blue-500 border-b border-blue-200 px-4 py-2 gap-2">
      {/* here we need logo */}
      <img src={"./logoNew.png"} alt="logo" className="w-30" />
      <div className="flex items-center gap-2">
        {navLinks.map((link) => {
          const isActive = link.match(location.pathname);
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-blue-50"
                }`
              }
            >
              <img src={link.icon} alt="" />
              <span>{link.label}</span>
              {isActive ? (
                <ExpandMoreIcon fontSize="small" />
              ) : (
                <ChevronRightIcon fontSize="small" />
              )}
            </NavLink>
          );
        })}
      </div>
      {/* Right: User Info */}
      <div className="relative bg-gray-100 rounded-md px-4 py-2 min-w-[280px] flex flex-col justify-center ">
        <div className="text-gray-800 text-sm">
          Фарманов Омарбек Бахтиёрович
        </div>
        <div className="text-gray-500 text-xs">Қумита масъул ходими</div>
        <AssignmentIndIcon
          className="absolute right-2 top-2 text-gray-400"
          fontSize="small"
        />
      </div>
    </nav>
  );
}

export default Navbar;
