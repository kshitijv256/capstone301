import React from "react";
import SigninForm from "./SigninForm";
import Appbar from "../../components/Appbar";

// Dialogue 1: Let's define the Signin component
const Signin: React.FC = () => {
  return (
    <>
      <Appbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-800">
        <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-slate-700 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-8">
            Sign in
          </h1>
          <SigninForm />
        </div>
      </div>
    </>
  );
};

// Dialogue 3: And finally, we've to export the component
export default Signin;
