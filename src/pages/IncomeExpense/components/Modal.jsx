import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
// translation
import { useTranslation } from "react-i18next";

const items = [
  {
    name: "Куртка қишки",
    size: "54/4",
    count: 100,
    unit: "дона",
    price: 650000,
    total: 65000000,
    duration: 5,
  },
  {
    name: "Фуражка",
    size: "56",
    count: 100,
    unit: "дона",
    price: 650000,
    total: 65000000,
    duration: 5,
  },
  {
    name: "Шим",
    size: "37",
    count: 100,
    unit: "дона",
    price: 650000,
    total: 65000000,
    duration: 5,
  },
  {
    name: "",
    size: "0",
    count: 0,
    unit: "дона",
    price: 0,
    total: 0,
    duration: 0,
  },
];

const selectOptions = ["Кирим", "Чиқим"];
const supplyOptions = ["Куртка қишки", "Фуражка", "Шим"];
const unitOptions = ["дона"];
const sizeOptions = ["54/4", "56", "37", "0"];

export default function IncomeExpenseModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle className="font-bold text-blue-500 text-center">
        КИРИМ ВА ЧИҚИМ ЮК ХАТИНИ ШАКЛЛАНТИРИШ
      </DialogTitle>
      <DialogContent className="">
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
        {/* Top 3 rows (3 columns) */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <TextField
                sx={{ width: "40%" }}
                label="Юк хати тури"
                select
                size="small"
                defaultValue="Кирим"
              >
                {selectOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Юк хати рақами"
                size="small"
                defaultValue="3456"
                fullWidth
                sx={{ width: "30%" }}
              />
              <TextField
                label="Санаси"
                type="date"
                size="small"
                defaultValue="2025-06-16"
                InputLabelProps={{ shrink: true }}
              />
            </div>
          </div>

          <TextField
            label="Кимдан"
            select
            size="small"
            defaultValue="Божхона қўмитаси"
          >
            <MenuItem value="Божхона қўмитаси">Божхона қўмитаси</MenuItem>
          </TextField>

          <TextField
            label="Кимга"
            select
            size="small"
            defaultValue="Божхона қўмитаси"
          >
            <MenuItem value="Божхона қўмитаси">Божхона қўмитаси</MenuItem>
          </TextField>
        </div>

        {/* Items section */}
        <div className="mt-6 flex flex-col gap-4  ">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-[3.7fr_1fr_1fr_1fr_1fr_1.2fr_1fr_0.2fr] gap-4 items-end">
              <TextField
                select
                label="Ашёний таъминот номи"
                size="small"
                fullWidth
                defaultValue={item.name || ""}
                // sx={{ width: "100%" }}
              >
                {supplyOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Ўлчами"
                size="small"
                defaultValue={item.size}
              >
                {sizeOptions.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Сони"
                type="number"
                size="small"
                defaultValue={item.count}
              />
              <TextField
                select
                label="Бирлиги"
                size="small"
                defaultValue={item.unit}
              >
                {unitOptions.map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Нархи"
                type="number"
                size="small"
                defaultValue={item.price}
              />
              <TextField
                label="Жами нархи"
                type="number"
                size="small"
                defaultValue={item.total}
              />
              <TextField
                label="Муддати (й.)"
                type="number"
                size="small"
                defaultValue={item.duration}
              />
              {index < items.length - 1 ? (
                <IconButton color="error">
                  <Remove />
                </IconButton>
              ) : (
                <IconButton color="primary">
                  <Add />
                </IconButton>
              )}
            </div>
          ))}
        </div>
      </DialogContent>

      <DialogActions className="justify-between px-6 pb-4">
        <Button onClick={onClose} variant="contained" color="inherit">
          Бекор қилиш
        </Button>
        <Button variant="contained" color="success">
          Сақлаш
        </Button>
      </DialogActions>
    </Dialog>
  );
}
