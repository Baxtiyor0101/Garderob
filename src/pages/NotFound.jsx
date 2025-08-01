import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
// import { t } from "i18next";

function NotFound() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-3xl font-bold text-red-500 text-center mt-4 ">
        {t("Саҳифа топилмади")}
        {t("OOOOOOOOOOOOOOOO")}
      </h1>
      <p className="text-center mt-4">
        {/* here e can upfadate the content of not found page to crle alphabet
         */}
        {/* The page you are looking for is not found */}
      </p>
      <div className="mt-4 mx-auto block text-center">
        <Button
          className="mt-4 mx-auto block text-center text-white "
          variant="contained"
        >
          <a href="/">{t("Бош саҳифа")}</a>
        </Button>
      </div>
      {/* some naimation for not found page */}
    </div>
  );
}

export default NotFound;
