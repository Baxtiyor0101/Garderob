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
import { useTranslation } from "react-i18next";
import { rows } from "../utils/mockData";

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

const uzLocaleText = {
  // Sorting
  
  columnMenuSortAsc: "Аск бўйича сортлаш",
  columnMenuSortDesc: "Камайиш бўйича сортлаш",
  columnMenuUnsort: "Сортлашни бекор қилиш",
  // Filtering
  columnMenuFilter: "Фильтрлаш",
  // Hide/Show
  columnMenuHideColumn: "Ушбу устунни яшириш",
  columnMenuShowColumns: "Устунларни бошқариш",
  // Other
  columnsPanelTextFieldLabel: "Устунни топиш",
  columnsPanelTextFieldPlaceholder: "Устун сарлавҳаси",
  columnsPanelShowAllButton: "Барчасини кўрсатиш",
  columnsPanelHideAllButton: "Барчасини яшириш",
  // Pagination
  // footerPaginationRowsPerPage: "Саҳифадаги қаторлар:",
  // MuiTablePagination: {
  //   labelRowsPerPage: "Саҳифадаги қаторлар:",
  // },
  footerTotalRows: "Жами қаторлар:",
  footerPaginationRowsPerPage: "Саҳифадаги қаторлар:",
  labelRowsPerPage: "Саҳифадаги қаторлар:",

  // Selection
  footerRowSelected: (count) =>
    count === 1
      ? "1 қатор танланган"
      : `${count.toLocaleString()} қатор танланган`,
  // Toolbar
  toolbarColumns: "Устунлар",
  toolbarFilters: "Фильтрлар",
  toolbarDensity: "Зичлик",
  toolbarExport: "Экспорт",
  // Filter panel
  filterPanelAddFilter: "Фильтр қўшиш",
  filterPanelDeleteIconLabel: "Ўчириш",
  filterPanelOperators: "Операторлар",
  filterPanelOperatorAnd: "Ва",
  filterPanelOperatorOr: "Ёки",
  filterPanelColumns: "Устунлар",
  filterPanelInputLabel: "Қиймат",
  filterPanelInputPlaceholder: "Қиймат",
  // No rows overlay
  noRowsLabel: "Маълумотлар топилмади",
  // Add more as needed from MUI's DataGrid localeText API
};

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const {t}  = useTranslation()

  // Move rows definition inside Home
  

  // Move columns inside Home to access handleOpenModal
  const columns = useMemo(
    () => [
      { field: "id", headerName: "T/r", minWidth: 60, flex: 1 },
      { field: "fio", headerName: "Ф.И.Ш", minWidth: 180, flex: 2 },
      {
        field: "position",
        headerName: "Лавозими ва унвони",
        minWidth: 200,
        flex: 2,
      },
      {
        field: "structure",
        headerName: "Тузилма номи",
        minWidth: 160,
        flex: 1,
      },
      { field: "post", headerName: "Пост номи", minWidth: 120, flex: 1 },
      {
        field: "formal",
        headerName: "Формали кийим-бош",
        minWidth: 180,
        flex: 2,
        renderCell: (params) => (
          <span
            className={
              params.value !== "Муддати келган"
                ? "bg-green-50 text-green-500 px-4 py-1 rounded-md font-medium border border-red-100"
                : "bg-red-50 text-red-500 px-4 py-1 rounded-md font-medium border border-red-100"
            }
          >
            {params.value}
          </span>
        ),
      },
      {
        field: "inner",
        headerName: "Ички кийим",
        minWidth: 180,
        flex: 1,
        renderCell: (params) => (
          <span className="bg-red-50 text-red-500 px-4 rounded-md font-medium border border-red-100">
            {params.value}
          </span>
        ),
      },
      {
        field: "outer",
        headerName: "Оёқ кийим",
        minWidth: 180,
        flex: 1,
        renderCell: (params) => (
          <span className="bg-red-50 text-red-500 px-4 rounded-md font-medium border border-red-100">
            {params.value}
          </span>
        ),
      },
      { field: "date", headerName: "Берилган сана", minWidth: 120, flex: 1 },
      { field: "status", headerName: "Мақоми", minWidth: 120, flex: 1 },
      {
        field: "actions",
        headerName: "Ҳаракатлар",
        minWidth: 100,
        flex: 1,
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

  // filtering and searching logic
  const [searchText, setSearchText] = useState("");
const [filter, setFilter] = useState({  }); // your other filters

const handleSearch = () => {
  setFilter({ ...filter, name: searchText });
  // If you want to filter immediately, make sure your table uses filter.name
};

  return (
    <div className="p-4">
      {/* <h1 className="text-xl font-semibold mb-4">Бош саҳифа</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex justify-between flex-col bg-white rounded-xl px-4 py-3 border-l-4 ${stat.borderColor}`}
            style={{ boxShadow: "2px 0 16px 2px rgba(0,0,0,0.1)" }}
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
        {t("Ходимларни Ашёвий таъминотлар билан таъминлаш рўйхати")}
        {/* Ходимларни Ашёвий таъминотлар билан таъминлаш рўйхати */}
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
              label="sanadan"
              format="DD.MM.YYYY"
              slotProps={{
                textField: {
                  size: "small",
                  variant: "outlined",
                  fullWidth: false,
                },
              }}
              value={fromDate}
              onChange={setFromDate}
              sx={{ minWidth: 120 }}
            />
            <DatePicker
              label="__._._ гача"
              format="DD.MM.YYYY"
              slotProps={{
                textField: {
                  size: "small",
                  variant: "outlined",
                  fullWidth: false,
                },
              }}
              value={toDate}
              onChange={setToDate}
              sx={{ minWidth: 120 }}
            />
          </LocalizationProvider>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Қидирув..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ minWidth: 160 }}
            label="Қидирув"
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSearch}
            sx={{ minWidth: 40, minHeight: 40, px: 1, py: 1, ml: 1 }}
          >
            <SearchIcon />
          </Button>
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

      <div
        style={{ boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.1)" }}
        className="mt-8 bg-white rounded-xl p-4 h-[500px] border overflow-auto border-slate-200 flex flex-col w-full"
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8, 16, 32]}
          pagination
          disableSelectionOnClick
          localeText={uzLocaleText}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
          }
          sx={{
            width: "100%",
            "& .MuiDataGrid-cell": {
              display: "flex",
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: "1.4",
              alignItems: "center",
              justifyContent: " ",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: "1.4",
              textAlign: "center !important",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#9fbeefff",
              justifyContent: "center",
              alignItems: "center",
            },
            "& .MuiDataGrid-footerContainer": {
              position: "sticky",
              bottom: 0,
              background: "white",
              zIndex: 10,
            },
            "& .even-row": {
              backgroundColor: "#f0f8ff",
            },
            "& .odd-row": {
              backgroundColor: "#ffffff",
            },
          }}
          // Remove autoHeight to enable scrolling
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
