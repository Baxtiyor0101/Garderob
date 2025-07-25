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

const sizeOptions = {
  униформа: ["S", "M", "L", "XL"],
  "нижнее белье": ["S", "M", "L", "XL"],
  обувь: ["39", "40", "41", "42", "43", "44"],
  "головной убор": ["54", "55", "56", "57", "58", "59", "60","61", "62", "63", "64",  "65", "66", "67", "68"],
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
  return (
    <Drawer
      anchor="right"
      open={addOpen}
      onClose={() => setAddOpen(false)}
      PaperProps={{ sx: { width: 400, maxWidth: "100%" } }}
    >
      <DialogTitle className="font-bold text-xl" sx={{ px: 3, pt: 3 }}>
        {editMode ? "Kiyimni o'zgartirish" : "Kiyim киритиш"}
      </DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2 pt-2" sx={{ px: 3 }}>
        <div className="flex items-center gap-4 justify-between">
          <TextField
            label="Kiyim nomi (o'zbek tilida)"
            value={form.nameUz}
            onChange={(e) => setForm({ ...form, nameUz: e.target.value })}
            fullWidth
            className="mt-2"
            sx={{ marginTop: "10px" }}
          />
          <TextField
            label="Kiyim nomi (rus tilida)"
            value={form.nameRu}
            onChange={(e) => setForm({ ...form, nameRu: e.target.value })}
            sx={{ marginTop: "10px" }}
            fullWidth
          />
        </div>
        <div className="flex items-center gap-4 justify-between">
          <FormControl fullWidth>
            <InputLabel>Kiyim turi</InputLabel>
            <Select
              label="Kiyim turi"
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
            label="Narxi"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            fullWidth
          />
        </div>

        {editMode && (
          <FormControl fullWidth>
            <InputLabel>Holati</InputLabel>
            <Select
              label="Holati"
              value={form.status ? "faol" : "nofaol"}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value === "faol" })
              }
            >
              <MenuItem value="faol">Faol</MenuItem>
              <MenuItem value="nofaol">Nofaol</MenuItem>
            </Select>
          </FormControl>
        )}

        {/* MULTI SELECT with TAGS like image */}
        <Autocomplete
          multiple
          disabled={!form.type}
          options={sizeOptions[form.type] || []}
          value={form.sizes ? form.sizes.split(", ") : []}
          onChange={(e, value) => setForm({ ...form, sizes: value.join(", ") })}
          renderInput={(params) => (
            <TextField
              {...params}
              label="O'lchamlari"
              placeholder="Tanlang..."
            />
          )}
        />
        <FormControl>
          <InputLabel>O'lchov birligi</InputLabel>
          <Select
            label="O'lchov birligi"
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
        <Button onClick={() => setAddOpen(false)}>Бекор қилиш</Button>
        <Button variant="contained" onClick={handleAdd}>
          КИРИТИШ
        </Button>
      </DialogActions>
    </Drawer>
    // <Dialog
    //   open={addOpen}
    //   onClose={() => setAddOpen(false)}
    //   maxWidth="sm"
    //   fullWidth
    // >
    //   <DialogTitle className="font-bold text-xl">
    //     {editMode ? "Kiyimni o'zgartirish" : "Kiyim киритиш"}
    //   </DialogTitle>
    //   <DialogContent
    //     className="flex flex-col gap-4 mt-2 pt-2"
    //     // sx={{zIndex: 1000 }}
    //   >

    //   </DialogContent>
    //   <DialogActions className="mt-2">
    //     <Button onClick={() => setAddOpen(false)}>Бекор қилиш</Button>
    //     <Button variant="contained" onClick={handleAdd}>
    //       КИРИТИШ
    //     </Button>
    //   </DialogActions>
    // </Dialog>
  );
}





