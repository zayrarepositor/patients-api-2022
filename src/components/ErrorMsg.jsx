import React from "react";

const ErrorMsg = ({ children }) => {
  return <p className="text-red-600 px-3">{children}</p>;
};

export default ErrorMsg;
