import React, { useState } from "react";
import LayersIcon from "@mui/icons-material/Layers";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import ReceivablesModal from "./components/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ReceivablesDrawer from "./components/EditDrower";
// import { t } from "i18next";

function Receivables() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [editRow, setEditRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const types = [
    { value: "униформа", label: "Униформа" },
    { value: "нижнее белье", label: "Нижнее белье" },
    { value: "обувь", label: "Обувь" },
    { value: "головной убор", label: "Головной убор" },
  ];
  const units = [
    { value: "шт", label: "шт" },
    { value: "пара", label: "пара" },
    { value: "к-т", label: "к-т" },
  ];

  // console.log(toDate);
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    unit: "",
    sizes: "",
    status: true,
  });


  /////////////////
  const handleOpenEdit = (row) => {
    setForm(row);
    setEditRow(row);
    setEditMode(true);
    setDialogOpen(true);
  };
  const columns = [
    { field: "id", headerName: "T/r", minWidth: 20, flex: 1 },
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
    {
      field: "exit-date",
      headerName: t("Бўшатилгансанаси"),
      minWidth: 80,
      flex: 1,
    },
    {
      field: "payable-amount",
      headerName: t("Ундириладиган тўлов (сўм)"),
      minWidth: 120,
      flex: 1,
    },
    {
      field: "status",
      headerName: t("Холати"),
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <span
          style={{
            background: params.value ? "#C9E8E8" : "#FFEDCB",
            color: params.value ? "#105352" : "#D79723",
            fontWeight: 600,
            borderRadius: 8,
            padding: "4px 12px",
            display: "inline-block",
            minWidth: 80,
            textAlign: "center",
          }}
        >
          {params.value ? t("Ундирилди") : t("Ундирилмади")}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "",
      minWidth: 40,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click
              setSelectedRow(params.row);
              setModalOpen(true);
            }}
          >
            <VisibilityIcon />
            {/* here we  add edit icon */}
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleOpenEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      fio: t("Мирзаев Алишер Абдурауфович"),
      position: t("Бош мутахассис"),
      structure: t("Ахборот технологиялари бўлими"),
      "exit-date": "2024-12-15",
      "payable-amount": 1500000,
      status: true,
      action: "",
    },
    {
      id: 2,
      fio: t("Каримова Дилшода Рустамовна"),
      position: t("Бўлим бошлиғи"),
      structure: t("Молиявий назорат бўлими"),
      "exit-date": "2025-01-20",
      "payable-amount": 2000000,
      status: false,
      action: "",
    },
    {
      id: 3,
      fio: t("Исломов Азизбек Шукурович"),
      position: t("Юрисконсульт"),
      structure: t("Юридик бўлим"),
      "exit-date": "2025-03-05",
      "payable-amount": 1200000,
      status: true,
      action: "",
    },
    {
      id: 4,
      fio: t("Шодмонова Зилола Ўткировна"),
      position: t("Техник ходим"),
      structure: t("Хўжалик бўлими"),
      "exit-date": "2025-04-30",
      "payable-amount": 950000,
      status: false,
      action: "",
    },
    {
      id: 5,
      fio: t("Тоиpов Сардор Хуршидович"),
      position: t("Дастурчи"),
      structure: t("ИТ бўлими"),
      "exit-date": "2025-06-18",
      "payable-amount": 1800000,
      status: true,
      action: "",
    },
  ];

  const uzLocaleText = {
    // Sorting
    columnMenuSortAsc: t("Аск бўйича сортлаш"),
    columnMenuSortDesc: t("Камайиш бўйича сортлаш"),
    columnMenuUnsort: t("Сортлашни бекор қилиш"),
    // Filtering
    columnMenuFilter: t("Фильтрлаш"),
    // Hide/Show
    columnMenuHideColumn: t("Ушбу устунни яшириш"),
    columnMenuShowColumns: t("Устунларни бошқариш"),
    // Other
    columnsPanelTextFieldLabel: t("Устунни топиш"),
    columnsPanelTextFieldPlaceholder: t("Устун сарлавҳаси"),
    columnsPanelShowAllButton: t("Барчасини кўрсатиш"),
    columnsPanelHideAllButton: t("Барчасини яшириш"),
    // Pagination
    MuiTablePagination: {
      labelRowsPerPage: t("Саҳифадаги қаторлар:"),
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}–${to} / ${count !== -1 ? count : t(`бешдан кўп`)}`,
      firstIconButtonText: t("Биринчи саҳифа"),
      previousIconButtonText: t("Олдинги саҳифа"),
      nextIconButtonText: t("Кейинги саҳифа"),
      lastIconButtonText: t("Охирги саҳифа"),
    },
    // Add more as needed from MUI's DataGrid localeText API
  };
  ////////////////

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const handleSearch = () => {
    setFilter({ ...filter, name: searchText });
    // If you want to filter immediately, make sure your table uses filter.name
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1.5fr] gap-4">
        {/* Card 1 */}
        <div
          style={{
            boxShadow: "2px 0 16px 2px rgba(0,0,0,0.1)",
          }}
          className="bg-white rounded-xl shadow p-4  flex flex-col justify-between border-l-2 border-blue-200"
        >
          <div className="flex   justify-between">
            <span className="text-gray-400 text-xl">
              {t("Жами ашёвий таъминот")}
            </span>
            <LayersIcon className="text-slate-400" fontSize="large" />
          </div>
          <div className="flex items-center justify-between ">
            <div className="text-4xl font-bold text-gray-800">
              180{" "}
              <span className="text-base font-normal text-md">
                {t("минг дона")}
              </span>
            </div>
            <div className="text-blue-700 font-semibold text-2xl">
              160,2 <span className="font-normal text-sm">{t("млрд")}</span>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div
          style={{ boxShadow: "2px 0 16px 2px rgba(0,0,0,0.1)" }}
          className="bg-white rounded-xl shadow p-4 flex flex-col justify-between  border-l-2 border-blue-200"
        >
          <div className="flex   justify-between">
            <span className="text-gray-400 text-xl">{t("Фойдаланишда")}</span>
            <div className="relative">
              <CircularProgress
                variant="determinate"
                value={66}
                size={60}
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
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-gray-800">
              112{" "}
              <span className="text-base font-normal">{t("минг дона")}</span>
            </div>
            <div className="text-blue-700 font-semibold text-2xl">
              160,2 <span className="font-normal text-sm">{t("млрд")}</span>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div
          style={{ boxShadow: "2px 0 16px 2px rgba(0,0,0,0.1)" }}
          className="bg-white rounded-xl shadow p-4 flex flex-col justify-between  border-l-2 border-green-200"
        >
          <div className="flex   justify-between">
            <span className="text-gray-400 text-xl">{t("Захирада")}</span>
            <div className="relative">
              <CircularProgress
                variant="determinate"
                value={34}
                size={60}
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
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-gray-800">
              68 <span className="text-base font-normal">{t("минг дона")}</span>
            </div>
            <div className="text-green-700 font-semibold text-2xl">
              54,9 <span className="font-normal text-sm">{t("млрд")}</span>
            </div>
          </div>
        </div>
        {/* Card 4 - Custom layout */}
        <div
          style={{ boxShadow: "2px 0 16px 2px rgba(0,0,0,0.1)" }}
          className="bg-white rounded-xl shadow p-4 flex   items-center justify-between gap-0 border-l-2 border-red-200"
        >
          <div className="h-full flex flex-col justify-between">
            <span className="text-gray-400 text-xl">
              {t("Ишдан бўшатилганлар")}
            </span>
            <div className="text-4xl font-bold text-gray-800">
              68 <span className="text-base font-normal">{t("та")}</span>
            </div>
          </div>
          <div className="h-24 w-[3px] flex bg-gray-200 mx-4" />
          <div className="h-full flex flex-col justify-between">
            <span className="text-gray-400 text-xl">
              {t("Ундирилган пул маблағлари")}
            </span>
            <div className="text-blue-700 font-bold text-4xl">
              10,4 <span className="font-normal text-sm">{t("млн сўм")}</span>
            </div>
          </div>
          <div className="ml-4 flex h-full items-start justify-center">
            <span className="bg-blue-50 rounded-full p-2">
              <PersonOutlineIcon className="text-red-400" fontSize="medium" />
            </span>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mt-8 text-center">
        {t("Ашёвий таъминот учун ундириладиган пул маблағлари рўйхати")}
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {/* Left select fields row */}
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <TextField
            select
            label={t("Тузилма номи")}
            defaultValue={t("БК марказий аппарат")}
            size="small"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="БК марказий аппарат">
              {t("БК марказий аппарат")}
            </MenuItem>
            <MenuItem value={t("Тошкент вилояти")}>
              {t("Тошкент вилояти")}
            </MenuItem>
            <MenuItem value={t("Андижон вилояти")}>
              {t("Андижон вилояти")}
            </MenuItem>
            {/* Add more Cyrillic options as needed */}
          </TextField>
          <TextField
            select
            label="Пост"
            defaultValue=""
            size="small"
            variant="outlined"
            placeholder={t("Барчаси...")}
            fullWidth
          >
            <MenuItem value="">{t("Барчаси...")}</MenuItem>
            <MenuItem value={t("Яллама ЧБП")}>{t("Яллама ЧБП")}</MenuItem>
            <MenuItem value={t("Чирчиқ ЧБП")}>{t("Чирчиқ ЧБП")}</MenuItem>
            {/* Add more Cyrillic options as needed */}
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
            <MenuItem value="">{t("Барчаси...")}</MenuItem>
            <MenuItem value={t("Кирим")}>{t("Кирим")}</MenuItem>
            <MenuItem value={t("Чиқим")}>{t("Чиқим")}</MenuItem>
            {/* Add more Cyrillic options as needed */}
          </TextField>
        </div>
        {/* Right controls row */}
        <div className="flex flex-1 gap-4 items-center justify-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="дан"
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
              label="гача"
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
            placeholder={t("Қидирув...")}
            value={searchText}
            sx={{ minWidth: 160 }}
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
          {/* <IconButton size="small"><FilterListIcon /></IconButton> */}
          <IconButton size="small">
            <PrintIcon />
          </IconButton>
          <IconButton size="small">
            <CloseIcon />
          </IconButton>
          {/* here we need create button */}
          {/* <Button variant="contained" size="small">
            +киритиш
          </Button> */}
        </div>
      </div>

      {/* Table  */}
      <div
        className="mt-8 bg-white rounded-xl overflow-hidden p-4 border border-slate-200 h-[500px] flex flex-col w-full"
        style={{ width: "100%" }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8, 16, 32]}
          pagination
          disableSelectionOnClick
          //   onRowClick={handleRowClick}
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
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
            "& .even-row": {
              backgroundColor: "#f0f8ff",
            },
            "& .odd-row": {
              backgroundColor: "#ffffff",
            },
          }}
          autoHeight
        />
      </div>
      {/* Modal */}
      <ReceivablesModal
        open={modalOpen}
        onClose={handleCloseModal}
        row={selectedRow}
      />
            <ReceivablesDrawer
              addOpen={dialogOpen}
              setAddOpen={setDialogOpen}
              form={form}
              setForm={setForm}
              types={types}
              // units={units}
              // handleAdd={handleSave}
              // editMode={editMode}
            />
    </div>
  );
}

export default Receivables;
