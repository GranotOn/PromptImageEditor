import React, { useState } from "react";
import Prompt from "./Prompt";

const Main = () => {
  const [start, setStart] = useState<boolean>(false);
  return (
    <main className="mt-12">
      {start ? (
        <Prompt />
      ) : (
        <div className="relative my-10">
          <button
            className="px-4 py-2 rounded-md bg-gradient-to-tr from-blue-500 via-indigo-500 to-pink-400
            border shadow-2xl font-semibold text-white opacity-80
            hover:opacity-90 hover:text-white active:text-white active:opacity-100 transition-all duration-200"
            onClick={() => setStart(true)}
          >
            Start
          </button>
        </div>
      )}
    </main>
  );
};

export default Main;
