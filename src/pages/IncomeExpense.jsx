import React from "react";
import LayersIcon from "@mui/icons-material/Layers";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
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
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

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

const columns = [
  { field: "id", headerName: "T/r", minWidth: 60, flex: 1 },
  { field: "name", headerName: "Ашёвий таъминот номи", minWidth: 200, flex: 2 },
  { field: "docNumber", headerName: "Юк хати рақами", minWidth: 120, flex: 1 },
  { field: "docDate", headerName: "Юк хати санаси", minWidth: 120, flex: 1 },
  { field: "status", headerName: "Ҳолати", minWidth: 100, flex: 1 },
  { field: "from", headerName: "Кимдан", minWidth: 140, flex: 1 },
  { field: "to", headerName: "Кимга", minWidth: 140, flex: 1 },
  { field: "amount", headerName: "Сони", minWidth: 80, flex: 1 },
  { field: "inUse", headerName: "Фойдаланишда", minWidth: 120, flex: 1 },
  { field: "reserve", headerName: "Захирада", minWidth: 120, flex: 1 },
  { field: "total", headerName: "Жами", minWidth: 80, flex: 1 },
];

const rows = [
  {
    id: 1,
    name: "Куртка қишки",
    docNumber: "3456",
    docDate: "10.06.2025",
    status: "Кирим",
    from: "Божхона қўмитаси",
    to: "Божхона қўмитаси",
    amount: 100,
    inUse: 18566,
    reserve: 166,
    total: 266,
  },
  {
    id: 2,
    name: "Фуражка (аёллар учун пилотка)",
    docNumber: "3456",
    docDate: "10.06.2025",
    status: "Кирим",
    from: "Божхона қўмитаси",
    to: "Божхона қўмитаси",
    amount: 100,
    inUse: 18566,
    reserve: 166,
    total: 266,
  },
  // ...add more rows as needed
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
  MuiTablePagination: {
    labelRowsPerPage: "Саҳифадаги қаторлар:",
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}–${to} / ${count !== -1 ? count : `бешдан кўп`}`,
    firstIconButtonText: "Биринчи саҳифа",
    previousIconButtonText: "Олдинги саҳифа",
    nextIconButtonText: "Кейинги саҳифа",
    lastIconButtonText: "Охирги саҳифа",
  },
  // Add more as needed from MUI's DataGrid localeText API
};

function IncomeExpense() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow p-4  flex flex-col justify-between border-l-2 border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Жами ашёвий таъминот</span>
            <LayersIcon className="text-slate-400" fontSize="large" />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-gray-800">
              180 <span className="text-base font-normal">минг дона</span>
            </div>
            <div className="text-blue-700 font-semibold text-sm">
              160,2 <span className="font-normal">млрд</span>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between gap-2 border-l-2 border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Фойдаланишда</span>
            <div className="relative">
              <CircularProgress
                variant="determinate"
                value={66}
                size={56}
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
            <div className="text-3xl font-bold text-gray-800">
              112 <span className="text-base font-normal">минг дона</span>
            </div>
            <div className="text-blue-700 font-semibold text-sm">
              160,2 <span className="font-normal">млрд</span>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between gap-2 border-l-2 border-green-200">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Захирада</span>
            <div className="relative">
              <CircularProgress
                variant="determinate"
                value={34}
                size={56}
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
            <div className="text-3xl font-bold text-gray-800">
              68 <span className="text-base font-normal">минг дона</span>
            </div>
            <div className="text-green-700 font-semibold text-sm">
              54,9 <span className="font-normal">млрд</span>
            </div>
          </div>
        </div>
        {/* Card 4 - Custom layout */}
        <div className="bg-white rounded-xl shadow p-4 flex   items-center justify-between gap-0 border-l-2 border-red-200">
          <div className="h-full flex flex-col justify-between">
            <span className="text-gray-400 text-sm">Ишдан бўшатилганлар</span>
            <div className="text-3xl font-bold text-gray-800">
              68 <span className="text-base font-normal">та</span>
            </div>
          </div>
          <div className="h-24 w-[3px] flex bg-gray-200 mx-4" />
          <div className="h-full flex flex-col justify-between">
            <span className="text-gray-400 text-sm">
              Ундирилган пул маблағлари
            </span>
            <div className="text-blue-700 font-bold text-xl">
              10,4 <span className="font-normal">млн сўм</span>
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
            <MenuItem value="Тошкент вилояти">Тошкент вилояти</MenuItem>
            <MenuItem value="Андижон вилояти">Андижон вилояти</MenuItem>
            {/* Add more Cyrillic options as needed */}
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
            <MenuItem value="Яллама ЧБП">Яллама ЧБП</MenuItem>
            <MenuItem value="Чирчиқ ЧБП">Чирчиқ ЧБП</MenuItem>
            {/* Add more Cyrillic options as needed */}
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
            <MenuItem value="Кирим">Кирим</MenuItem>
            <MenuItem value="Чиқим">Чиқим</MenuItem>
            {/* Add more Cyrillic options as needed */}
          </TextField>
        </div>
        {/* Right controls row */}
        <div className="flex flex-1 gap-2 items-center justify-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="__/__/__ дан"
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
              label="__/__/__ гача"
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

      {/* Table */}
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
          onRowClick={handleRowClick}
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
          autoHeight
        />
      </div>
      {/* Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Маълумот</DialogTitle>
        <DialogContent>{/* Empty for now */}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Ёпиш
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default IncomeExpense;
