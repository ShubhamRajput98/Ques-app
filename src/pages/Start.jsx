import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen w-full">
          <div className="content flex flex-col justify-center items-center gap-6">
            <h1 className="text-6xl">Welcome to Ques App</h1>
            <Link
              to={"questions"}
              className="bg-green-500 px-10 py-2 rounded-xl"
            >
              Start
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;
