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

export default function ProductDialog({
  addOpen,
  setAddOpen,
  form,
  setForm,
  types,
  units,
  handleAdd,
  editMode = false, // default to false if not provided
}) {
  const { t } = useTranslation();
  return (
    <Drawer
      anchor="right"
      open={addOpen}
      onClose={() => setAddOpen(false)}
      PaperProps={{ sx: { width: 700, maxWidth: "100%" } }}
    >
      <DialogTitle className="font-bold text-xl" sx={{ px: 3, pt: 3 }}>
        {editMode ? t("Кийимни таҳрирлаш") : t("Кийим киритиш")}
      </DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2 pt-2" sx={{ px: 3 }}>
        <div className="flex items-center gap-4 justify-between">
          <TextField
            label={t("Кийим номи (лотин тилида)")}
            value={form.nameUz}
            onChange={(e) => {
              const latinRegex = /^[A-Za-z\s'‘’-]*$/;
              if (latinRegex.test(e.target.value)) {
                setForm({ ...form, nameUz: e.target.value });
              } else {
                alert(t("Илтимос, фақат лотин ҳарфлари киритинг."));
              }
            }}
            onPaste={(e) => {
              const pasted = e.clipboardData.getData("text");
              if (!/^[A-Za-z\s'‘’-]*$/.test(pasted)) {
                e.preventDefault();
              }
            }}
            fullWidth
            className="mt-2"
            sx={{ marginTop: "10px" }}
          />
          <TextField
            label={t("Кийим номи (кирилл тилида)")}
            value={form.nameRu}
            onChange={(e) => {
              const cyrillicRegex = /^[А-Яа-яЁё\s'‘’-]*$/;
              if (cyrillicRegex.test(e.target.value)) {
                setForm({ ...form, nameRu: e.target.value });
              } else {
                alert("Пожалуйста, введите только буквы кириллицы.");
              }
            }}
            onPaste={(e) => {
              const pasted = e.clipboardData.getData("text");
              if (!/^[А-Яа-яЁё\s'‘’-]*$/.test(pasted)) {
                e.preventDefault();
              }
            }}
            sx={{ marginTop: "10px" }}
            fullWidth
          />
        </div>
        <div className="flex items-center gap-4 justify-between">
          <FormControl fullWidth>
            <InputLabel>{t("Кийим тури")}</InputLabel>
            <Select
              label={t("Кийим тури")}
              value={form.type}
              onChange={(e) => {
                setForm({ ...form, type: e.target.value, sizes: "" }); // reset sizes when type changes
              }}
            >
              {types.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label={t("Кийим Нархи")}
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            fullWidth
          />
        </div>

        {editMode && (
          <FormControl fullWidth>
            <InputLabel>{t("Холат")}</InputLabel>
            <Select
              label={t("Холат")}
              value={form.status ? t("фаол") : t("нофаол")}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value === t("фаол") })
              }
            >
              <MenuItem value={t("фаол")}>{t("фаол")}</MenuItem>
              <MenuItem value={t("нофаол")}>{t("нофаол")}</MenuItem>
            </Select>
          </FormControl>
        )}

        {/* MULTI SELECT with TAGS like this is  image */}
        {/* this is just an example of how to use Autocomplete component with multiple options */}
        <Autocomplete
          multiple
          disabled={!form.type}
          options={sizeOptions[form.type] || []}
          value={form.sizes ? form.sizes.split(", ") : []}
          onChange={(e, value) => setForm({ ...form, sizes: value.join(", ") })}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t("Ўлчамлар")}
              placeholder={t("Танланг...")}
            />
          )}
        />
        <FormControl>
          <InputLabel>O'lchov birligi</InputLabel>
          <Select
            label={t("Улчов бирлиги")}
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          >
            {units.map((u) => (
              <MenuItem key={u.value} value={u.value}>
                {u.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* ...rest of your form fields... */}
      </DialogContent>
      <DialogActions className="mt-2" sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => setAddOpen(false)}>{t("Бекор қилиш")}</Button>
        <Button variant="contained" onClick={handleAdd}>
          {t("КИРИТИШ")}
        </Button>
      </DialogActions>
    </Drawer>
  );
}
