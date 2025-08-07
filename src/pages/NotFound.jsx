import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { t } from "i18next";

function NotFound() {
  const { t } = useTranslation();
  // const [count, setCount] = useState(0);
  // console.log("rendered");

  // const increase = () => {
  //   setCount(count + 1);
  // };
  // const decrese = () => {
  //   setCount(count - 1);
  // };

  // useEffect(() => {
  //   console.log("mounted");
  // }, [count]);
  return (
    <div>
      {/* <h1 className="text-3xl font-bold text-green-500   mt-4 ">{count}</h1>
      <button
        onClick={increase}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        +++
      </button>
      <button
        onClick={decrese}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        ---
      </button> */}
      <h1 className="text-3xl font-bold text-red-500 text-center mt-4 ">
        {t("Саҳифа топилмади")}
        {/* {t("OOOOOOOOOOOOOOOO")} */}
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
