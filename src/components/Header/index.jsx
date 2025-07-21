import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";

const Header = () => (
  <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-2">
    {/* Left: Logo and Titles */}
    <div className="flex items-center gap-3">
      <img src="/logo.png" alt="Logo" className="w-10 h-10" />
      <div>
        <div className="font-bold text-green-800 text-sm leading-tight">БОЖХОНА ҚЎМИТАСИ</div>
        <div className="font-bold text-green-800 text-sm leading-tight">БОЖХОНА ХОДИМИ АХБОРОТ ТИЗИМИ</div>
      </div>
    </div>

    {/* Center: Menu */}
    <div className="flex items-center gap-6 flex-1 justify-center text-gray-700 text-sm">
      <span>Ходимлар</span>
      <span>Буйруқ</span>
      <span>Тасдиқлаш</span>
      <span>Ҳисобот</span>
      <span>Ҳужжатлар</span>
      <span>Давомат</span>
      <span>Хизмат уйлари</span>
      <Button
        variant="outlined"
        color="success"
        size="small"
        className="ml-2 font-bold"
        sx={{ borderRadius: "3px", textTransform: "none", fontWeight: "bold",padding: "0px 15px" }}
      >
        Гардероб
      </Button>
      <Badge badgeContent={4} color="error" className="ml-2">
        <NotificationsIcon color="action" />
      </Badge>
    </div>

    {/* Right: User Info */}
    <div className="relative bg-gray-100 rounded-md px-4 py-2 min-w-[280px] flex flex-col justify-center ">
      <div className="text-gray-800 text-sm">Фарманов Омарбек Бахтиёрович</div>
      <div className="text-gray-500 text-xs">Қумита масъул ходими</div>
      <AssignmentIndIcon className="absolute right-2 top-2 text-gray-400" fontSize="small" />
    </div>
  </header>
);

export default Header;