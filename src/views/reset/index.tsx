import React from "react";
import Appbar from "../../components/Appbar";
import ResetForm from "./ResetForm";

const ResetPassword = () => {
  return (
    <>
      <Appbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-800">
        <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-slate-700 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-8">
            Reset Password
          </h1>
          <ResetForm />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
