import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LanguageIcon from "@mui/icons-material/Language";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { useTranslation } from "react-i18next";
import i18n from "i18next";

function Navbar() { 
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("uz");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const [dateTime, setDateTime] = useState(new Date());

  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const languages = [
    { code: "uz", label: "O‘z" },
    { code: "ru", label: "Ру" },
    { code: "en", label: "En" },
  ];

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setLangOpen(false);
    i18n.changeLanguage(lang);
  };

  const navLinks = [
    {
      to: "/",
      label: t("Бош саҳифа"),
      icon: <HomeIcon />,
      match: (path) => path === "/",
    },
    {
      to: "/income-expense",
      label: t("Кирим-чиқим"),
      icon: <CalculateIcon />,
      match: (path) => path === "/income-expense",
    },
    {
      to: "/reports",
      label: t("Ҳисоботлар"),
      icon: <MenuIcon />,
      match: (path) => path === "/reports",
    },
    {
      label: t("Маълумотлар"),
      icon: <MenuIcon />,
      match: (path) => path.startsWith("/info"),
      dropdown: true, // signal this has nested routes
      children: [
        { to: "/info/clothings", label: t("Кийимлар") },
        { to: "/info/sizes", label: t("Ўлчамлар") },
        { to: "/info/clothing-groups", label: t("Кийим гуруҳлари") },
      ],
    },
  ];
  return (
    <nav className="bg-blue-500 border-b border-blue-200 px-4 py-2 ">
      <div className="flex items-center justify-between">
        {/* Left: Logo and Menu Toggle */}
        <div className="flex items-center gap-4">
          <img
            src="./logoNew.png"
            alt="logo"
            className="w-24 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white md:hidden cursor-pointer transition hover:text-blue-200"
          >
            <MenuOutlinedIcon />
          </button>
          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-4">
            {navLinks.map((link, index) => {
              const isMatch = link.match(location.pathname);

              if (link.dropdown) {
                return (
                  <div key={index} className="relative cursor-pointer">
                    <button
                      onClick={() => setInfoOpen((prev) => !prev)}
                      className={`flex items-center gap-1 px-2 py-1 text-xs rounded font-bold transition ${
                        isMatch ? "text-white" : "text-blue-100"
                      }`}
                    >
                      {React.cloneElement(link.icon, {
                        fontSize: "small",
                        className: isMatch ? "text-white" : "text-blue-100",
                      })}
                      <span>{link.label}</span>
                      {infoOpen ? (
                        <ExpandMoreIcon fontSize="small" />
                      ) : (
                        <ChevronRightIcon fontSize="small" />
                      )}
                    </button>

                    {infoOpen && (
                      <div className="absolute left-0 mt-1 bg-white rounded shadow-lg z-10 w-48">
                        {link.children.map((child) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            onClick={() => setInfoOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1 px-2 py-1 text-xs cursor-pointer rounded font-bold transition ${
                    isMatch ? "text-white" : "text-blue-100"
                  }`}
                >
                  {React.cloneElement(link.icon, {
                    fontSize: "small",
                    className: isMatch ? "text-white" : "text-blue-100",
                  })}
                  <span>{link.label}</span>
                  {isMatch ? (
                    <ExpandMoreIcon fontSize="small" />
                  ) : (
                    <ChevronRightIcon fontSize="small" />
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-white text-xs text-right leading-tight">
            <div>{dateTime.toLocaleDateString("uz-UZ")}</div>
            <div className="font-bold text-lg">
              {dateTime.toLocaleTimeString("uz-UZ")}
            </div>
          </div>

          <Badge color="error" badgeContent={3} className="cursor-pointer">
            <NotificationsIcon sx={{ color: "white" }} />
          </Badge>

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-2 py-1 font-bold cursor-pointer text-white rounded-md text-sm"
            >
              {/* <LanguageIcon fontSize="small" /> */}
              <span className="uppercase">{currentLang}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow z-50   border-none">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`block w-full text-left px-4 py-2 text-sm cursor-pointer transition hover:bg-blue-100 ${
                      currentLang === lang.code ? "font-bold text-blue-600" : ""
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative hidden md:block">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className=" px-4 py-2 rounded-md cursor-pointer min-w-[260px] text-sm"
            >
              <div className="text-white font-semibold">
                {t("Фарманов Омарбек Бахтиёрович")}
              </div>
              <div className="text-white text-xs">
                {t("Қумита масъул ходими")}
              </div>
              <AssignmentIndIcon
                className="absolute right-1 ml-4 top-2 text-white"
                fontSize="small"
              />
            </div>

            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow z-50 border-none cursor-pointer">
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-200 text-sm cursor-pointer"
                  onClick={() => {
                    setProfileOpen(false);
                    console.log("Logout clicked");
                  }}
                >
                  Чиқиш
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          } mt-2 flex flex-col gap-2`}
        >
          {navLinks.map((link) => {
            const isMatch = link.match(location.pathname);
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-semibold ${
                  isMatch ? "bg-blue-600 text-white" : "text-white"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {React.cloneElement(link.icon, { fontSize: "small" })}
                {link.label}
              </NavLink>
            );
          })}

          {/* Profile (mobile) */}
          <div className="mt-4 bg-blue-300 p-2 rounded text-sm">
            <div className="text-gray-800">
              {t("Фарманов Омарбек Бахтиёрович")}
            </div>
            <div className="text-gray-500 text-xs">
              {t("Қумита масъул ходими")}
            </div>
            <button
              className="text-left text-red-600 mt-2 hover:underline"
              onClick={() => {
                console.log("Logout clicked");
                setMobileMenuOpen(false);
              }}
            >
              Чиқиш
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
