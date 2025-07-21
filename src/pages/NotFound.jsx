import { Button } from "@mui/material";
import React from "react";

function NotFound() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-red-500 text-center mt-4 ">
        404 Not Found
      </h1>
      <p className="text-center mt-4">
        The page you are looking for is not found
      </p>
      <div className="mt-4 mx-auto block text-center">
        <Button
          className="mt-4 mx-auto block text-center text-white "
          variant="contained"
        >
          <a href="/">Go to Home</a>
        </Button>
      </div>
      {/* some naimation for not found page */}
    </div>
  );
}

export default NotFound;
