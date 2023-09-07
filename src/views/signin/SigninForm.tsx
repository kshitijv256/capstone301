import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "../../utils/apiUtils";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // Dialogue 2: Then we will define the handle submit function
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/");
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <span className="text-red-600 dark:text-red-400">{error}</span>}
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email..."
          autoFocus
          {...register("email", { required: true })}
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-lime-500 focus:shadow-outline-lime ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && <span>Email is required</span>}
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter password..."
          {...register("password", { required: true })}
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-lime-500 focus:shadow-outline-lime ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && <span>This field is required</span>}
      </div>
      <p className="italic mt-2 dark:text-gray-200">
        New here,{" "}
        <Link to={"/signup"} className="text-lime-600 dark:text-lime-400">
          Sign Up
        </Link>
      </p>
      <button
        type="submit"
        className="w-full bg-lime-700 hover:bg-lime-800 
        dark:bg-lime-500 dark:hover:bg-lime-600
        text-white font-semibold py-2 px-4 rounded-md 
        focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign In
      </button>
    </form>
  );
};

export default SigninForm;
