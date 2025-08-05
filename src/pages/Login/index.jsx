import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// ✅ Validation Schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]  ">
      <Paper
        elevation={4}
        className="p-6 w-full max-w-sm rounded-2xl shadow-lg"
      >
        <Typography
          variant="h5"
          className="text-center mb-5 text-gray-800 dark:text-white font-semibold"
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField
            label="Username"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
        {/* here we have to add "create account" */}
        <Typography
          variant="body2"
          className=" mt-6 text-gray-600 dark:text-gray-400"
        >
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Create an account
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default LoginPage;
