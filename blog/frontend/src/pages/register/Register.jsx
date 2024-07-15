import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../components/MainLayout";
import { signup } from "../../services/index/users";
import { userActions } from "../../store/reducers/userReducers";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      toast.success("Signup successful");
      localStorage.setItem("account", JSON.stringify(data));
      reset({ name: "", email: "", password: "", confirmPassword: "" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };
  const password = watch("password");

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  return (
    <MainLayout>
      <section className="container mx-auto py-10">
        <div className="w-full max-w-sm mx-auto p-4 shadow-lg rounded-sm bg-gray-50">
          <h1 className="font-roboto text-3xl font-bold text-center text-dark-hard mb-4">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-4 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7184] text-sm font-semibold block"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message: "Name length must be at least 1 character",
                  },
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                placeholder="Enter name"
                className={`placeholder:text-sm placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-2 font-semibold block outline-none border ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-4 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] text-sm font-semibold block"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter a valid email",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                placeholder="Enter email"
                className={`placeholder:text-sm placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-2 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-4 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] text-sm font-semibold block"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password length must be at least 6 characters",
                  },
                })}
                placeholder="Enter password"
                className={`placeholder:text-sm placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-2 font-semibold block outline-none border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-4 w-full">
              <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] text-sm font-semibold block"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm password is required",
                  },
                  validate: (value) => {
                    if (value !== password) {
                      return "Passwords do not match";
                    }
                  },
                })}
                placeholder="Enter confirm password"
                className={`placeholder:text-sm placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-2 font-semibold block outline-none border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || isPending}
              className="bg-primary text-white font-bold text-lg py-2 px-8 w-full rounded-lg mb-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {!isPending ? "Register" : "Sending wait..."}
            </button>
            <Toaster />
            <p className="text-sm font-semibold text-[#5a7184]">
              You have an account?{" "}
              <Link to="/login" className="text-primary">
                Login now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default Register;
