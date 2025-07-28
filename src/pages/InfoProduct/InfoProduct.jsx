// InfoProductPage.js
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  TablePaginationActions,
} from "@mui/material";
import { DataGrid, GridPagination } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ProductDialog from "./components/AddEditModal";
import Stratistics from "./components/Stratistics";
import { useTranslation } from "react-i18next";
import ProductStats from "./components/Stratistics";
// import ProductDialog from "./components/CreateModaltProductDialog";
// ProductDialog;
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

const initialRows = [
  {
    id: 1,
    nameUz: "Куртка қишки",
    nameRu: "Зимняя куртка",
    type: "униформа",
    price: 120000,
    unit: "шт",
    sizes: "S, M, L, XL",
    status: true,
  },
  {
    id: 2,
    nameUz: "Туфли",
    nameRu: "Туфли",
    type: "обувь",
    price: 90000,
    unit: "пара",
    sizes: "39, 40, 41, 42",
    status: false,
  },
];

function InfoProduct() {
  const [rows, setRows] = useState(initialRows);
  const [filter, setFilter] = useState({
    name: "",
    type: "",
    unit: "",
    priceFrom: "",
    priceTo: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation(); // Assuming you have a translation function
  const [form, setForm] = useState({
    nameUz: "",
    nameRu: "",
    type: "",
    price: "",
    unit: "",
    sizes: "",
    status: true,
  });
  const [editRow, setEditRow] = useState(null);

  const filteredRows = rows.filter((row) => {
    const priceOk =
      (!filter.priceFrom || row.price >= +filter.priceFrom) &&
      (!filter.priceTo || row.price <= +filter.priceTo);
    return (
      row.nameUz.toLowerCase().includes(filter.name.toLowerCase()) &&
      (filter.type ? row.type === filter.type : true) &&
      (filter.unit ? row.unit === filter.unit : true) &&
      priceOk
    );
  });

  const handleOpenAdd = () => {
    setForm({
      nameUz: "",
      nameRu: "",
      type: "",
      price: "",
      unit: "",
      sizes: "",
      status: true,
    });
    setEditMode(false);
    setDialogOpen(true);
  };

  const handleOpenEdit = (row) => {
    setForm(row);
    setEditRow(row);
    setEditMode(true);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editMode) {
      setRows(
        rows.map((r) => (r.id === editRow.id ? { ...form, id: editRow.id } : r))
      );
    } else {
      setRows([...rows, { ...form, id: rows.length + 1, status: true }]);
    }
    setDialogOpen(false);
  };

  const columns = [
    { field: "id", headerName: "#", minWidth: 50, flex: 0.5 },
    { field: "nameUz", headerName: t("Узб тили"), minWidth: 150, flex: 1 },
    { field: "nameRu", headerName: t("Рус тили"), minWidth: 150, flex: 1 },
    {
      field: "type",
      headerName: t("Тури"),
      minWidth: 120,
      flex: 1,
      renderCell: (params) =>
        types.find((t) => t.value === params.row.type)?.label ||
        params.row.type,
    },
    { field: "price", headerName: t("Нархи"), minWidth: 100, flex: 1 },
    {
      field: "unit",
      headerName: t("Улчов бирлиги"),
      minWidth: 120,
      flex: 1,
      renderCell: (params) =>
        units.find((u) => u.value === params.row.unit)?.label ||
        params.row.unit,
    },
    { field: "sizes", headerName: t("Олчов бирлиги"), minWidth: 120, flex: 1 },
    {
      field: "status",
      headerName: t("Холати"),
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <span
          style={{
            color: params.row.status ? "#388e3c" : "#d32f2f",
            fontWeight: 500,
          }}
        >
          {params.row.status ? t("Фаол") : t("нофаол")}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: t("Таҳрирлаш"),
      minWidth: 100,
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleOpenEdit(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];
  const uzLocaleText = {
    // Pagination
    noRowsLabel: "Маълумот топилмади",
    footerRowSelected: (count) => `${count} та танланган`,
    footerTotalRows: "Жами сатрлар:",
    footerPaginationRowsPerPage: "Саҳифадаги сатрлар:",
    MuiTablePagination: {
      labelRowsPerPage: "Саҳифадаги сатрлар:",
      labelDisplayedRows: ({ from, to, count }) =>
        `${from}-${to} / ${count !== -1 ? count : `бешдан кўп`}`,
      nextIconButtonText: "Кейингиси",
      backIconButtonText: "Олдингиси",
    },
    // Filter panel
    filterPanelAddFilter: "Фильтр қўшиш",
    filterPanelDeleteIconLabel: "Ўчириш",
    filterPanelOperators: "Операторлар",
    filterPanelColumns: "Устунлар",
    filterPanelInputLabel: "Қидирув қиймати",
    filterPanelInputPlaceholder: "Қидирув...",
    // Column menu
    columnMenuLabel: "Меню",
    columnMenuShowColumns: "Устунларни кўрсатиш",
    columnMenuFilter: "Фильтр",
    columnMenuHideColumn: "Устунни яшириш",
    columnMenuUnsort: "Сараламаслик",
    columnMenuSortAsc: "Кўтарилиш бўйича саралаш",
    columnMenuSortDesc: "Камайиш бўйича саралаш",
    // Toolbar
    toolbarDensity: "Зичлик",
    toolbarDensityLabel: "Зичлик",
    toolbarDensityCompact: "Зич",
    toolbarDensityStandard: "Стандарт",
    toolbarDensityComfortable: "Қулай",
    toolbarColumns: "Устунлар",
    toolbarFilters: "Фильтрлар",
    toolbarExport: "Экспорт",
    toolbarExportCSV: "CSV'га экспорт",
    toolbarExportPrint: "Чоп этиш",
    // Other
    checkboxSelectionHeaderName: "Танлаш",
  };
  function CustomPagination(props) {
    return (
      <GridPagination
        {...props}
        slots={{
          actionsComponent: TablePaginationActions, // Optional if you want arrows customized too
        }}
        slotProps={{
          rowsPerPageOptions: [10, 25, 50, 100],
          labelRowsPerPage: "Саҳифадаги сатрлар:",
        }}
      />
    );
  }
  return (
    <Box p={2}>
      {/* <ProductStats /> */}
      <h2 className="text-2xl font-semibold my-8 text-center">
        {/* {t("here you can manage products")} */}
        {/* // HERE THIS COMMENT HAS TO BE WRITTEN IN CRYLS ALPHABET */}
        {t("бу ерда маҳсулотларни бошқаришингиз мумкин")}
      </h2>
      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <TextField
          label={t("Номи")}
          size="small"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>{t("Тури")}</InputLabel>
          <Select
            label={t("Тури")}
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          >
            <MenuItem value="">Барчаси</MenuItem>
            {types.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>{t("Улчов бирлиги")}</InputLabel>
          <Select
            label={t("Улчов бирлиги")}
            value={filter.unit}
            onChange={(e) => setFilter({ ...filter, unit: e.target.value })}
          >
            <MenuItem value="">Барчаси</MenuItem>
            {units.map((u) => (
              <MenuItem key={u.value} value={u.value}>
                {u.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Narxi (dan)"
          size="small"
          type="number"
          value={filter.priceFrom}
          onChange={(e) => setFilter({ ...filter, priceFrom: e.target.value })}
        />
        <TextField
          label="Narxi (gacha)"
          size="small"
          type="number"
          value={filter.priceTo}
          onChange={(e) => setFilter({ ...filter, priceTo: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
        >
          КИРИТИШ
        </Button>
      </Box>
      <div
        className="mt-4 bg-white rounded-xl overflow-hidden p-4 border border-slate-200 flex flex-col w-full"
        style={{ height: 420 }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8, 16, 32]}
          pagination
          disableSelectionOnClick
          localeText={{
            ...uzLocaleText,
            toolbarColumnsLabel: "Устунларни бошқариш",
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row"
          }
          slots={{
            pagination: CustomPagination,
          }}
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
        />
      </div>
      <ProductDialog
        addOpen={dialogOpen}
        setAddOpen={setDialogOpen}
        form={form}
        setForm={setForm}
        types={types}
        units={units}
        handleAdd={handleSave}
        editMode={editMode}
      />
    </Box>
  );
}

export default InfoProduct;
