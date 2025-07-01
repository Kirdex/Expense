import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
      <h3 className="text-lg font-medium text-black">Expense Tracker</h3>
      {children}
    </div>
  );
};

export default AuthLayout;
