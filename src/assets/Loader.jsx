import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader; 