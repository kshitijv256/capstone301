import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUser } from "../../utils/apiUtils";

type Inputs = {
  organisationName: string;
  userName: string;
  userEmail: string;
  userPassword: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { userName, userEmail, userPassword } = data;
    try {
      const data = await createUser({
        name: userName,
        email: userEmail,
        password: userPassword,
      });
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/");
      // Dialogue: After successful signup we have to redirect the user to the secured page. We will do that later.
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <span className="text-red-600 dark:text-red-400">{error}</span>}
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
          Your Name:
        </label>
        <input
          type="text"
          id="userName"
          autoFocus
          {...register("userName", { required: true })}
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-lime-500 focus:shadow-outline-lime ${
            errors.userName ? "border-red-500" : ""
          }`}
        />
        {errors.userName && <span>Email is required</span>}
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="userEmail"
          {...register("userEmail", { required: true })}
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-lime-500 focus:shadow-outline-lime ${
            errors.userEmail ? "border-red-500" : ""
          }`}
        />
        {errors.userEmail && <span>Email is required</span>}
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="userPassword"
          {...register("userPassword", { required: true })}
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-lime-500 focus:shadow-outline-lime ${
            errors.userPassword ? "border-red-500" : ""
          }`}
        />
        {errors.userPassword && <span>Password is required</span>}
      </div>
      <p className="italic mt-2 dark:text-gray-200">
        Already have an account,{" "}
        <Link to={"/signin"} className="text-lime-600 dark:text-lime-400">
          Sign In
        </Link>
      </p>
      <button
        type="submit"
        className="w-full bg-lime-700 hover:bg-lime-800 
        dark:bg-lime-500 dark:hover:bg-lime-600
        text-white font-semibold py-2 px-4 rounded-md 
        focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
