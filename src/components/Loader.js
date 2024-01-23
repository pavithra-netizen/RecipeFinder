import React from "react";
import loader from "../assert/images/loader.svg";
const Loader = () => {
  return (
    <div className="flex justify-center h-screen items-center">
      <img src={loader} className="w-24 h-24" alt="loader" />
    </div>
  );
};

export default Loader;
