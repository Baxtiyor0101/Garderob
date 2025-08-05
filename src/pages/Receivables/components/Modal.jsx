import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";

export default function ReceivablesModal({ open, onClose }) {
  const { t } = useTranslation();

  const rows = [
    {
      id: 1,
      name: t("Телпак қоракўлдан (кубанка аёллар учун), кокардаси билан"),
      count: 1,
      months: 96,
      date: "11.2016",
      remaining: 0,
      price: 780000,
      monthlyPrice: 8125,
      payment: 43631,
    },
    {
      id: 2,
      name: t("Фуражка (аёллар учун пилотка), кокардаси билан"),
      count: 1,
      months: 24,
      date: "11.2020",
      remaining: 0,
      price: 190400,
      monthlyPrice: 7933,
      payment: 37804,
    },
    {
      id: 3,
      name: t("Куртка қишки, погонлари ва шеврон билан"),
      count: 1,
      months: 72,
      date: "11.2020",
      remaining: 0,
      price: 646000,
      monthlyPrice: 8972,
      payment: 86259,
    },
    {
      id: 4,
      name: t("Куртка мавсумий, погонлари ва шеврон билан"),
      count: 1,
      months: 72,
      date: "11.2020",
      remaining: 0,
      price: 69000,
      monthlyPrice: 958,
      payment: 78097,
    },
    {
      id: 5,
      name: t("Костюм-шим (аёллар учун), погонлар, шеврон ва бошқалар билан"),
      count: 1,
      months: 96,
      date: "11.2018",
      remaining: 0,
      price: 788000,
      monthlyPrice: 8208,
      payment: 67777,
    },
    {
      id: 6,
      name: t("Шим (аёллар учун юбка)"),
      count: 1,
      months: 48,
      date: "08.2017",
      remaining: 0,
      price: 795000,
      monthlyPrice: 22083,
      payment: 0,
    },
    {
      id: 7,
      name: t("Кўйлак оқ рангли (узун ва калта енгли)"),
      count: 1,
      months: 12,
      date: "11.2023",
      remaining: 0,
      price: 760784,
      monthlyPrice: 15849,
      payment: 0,
    },
    {
      id: 8,
      name: t("Кўйлак хаки рангли (узун ва калта енгли)"),
      count: 1,
      months: 12,
      date: "11.2023",
      remaining: 0,
      price: 283744,
      monthlyPrice: 23645,
      payment: 0,
    },
    {
      id: 9,
      name: t("Галстук"),
      count: 1,
      months: 24,
      date: "10.2022",
      remaining: 0,
      price: 130893,
      monthlyPrice: 9762,
      payment: 166666,
    },
    {
      id: 10,
      name: t("Дала формали кийим-боши, кепка билан"),
      count: 1,
      months: 96,
      date: "11.2016",
      remaining: 0,
      price: 113413,
      monthlyPrice: 5453,
      payment: 75986,
    },
  ];

  const columns = [
    { field: "id", headerName: t("№"), width: 60 },
    {
      field: "name",
      headerName: t("Ашёвий таъминот номи"),
      flex: 2,
      minWidth: 250,
    },
    {
      field: "count",
      headerName: t("Сони"),
      width: 70,
    },
    {
      field: "date",
      headerName: t("Берилган санаси"),
      width: 120,
    },
    {
      field: "remaining",
      headerName: t("Қолган (муд. ойда)"),
      width: 130,
    },
    {
      field: "price",
      headerName: t("Янги кийим-бош нархи"),
      width: 160,
      valueFormatter: ({ value }) => value?.toLocaleString(),
    },
    {
      field: "monthlyPrice",
      headerName: t("Бир ой учун нарх"),
      width: 150,
      valueFormatter: ({ value }) => value?.toLocaleString(),
    },
    {
      field: "payment",
      headerName: t("Ундиралидиган тўлов"),
      width: 160,
      valueFormatter: ({ value }) => value?.toLocaleString(),
    },
  ];

  const total = rows.reduce((sum, row) => sum + row.payment, 0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle className="flex text-blue-500 text-center relative">
        <div className="flex-3">
          <h2 className="flex flex-col items-start font-normal text-sm">
            <span>{t("АШЁВИЙ ТАЪМИНОТ УЧУН УНДИРИЛАДИГАН")}</span>
            <span>{t("ПУЛ МАБЛАҒЛАРИ БЎЙИЧА")}</span>
            <span className="font-bold">
              {t("ХИСОБ-КИТОБ МАЪЛУМОТНОМАСИ № 19")}
            </span>
          </h2>
        </div>

        <div className="flex justify-between items-start flex-1 gap-4 mb-4 text-sm text-gray-800 px-4">
          <div className="flex flex-col text-left">
            <div className="text-blue-500 font-bold">
              <span className="font-normal text-blue-500">{t("Ф.И.Ш")}:</span>{" "}
              {t("Абдумаликов Дониёр Илёсевич")}
            </div>
            <div className="text-blue-500 font-bold">
              <span className="font-normal text-blue-500">{t("Унвони")}:</span>{" "}
              {t("Божхона хизмати майори")}
            </div>
            <div className="text-blue-500 font-bold">
              <span className="font-normal text-blue-500">
                {t("Б/т буйруқ")}:
              </span>{" "}
              {t("52-сон 06.03.2025 йил")}
            </div>
          </div>

          <IconButton onClick={onClose} className="" size="small">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent className="bg-white">
        <div className="h-[500px] w-full px-4">
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            disableColumnMenu
            hideFooter
            sx={{
              "& .MuiDataGrid-columnHeaderTitle": {
                whiteSpace: "normal",
                wordBreak: "break-word",
                lineHeight: "1.4",
                textAlign: "center !important",
                fontWeight: "bold",
              },
            }}
            className="border border-gray-300"
          />
        </div>

        <div className="flex justify-end mt-4 px-4">
          <Typography variant="subtitle1" className="font-bold">
            <span className="font-bold">
              {t("Жами")}: {total.toLocaleString()} {t("сўм")}
            </span>
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}
