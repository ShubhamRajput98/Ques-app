import React from "react";
import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#336ac2"
        ariaLabel="triangle-loading"
      />
    </div>
  );
};

export default Loader;
