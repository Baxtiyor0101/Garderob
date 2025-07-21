import React, { useMemo, useState } from "react";
import {
  PeopleAlt,
  Assessment,
  PersonAdd,
  SyncAlt,
  AccessTime,
  VerifiedUser,
} from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";

const stats = [
  {
    label: "Жами ходимлар",
    value: "4 240",
    icon: "/customs.svg",
    borderColor: "border-slate-200",
  },
  {
    label: "Муддати келган",
    value: "440",
    icon: "/deadline.svg",
    borderColor: "border-red-200",
  },
  {
    label: "Янги ходимлар",
    value: "120",
    icon: "/newCustoms.svg",
    borderColor: "border-sky-300",
  },
  {
    label: "Ротация",
    value: "320",
    icon: "/rotation.svg",
    borderColor: "border-blue-300",
  },
  {
    label: "Муддати яқин",
    value: "847",
    icon: "/nearDeadline.svg",
    borderColor: "border-yellow-300",
  },
  {
    label: "Берилганлар",
    value: "47",
    icon: "givens.svg",
    borderColor: "border-green-300",
  },
];

// Mock data for the table
const modalColumns = [
  { field: "id", headerName: "№", width: 50 },
  { field: "name", headerName: "Ашёвий таъминот номи", width: 260 },
  { field: "size", headerName: "Ўлчами", width: 70 },
  { field: "amount", headerName: "Миқдори", width: 70 },
  { field: "duration", headerName: "Муддати (йилда)", width: 110 },
  { field: "date", headerName: "Берилган сана", width: 110 },
  {
    field: "status",
    headerName: "Ҳолати",
    width: 110,
    renderCell: (params) => (
      <span
        className={
          params.value === "Муддати келган"
            ? "bg-red-100 text-red-500 px-2 py-1 rounded"
            : "bg-green-100 text-green-600 px-2 py-1 rounded"
        }
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "left",
    headerName: "Қолди",
    width: 80,
    renderCell: (params) => (
      <span
        className={
          params.value.includes("йил")
            ? "bg-green-100 text-green-600 px-2 py-1 rounded"
            : "bg-red-100 text-red-500 px-2 py-1 rounded"
        }
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "given",
    headerName: "Берилди",
    width: 70,
    renderCell: () => <Checkbox />,
  },
  {
    field: "comment",
    headerName: "Изоҳ",
    width: 120,
    renderCell: () => (
      <TextareaAutosize
        minRows={1}
        className="w-full border rounded p-1 text-xs"
        placeholder=""
      />
    ),
  },
];
const modalRows = [
  {
    id: 1,
    name: "Телпак қоракўлдан (кубанка аёллар учун), кокардаси билан",
    size: 57,
    amount: 1,
    duration: 8,
    date: "20.12.2024",
    status: "Берилган",
    left: "7 йил",
  },
  {
    id: 2,
    name: "Фуражка (аёллар учун пилотка), кокардаси билан",
    size: 56,
    amount: 1,
    duration: 2,
    date: "20.05.2025",
    status: "Муддати келган",
    left: "0 кун",
  },
  // ... more mock rows ...
];

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);

  // Move rows definition inside Home
  const rows = [
    {
      id: 1,
      fio: "Абдумаликов Дониёр Ильёсович",
      position: "Бўлим бошлиғи, божхона хизмати майори",
      structure: "БК марказий аппарат – 10",
      post: "-",
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 2,
      fio: "Маликов Ўктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 3,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 4,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 5,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 6,
      fio: "Абдумаликов Дониёр Ильёсович",
      position: "Бўлим бошлиғи, божхона хизмати майори",
      structure: "БК марказий аппарат – 10",
      post: "-",
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 7,
      fio: "Маликов Ўктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 8,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 9,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 10,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 11,
      fio: "Абдумаликов Дониёр Ильёсович",
      position: "Бўлим бошлиғи, божхона хизмати майори",
      structure: "БК марказий аппарат – 10",
      post: "-",
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 12,
      fio: "Маликов Ўктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 13,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 14,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 15,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 16,
      fio: "Абдумаликов Дониёр Ильёсович",
      position: "Бўлим бошлиғи, божхона хизмати майори",
      structure: "БК марказий аппарат – 10",
      post: "-",
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 17,
      fio: "Маликов Ўктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 18,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 19,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 20,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 21,
      fio: "Абдумаликов Дониёр Ильёсович",
      position: "Бўлим бошлиғи, божхона хизмати майори",
      structure: "БК марказий аппарат – 10",
      post: "-",
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 22,
      fio: "Маликов Ўктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 23,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 24,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 25,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 26,
      fio: "Абдумаликов Дониёр Ильёсович",
      position: "Бўлим бошлиғи, божхона хизмати майори",
      structure: "БК марказий аппарат – 10",
      post: "-",
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 27,
      fio: "Маликов Ўктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 28,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 29,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 30,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 31,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 31,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    {
      id: 33,
      fio: "Маликов Юктам Рустамович",
      position: "Инспектор (КККБ), божхона хизмати майори",
      structure: "Тошкент вилояти – 27",
      post: 'Яллама" ЧБП',
      formal: "Муддати келган",
      inner: "Муддати келган",
      outer: "Муддати келган",
      date: "12.02.2025 й.",
      status: "Муддати келган",
    },
    // ... add more mock rows as needed ...
  ];

  // Move columns inside Home to access handleOpenModal
  const columns = useMemo(
    () => [
      { field: "id", headerName: "T/r", width: 60 },
      { field: "fio", headerName: "Ф.И.Ш", width: 200 },
      { field: "position", headerName: "Лавозими ва унвони", width: 220 },
      { field: "structure", headerName: "Тузилма номи", width: 180 },
      { field: "post", headerName: "Пост номи", width: 120 },
      {
        field: "formal",
        headerName: "Формали кийим-бош",
        width: 140,
        renderCell: (params) => (
          <span className="text-red-500">{params.value}</span>
        ),
      },
      {
        field: "inner",
        headerName: "Ички кийим",
        width: 120,
        renderCell: (params) => (
          <span className="text-red-500">{params.value}</span>
        ),
      },
      {
        field: "outer",
        headerName: "Оёқ кийим",
        width: 120,
        renderCell: (params) => (
          <span className="text-red-500">{params.value}</span>
        ),
      },
      { field: "date", headerName: "Берилган сана", width: 120 },
      { field: "status", headerName: "Мақоми", width: 120 },
      {
        field: "actions",
        headerName: "",
        width: 60,
        sortable: false,
        renderCell: (params) => (
          <VisibilityIcon
            className="text-blue-500 cursor-pointer"
            onClick={() => handleOpenModal(params.row)}
          />
        ),
      },
    ],
    []
  );

  // Mock modal table data
  const modalRows = [
    {
      id: 1,
      name: "Телпак қоракўлдан (кубанка аёллар учун), кокардаси билан",
      size: 57,
      amount: 1,
      duration: 8,
      date: "20.12.2024",
      status: "Берилган",
      left: "7 йил",
    },
    {
      id: 2,
      name: "Фуражка (аёллар учун пилотка), кокардаси билан",
      size: 56,
      amount: 1,
      duration: 2,
      date: "20.05.2025",
      status: "Муддати келган",
      left: "0 кун",
    },
    // ... more mock rows ...
  ];

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
    setModalTab(0);
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-xl font-semibold mb-4">Бош саҳифа</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex justify-between flex-col bg-white rounded-xl px-4 py-3 border-l-4 ${stat.borderColor}`}
            style={{ boxShadow: "-8px 0 16px -8px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center gap-2 justify-between">
              <p className="text-[#A2A2A2] text-md">{stat.label}</p>
              <div>
                <img className="w-10" src={stat.icon} alt="" />
              </div>
            </div>
            <p className="text-3xl  font-bold">{stat.value} та</p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mt-8 text-center">
        Ходимларни Ашёвий таъминотлар билан таъминлаш рўйхати
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
          <IconButton size="small">
            <FilterListIcon />
          </IconButton>
          <IconButton size="small">
            <PrintIcon />
          </IconButton>
          <IconButton size="small">
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-xl h-[480px] overflow-hidden p-4 border border-slate-200 flex flex-col">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8, 16, 32]}
          pagination
          disableSelectionOnClick
          sx={{
            height: 400,
            "& .MuiDataGrid-footerContainer": {
              position: "sticky",
              bottom: 0,
              background: "white",
              zIndex: 10,
            },
          }}
        />
      </div>
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle className="flex items-center justify-between">
          <span className="text-blue-700 font-bold text-lg">
            БЕРИЛИШ МУДДАТИ КЕЛГАН ФОРМАЛИ КИЙИМ-БОШ РЎЙХАТИ
          </span>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Tabs value={modalTab} onChange={(_, v) => setModalTab(v)}>
            <Tab label="Формали кийим-бош" />
            <Tab label="Ички кийим" />
            <Tab label="Оёқ кийим" />
          </Tabs>
          <Box mt={2}>
            <DataGrid
              autoHeight
              rows={modalRows}
              columns={modalColumns}
              hideFooter
              disableSelectionOnClick
            />
          </Box>
        </DialogContent>
        <DialogActions className="justify-between">
          <Button variant="outlined" color="inherit">
            Бекор қилиш
          </Button>
          <Button variant="contained" color="success">
            Сақлаш ва жўнатиш
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
