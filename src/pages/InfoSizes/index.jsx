// InfoProductPage.js
import React, { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";
import SizeDialog from "./components/AddEditModal";
import useLanguageStore from "../../store/languageStore";
// const { t } = useTranslation(); // Assuming you have a translation function

function InfoSizes() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();

  const types = [
    { value: t("форма"), label: t("Форма") },
    { value: t("ички кийим"), label: t("Ички кийим") },
    { value: t("пойабзал"), label: t("Пойабзал") },
    { value: t("бош кийим"), label: t("Бош кийим") },
  ];

  const units = [
    { value: t("дона"), label: t("дона") },
    { value: t("жуфт"), label: t("жуфт") },
    { value: t("тўплам"), label: t("тўплам") },
  ];

  const initialRows = [
    {
      id: 1,
      name: "42",
      clothesTypes: [t("пойабзал"), t("шим")],
      status: true,
    },
    {
      id: 2,
      name: "S",
      clothesTypes: [t("форма"), t("ички кийим")],
      status: true,
    },
    {
      id: 3,
      name: "XL",
      clothesTypes: [t("форма")],
      status: false,
    },
    {
      id: 4,
      name: "56",
      clothesTypes: [t("ички кийим")],
      status: true,
    },
  ];

  useEffect(() => {
    try {
      let elements = document.querySelectorAll(
        ".MuiTablePagination-selectLabel.css-s09cke-MuiTablePagination-selectLabel"
      );
      elements.forEach((el) => {
        el.innerHTML = t("Саҳифадаги қаторлар:");
      });
    } catch (e) {
      // do nothing
    }
  }, [language]);
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
  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    unit: "",
    sizes: "",
    status: true,
  });
  const [editRow, setEditRow] = useState(null);

  const filteredRows = rows.filter((row) => {
    // Filter by size name (case-insensitive)
    const nameOk =
      !filter.name ||
      (row.name || "").toLowerCase().includes(filter.name.toLowerCase());
    const nameRuOk =
      !filter.name ||
      (row.nameRu || "").toLowerCase().includes(filter.name.toLowerCase());
    // Filter by clothes type (at least one type matches)
    const typeOk =
      !filter.type || (row.clothesTypes || []).includes(filter.type);
    return nameOk && typeOk;
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
  const clothesTypes = [
    { value: "форма", label: "Форма" },
    { value: "ички кийим", label: "Ички кийим" },
    { value: "пойабзал", label: "Пойабзал" },
    { value: "бош кийим", label: "Бош кийим" },
    { value: "шим", label: "Шим" },
    // қўшимча турлар керак бўлса, қўшишингиз мумкин
  ];

  const columns = [
    { field: "id", headerName: t("Т/р"), minWidth: 60, flex: 0.5 },
    {
      field: "name",
      headerName: t("Ўлчам номи"),
      minWidth: 100,
      flex: 1,
    },
    {
      field: "clothesTypes",
      headerName: t("Қандай кийим турлари учун"),
      minWidth: 200,
      flex: 2,
      renderCell: (params) => (
        <span>
          {(params.row.clothesTypes || [])
            .map(
              (type) =>
                clothesTypes.find((t) => t.value === type)?.label || type
            )
            .join(", ")}
        </span>
      ),
    },
    {
      field: "status",
      headerName: t("Ҳолати"),
      minWidth: 100,
      flex: 1,
      renderCell: (params) => (
        <span
          style={{
            color: params.row.status ? "#388e3c" : "#d32f2f",
            fontWeight: 500,
          }}
        >
          {params.row.status ? t("Фаол") : t("Нофаол")}
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
  noRowsLabel: t("Маълумот топилмади"),
  footerRowSelected: (count) => `${count} та танланган`,
  footerTotalRows: t("Жами сатрлар:"),
  footerPaginationRowsPerPage: t("Саҳифадаги сатрлар:"),
  MuiTablePagination: {
    labelRowsPerPage: t("Саҳифадаги сатрлар:"),
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}-${to} / ${count !== -1 ? count : t("бешдан кўп")}`,
    nextIconButtonText: t("Кейингиси"),
    backIconButtonText: t("Олдингиси"),
  },

  // Toolbar
  toolbarDensity: t("Зичлик"),
  toolbarDensityLabel: t("Зичлик"),
  toolbarDensityCompact: t("Зич"),
  toolbarDensityStandard: t("Стандарт"),
  toolbarDensityComfortable: t("Қулай"),
  toolbarColumns: t("Устунлар"),
  toolbarFilters: t("Фильтрлар"),
  toolbarExport: t("Экспорт"),
  toolbarExportCSV: t("CSV'га экспорт"),
  toolbarExportPrint: t("Чоп этиш"),
  toolbarQuickFilterPlaceholder: t("Қидирув..."),

  // Filter panel
  filterPanelAddFilter: t("Фильтр қўшиш"),
  filterPanelDeleteIconLabel: t("Ўчириш"),
  filterPanelOperators: t("Операторлар"),
  filterPanelColumns: t("Устунлар"),
  filterPanelInputLabel: t("Қидирув қиймати"),
  filterPanelInputPlaceholder: t("Қидирув..."),

  // Column menu
  columnMenuLabel: t("Меню"),
  columnMenuShowColumns: t("Устунларни кўрсатиш"),
  columnMenuFilter: t("Фильтр"),
  columnMenuHideColumn: t("Устунни яшириш"),
  columnMenuUnsort: t("Сараламаслик"),
  columnMenuSortAsc: t("Кўтарилиш бўйича саралаш"),
  columnMenuSortDesc: t("Камайиш бўйича саралаш"),

  // Columns panel text field
  columnsPanelTextFieldLabel: t("Устунни қидир"),
  columnsPanelTextFieldPlaceholder: t("Устун номи"),
  
  // Rows panel / row menu (if using row grouping or tree data)
  rowReorderingHeaderName: t("Сатрни қайта тартиблаш"),
  
  // Boolean operators
  filterOperatorContains: t("Ичидан"),
  filterOperatorEquals: t("Баробар"),
  filterOperatorStartsWith: t("Билан бошланади"),
  filterOperatorEndsWith: t("Билан тугайди"),
  filterOperatorIsEmpty: t("Бўш"),
  filterOperatorIsNotEmpty: t("Бўш эмас"),
  filterOperatorIsAnyOf: t("Қуйидагилардан бири"),

  // Columns panel
  columnsPanelDragIconLabel: t("Қайта жойлаштириш"),
  columnsPanelShowAllButton: t("Ҳаммасини кўрсатиш"),
  columnsPanelHideAllButton: t("Ҳаммасини яшириш"),

  // Boolean cell values
  booleanCellTrueLabel: t("Ҳа"),
  booleanCellFalseLabel: t("Йўқ"),

  // Clipboard export
  clipboardCopyMessage: t("Нусха олинди"),
  clipboardPasteMessage: t("Қўйилди"),

  // Additional messages
  // If using Tree Data or Grouping:
  treeDataGroupingHeaderName: t("Гуруҳлар"),
  treeDataExpand: t("Кенгайтириш"),
  treeDataCollapse: t("Иқтибос қилиш"),

  // Footer selected rows count
  footerSelectedRows: (count) =>
    count !== 1 ? `${count} сатр танланган` : `1 сатр танланган`,
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
      <h2 className="text-2xl font-semibold my-4 text-center">
        {/* {t("here you can manage products")} */}
        {/* // HERE THIS COMMENT HAS TO BE WRITTEN IN CRYLS ALPHABET */}
        {t("Бу ерда сиз улчамларни бошқаришингиз мумкин")}
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

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
        >
          {t("КИРИТИШ")}
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
      <SizeDialog
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

export default InfoSizes;
