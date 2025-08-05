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

export default function ReceivablesDrawer({ addOpen, setAddOpen, form, setForm }) {
  const { t } = useTranslation();
  return (
    <Drawer
      anchor="right"
      open={addOpen}
      onClose={() => setAddOpen(false)}
      PaperProps={{ sx: { width: 400, maxWidth: "100%" } }}
    >
      <DialogTitle className="font-bold text-xl" sx={{ px: 3, pt: 3 }}>
        {t("Таҳрирлаш")}
      </DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2 pt-2" sx={{ px: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Ҳолати</InputLabel>
          <Select
            label={t("Ҳолати")}
            value={form.status ? t("фаол") : t("нофаол")}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value === "фаол" })
            }
          >
            <MenuItem value={t("Ундирилди")}>{t("Ундирилди")}</MenuItem>
            <MenuItem value={t("Ундирилмади")}>{t("Ундирилмади")}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions className="mt-2" sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => setAddOpen(false)}>{t("Бекор қилиш")}</Button>
        <Button variant="contained">{t("Таҳрирлаш")}</Button>
      </DialogActions>
    </Drawer>
  );
}
