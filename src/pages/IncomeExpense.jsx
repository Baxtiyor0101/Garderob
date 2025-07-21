import React from "react";
import LayersIcon from '@mui/icons-material/Layers';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Button, CircularProgress, MenuItem, TextField } from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  PeopleAlt,
  Assessment,
  PersonAdd,
  SyncAlt,
  AccessTime,
  VerifiedUser,
} from "@mui/icons-material";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';

 

const stats = [
  {
    label: "Жами ашёвий таъминот",
    value: "180 минг дона",
    subValue: "160,2 млрд",
    icon: <LayersIcon className="text-slate-400" fontSize="medium" />,
    subLabel: "млрд",
    border: "",
    percent: null,
    color: "text-gray-700",
  },
  {
    label: "Фойдаланишда",
    value: "112 минг дона",
    subValue: "160,2 млрд",
    icon: null,
    subLabel: "млрд",
    border: "border-l-2 border-blue-200",
    percent: 66,
    color: "text-blue-600",
  },
  {
    label: "Захирада",
    value: "68 минг дона",
    subValue: "54,9 млрд",
    icon: null,
    subLabel: "млрд",
    border: "border-l-2 border-green-200",
    percent: 34,
    color: "text-green-600",
  },
  {
    label: "Ишдан бўшатилганлар",
    value: "68 та",
    subValue: "10,4 млн сўм",
    icon: <PersonOutlineIcon className="text-red-400" fontSize="medium" />,
    subLabel: "млн сўм",
    border: "border-l-2 border-red-200",
    percent: null,
    color: "text-red-600",
  },
];

function IncomeExpense() {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Жами ашёвий таъминот</span>
            <LayersIcon className="text-slate-400" fontSize="medium" />
          </div>
          <div className="text-3xl font-bold text-gray-800">
            180 <span className="text-base font-normal">минг дона</span>
          </div>
          <div className="text-blue-700 font-semibold text-sm">
            160,2 <span className="font-normal">млрд</span>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border-l-2 border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Фойдаланишда</span>
            <div className="relative">
              <CircularProgress
                variant="determinate"
                value={66}
                size={36}
                thickness={5}
                style={{
                  color: "#1976d2",
                  background: "#e3f0fd",
                  borderRadius: "50%",
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-blue-700">
                66%
              </span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800">
            112 <span className="text-base font-normal">минг дона</span>
          </div>
          <div className="text-blue-700 font-semibold text-sm">
            160,2 <span className="font-normal">млрд</span>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border-l-2 border-green-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Захирада</span>
            <div className="relative">
              <CircularProgress
                variant="determinate"
                value={34}
                size={36}
                thickness={5}
                style={{
                  color: "#2e7d32",
                  background: "#e6f4ea",
                  borderRadius: "50%",
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-green-700">
                34%
              </span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800">
            68 <span className="text-base font-normal">минг дона</span>
          </div>
          <div className="text-green-700 font-semibold text-sm">
            54,9 <span className="font-normal">млрд</span>
          </div>
        </div>
        {/* Card 4 - Custom layout */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-row items-center gap-0 border-l-2 border-red-200">
          <div className="flex-1">
            <span className="text-gray-400 text-sm">Ишдан бўшатилганлар</span>
            <div className="text-3xl font-bold text-gray-800">
              68 <span className="text-base font-normal">та</span>
            </div>
          </div>
          <div className="h-12 w-px bg-gray-200 mx-4" />
          <div className="flex flex-col items-end flex-1">
            <span className="text-gray-400 text-sm">
              Ундирилган пул маблағлари
            </span>
            <div className="text-blue-700 font-bold text-xl">
              10,4 <span className="font-normal">млн сўм</span>
            </div>
          </div>
          <div className="ml-4 flex items-center justify-center">
            <span className="bg-blue-50 rounded-full p-2">
              <PersonOutlineIcon className="text-red-400" fontSize="medium" />
            </span>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mt-8 text-center">
        Жами ашёвий таъминотлар рўйхати
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {/* Left select fields row */}
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <TextField
            select
            label="Тузилма номи"
            defaultValue="БК марказий аппарат"
            size="small"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="БК марказий аппарат">БК марказий аппарат</MenuItem>
          </TextField>
          <TextField
            select
            label="Пост"
            defaultValue=""
            size="small"
            variant="outlined"
            placeholder="Барчаси..."
            fullWidth
          >
            <MenuItem value="">Барчаси...</MenuItem>
          </TextField>
          <TextField
            select
            label="Мақоми"
            defaultValue=""
            size="small"
            variant="outlined"
            placeholder="Барчаси..."
            fullWidth
          >
            <MenuItem value="">Барчаси...</MenuItem>
          </TextField>
        </div>
        {/* Right controls row */}
        <div className="flex flex-1 gap-2 items-center justify-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD.MM.YYYY"
              slotProps={{
                textField: {
                  size: "small",
                  variant: "outlined",
                  fullWidth: false,
                  placeholder: "__/__/__ дан",
                },
              }}
              value={null}
              onChange={() => {}}
              sx={{ minWidth: 120 }}
            />
            <DatePicker
              format="DD.MM.YYYY"
              slotProps={{
                textField: {
                  size: "small",
                  variant: "outlined",
                  fullWidth: false,
                  placeholder: "__/__/__ гача",
                },
              }}
              value={null}
              onChange={() => {}}
              sx={{ minWidth: 120 }}
            />
          </LocalizationProvider>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Қидирув..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 160 }}
          />
          {/* <IconButton size="small"><FilterListIcon /></IconButton> */}
          <IconButton size="small">
            <PrintIcon />
          </IconButton>
          <IconButton size="small">
            <CloseIcon />
          </IconButton>
          {/* here we need create button */}
          <Button variant="contained" size="small">
            +киритиш
          </Button>
        </div>
      </div>
    </div>
  );
}

export default IncomeExpense; 