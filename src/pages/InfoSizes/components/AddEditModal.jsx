import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Autocomplete,
  Drawer,
} from "@mui/material";
import { useTranslation } from "react-i18next";
// import { t } from "i18next";

const sizeOptions = {
  униформа: ["S", "M", "L", "XL"],
  "нижнее белье": ["S", "M", "L", "XL"],
  обувь: ["39", "40", "41", "42", "43", "44"],
  "головной убор": [
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
  ],
};
const clothesTypes = [
  { value: "униформа", label: "Униформа" },
  { value: "нижнее белье", label: "Нижнее белье" },
  { value: "обувь", label: "Пойабзал" },
  { value: "головной убор", label: "Бош кийим" },
  { value: "шим", label: "Шим" },
  // add more as needed
];

export default function SizeDialog({
  addOpen,
  setAddOpen,
  form,
  setForm,
  handleAdd,
  editMode = false,
}) {
    const { t } = useTranslation();
  return (
    <Drawer
      anchor="right"
      open={addOpen}
      onClose={() => setAddOpen(false)}
      PaperProps={{ sx: { width: 400, maxWidth: "100%" } }}
    >
      <DialogTitle className="font-bold text-xl" sx={{ px: 3, pt: 3 }}>
        {editMode ? t("Ўлчамни таҳрирлаш") : t("Ўлчам киритиш")}
      </DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2 pt-2" sx={{ px: 3 }}>
        <TextField
          label={t("Ўлчам номи (лотин тилида)")}
          value={form.sizeName || ""}
          onChange={(e) => {
            const latinRegex = /^[A-Za-z\s'‘’-]*$/;
            if (latinRegex.test(e.target.value)) {
              setForm({ ...form, sizeName: e.target.value });
            }
          }}
          onPaste={(e) => {
            const pasted = e.clipboardData.getData("text");
            if (!/^[A-Za-z\s'‘’-]*$/.test(pasted)) {
              e.preventDefault();
            }
          }}
          fullWidth
        />

        <TextField
          label={t("Ўлчам номи (рус тилида)")}
          value={form.sizeNameRu || ""}
          onChange={(e) => {
            const cyrillicRegex = /^[А-Яа-яЁё\s'‘’-]*$/;
            if (cyrillicRegex.test(e.target.value)) {
              setForm({ ...form, sizeNameRu: e.target.value });
            }
          }}
          onPaste={(e) => {
            const pasted = e.clipboardData.getData("text");
            if (!/^[А-Яа-яЁё\s'‘’-]*$/.test(pasted)) {
              e.preventDefault();
            }
          }}
          fullWidth
        />

        <Autocomplete
          multiple
          options={clothesTypes}
          getOptionLabel={(option) => option.label}
          value={clothesTypes.filter((t) =>
            (form.clothesTypes || []).includes(t.value)
          )}
          onChange={(_, value) =>
            setForm({
              ...form,
              clothesTypes: value.map((v) => v.value),
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("Қандай кийим турлари учун?")}
              placeholder={t("Танланг...")}
            />
          )}
        />
        {editMode && (
          <FormControl fullWidth>
            <InputLabel>Ҳолати</InputLabel>
            <Select
              label={t("Ҳолати")}
              value={form.status ? t("фаол") : t("нофаол")}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value === "фаол" })
              }
            >
              <MenuItem value={t("фаол")}>{t("фаол")}</MenuItem>
              <MenuItem value={t("нофаол")}>{t("нофаол")}</MenuItem>
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions className="mt-2" sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => setAddOpen(false)}>{t("Бекор қилиш")}</Button>
        <Button variant="contained" onClick={handleAdd}>
          {editMode ? t("Таҳрирлаш") : t("КИРИТИШ")}
        </Button>
      </DialogActions>
    </Drawer>
  );
}
