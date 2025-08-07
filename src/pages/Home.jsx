import React, { useEffect, useMemo, useState } from "react";
 
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
import useLanguageStore from "../store/languageStore";
// import { t } from "i18next";

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const { language } = useLanguageStore();
  const { t } = useTranslation();

  useEffect(() => {
    try {
      let elements = document.querySelectorAll(
        ".MuiTablePagination-selectLabel.css-s09cke-MuiTablePagination-selectLabel"
      );
      let manageColumns = document.querySelectorAll(
        ".css-rizt0-MuiTypography-root"
      );
      manageColumns.forEach((el) => {
        el.innerHTML = t("Устунларни бошқариш");
      });
      elements.forEach((el) => {
        el.innerHTML = t("Саҳифадаги қаторлар:");
      });
    } catch (e) {
      // do nothing
    }
  }, [language]);

  //////////////////////////////
  const stats = [
    {
      label: t("Жами ходимлар"),
      value: "4 240",
      icon: "/customs.svg",
      borderColor: "border-slate-200",
    },
    {
      label: t("Муддати келган"),
      value: "440",
      icon: "/deadline.svg",
      borderColor: "border-red-200",
    },
    {
      label: t("Янги ходимлар"),
      value: "120",
      icon: "/newCustoms.svg",
      borderColor: "border-sky-300",
    },
    {
      label: t("Ротация"),
      value: "320",
      icon: "/rotation.svg",
      borderColor: "border-blue-300",
    },
    {
      label: t("Муддати яқин"),
      value: "847",
      icon: "/nearDeadline.svg",
      borderColor: "border-yellow-300",
    },
    {
      label: t("Берилганлар"),
      value: "47",
      icon: "givens.svg",
      borderColor: "border-green-300",
    },
  ];

  // Mock data for the table
  const modalColumns = [
    { field: "id", headerName: "№", width: 50 },
    { field: "name", headerName: t("Ашёвий таъминот номи"), width: 260 },
    { field: "size", headerName: t("Ўлчами"), width: 70 },
    { field: "amount", headerName: t("Миқдори"), width: 70 },
    { field: "duration", headerName: t("Муддати (йилда)"), width: 110 },
    { field: "date", headerName: t("Берилган сана"), width: 110 },
    {
      field: "status",
      headerName: t("Ҳолати"),
      width: 110,
      renderCell: (params) => (
        <span
          className={
            params.value === t("Муддати келган")
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
      headerName: t("Қолди"),
      width: 80,
      renderCell: (params) => (
        <span
          className={
            params.value.includes(t("йил"))
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
      headerName: t("Берилди"),
      width: 70,
      renderCell: () => <Checkbox />,
    },
    {
      field: "comment",
      headerName: t("Изоҳ"),
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

  const uzLocaleText = {
    // Sorting

    columnMenuSortAsc: t("Аск бўйича сортлаш"),
    columnMenuSortDesc: t("Деск бўйича сортлаш"),
    columnMenuUnsort: t("Сортлашни бекор қилиш"),
    // Filtering
    columnMenuFilter: t("Фильтрлаш"),
    // Hide/Show
    columnMenuHideColumn: t("Ушбу устунни яшириш"),
    columnMenuShowColumns: t("Устунларни кўрсатиш"),
    // Other
    columnsPanelTextFieldLabel: t("Устунни топиш"),
    columnsPanelTextFieldPlaceholder: t("Устун сарлавҳаси"),
    columnsPanelShowAllButton: t("Барчасини кўрсатиш"),
    columnsPanelHideAllButton: t("Барчасини яшириш"),
    footerTotalRows: t("Жами қаторлар:"),
    footerPaginationRowsPerPage: t("Саҳифадаги қаторлар:"),
    labelRowsPerPage: t("Саҳифадаги қаторлар:"),

    // Selection
    footerRowSelected: (count) =>
      count === 1
        ? t("1 қатор танланган")
        : `${count.toLocaleString()} ${t("қатор танланган")}`,
    // Toolbar
    toolbarColumns: t("Устунлар"),
    toolbarFilters: t("Фильтрлар"),
    toolbarDensity: t("Зичлик"),
    toolbarExport: t("Экспорт"),
    // Filter panel
    filterPanelAddFilter: t("Фильтр қўшиш"),
    filterPanelDeleteIconLabel: t("Ўчириш"),
    filterPanelOperators: t("Операторлар"),
    filterPanelOperatorAnd: t("Ва"),
    filterPanelOperatorOr: t("Ёки"),
    filterPanelColumns: t("Устунлар"),
    filterPanelInputLabel: t("Қиймат"),
    filterPanelInputPlaceholder: t("Қиймат"),
    // No rows overlay
    noRowsLabel: t("Маълумотлар топилмади"),
    // Add more as needed from MUI's DataGrid localeText API
  };
  ////////////////

  // Move rows definition inside Home

  // Move columns inside Home to access handleOpenModal
  const columns = [
    { field: "id", headerName: "T/r", minWidth: 60, flex: 1 },
    { field: "fio", headerName: t("Ф.И.Ш"), minWidth: 180, flex: 2 },
    {
      field: "position",
      headerName: t("Лавозими ва унвони"),
      minWidth: 200,
      flex: 2,
    },
    {
      field: "structure",
      headerName: t("Тузилма номи"),
      minWidth: 160,
      flex: 1,
    },
    { field: "post", headerName: t("Пост номи"), minWidth: 120, flex: 1 },
    {
      field: "formal",
      headerName: t("Формали кийим-бош"),
      minWidth: 180,
      flex: 2,
      renderCell: (params) => (
        <span
          className={
            params.value !== t("Муддати келган")
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
      headerName: t("Ички кийим"),
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
      headerName: t("Оёқ кийим"),
      minWidth: 180,
      flex: 1,
      renderCell: (params) => (
        <span className="bg-red-50 text-red-500 px-4 rounded-md font-medium border border-red-100">
          {params.value}
        </span>
      ),
    },
    { field: "date", headerName: t("Берилган сана"), minWidth: 120, flex: 1 },
    { field: "status", headerName: t("Мақоми"), minWidth: 120, flex: 1 },
    {
      field: "actions",
      headerName: t("Ҳаракатлар"),
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
  ];

  // Mock modal table data
  const modalRows = [
    {
      id: 1,
      name: t("Телпак қоракўлдан (кубанка аёллар учун), кокардаси билан"),
      size: 57,
      amount: 1,
      duration: 8,
      date: "20.12.2024",
      status: t("Берилган"),
      left: t("7 йил"),
    },
    {
      id: 2,
      name: t("Фуражка (аёллар учун пилотка), кокардаси билан"),
      size: 56,
      amount: 1,
      duration: 2,
      date: "20.05.2025",
      status: t("Муддати келган"),
      left: t("0 кун"),
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
  const [filter, setFilter] = useState({}); // your other filters

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
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {/* Left select fields row */}
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <TextField
            select
            label={t("Тузилма номи")}
            defaultValue=""
            size="small"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">{t("БК марказий аппарат")}</MenuItem>
          </TextField>
          <TextField
            select
            label={t("Пост")}
            defaultValue=""
            size="small"
            variant="outlined"
            placeholder={t("Барчаси...")}
            fullWidth
          >
            <MenuItem value="">Барчаси...</MenuItem>
          </TextField>
          <TextField
            select
            label={t("Мақоми")}
            defaultValue=""
            size="small"
            variant="outlined"
            placeholder={t("Барчаси...")}
            fullWidth
          >
            <MenuItem value="">Барчаси...</MenuItem>
          </TextField>
        </div>
        {/* Right controls row */}
        <div className="flex flex-1 gap-2 items-center justify-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t("дан")}
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
              label={t("гача")}
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
            placeholder={t("Қидирув")}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ minWidth: 160 }}
            label={t("Қидирув")}
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
            {t("БЕРИЛИШ МУДДАТИ КЕЛГАН ФОРМАЛИ КИЙИМ-БОШ РЎЙХАТИ")}
          </span>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Tabs value={modalTab} onChange={(_, v) => setModalTab(v)}>
            <Tab label={"Формали кийим-бош"} />
            <Tab label={t("Ички кийим")} />
            <Tab label={t("Оёқ кийим")} />
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
            {t("Бекор қилиш")}
          </Button>
          <Button variant="contained" color="success">
            {t("Сақлаш ва жўнатиш")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
