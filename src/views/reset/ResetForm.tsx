import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateUser } from "../../utils/apiUtils";

type Inputs = {
  current_password: string;
  new_password: string;
};

const ResetForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { current_password, new_password } = data;
    try {
      await updateUser({ current_password, new_password });
      navigate("/");
    } catch (error: any) {
      const err = JSON.parse(error.message);
      setError(err.errors[0]);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <span className="text-red-600 dark:text-red-400">{error}</span>}
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-2">
          Current password:
        </label>
        <input
          type="password"
          id="current_password"
          placeholder="Enter current password..."
          autoFocus
          {...register("current_password", { required: true })}
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 focus:shadow-outline-green ${
            errors.current_password ? "border-red-500" : ""
          }`}
        />
        {errors.current_password && <span>Current password is required</span>}
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-semibold">
          Password:
        </label>

        <input
          type="password"
          id="new_password"
          placeholder="Enter new password..."
          {...register("new_password", { required: true })}
          className={`w-full border rounded-md py-2 px-3 mb-1 mt-1 text-gray-700 leading-tight focus:outline-none focus:border-green-500 focus:shadow-outline-green ${
            errors.new_password ? "border-red-500" : ""
          }`}
        />
        {errors.new_password && <span>This field is required</span>}
      </div>
      <p className="italic mt-2 dark:text-gray-200">
        Recall your password,{" "}
        <Link to={"/signup"} className="text-green-600 dark:text-green-400">
          Sign Up
        </Link>
      </p>
      <button
        type="submit"
        className="w-full bg-green-700 hover:bg-green-800 
        dark:bg-green-500 dark:hover:bg-green-600
        text-white font-semibold py-2 px-4 rounded-md 
        focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Reset
      </button>
    </form>
  );
};

export default ResetForm;
