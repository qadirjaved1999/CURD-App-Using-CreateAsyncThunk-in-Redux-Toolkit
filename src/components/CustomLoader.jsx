import React from "react";
import "./CustomLoader.css"; 

const CustomLoader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* ______________ Spinner Box ______________ */}
      <div className="loader"></div>
    </div>
  );
};

export default CustomLoader;
