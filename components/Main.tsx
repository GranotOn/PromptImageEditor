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
            border shadow-md font-semibold text-white animate-bg-gr-animate bg-[length:400%_400%]
            hover:animate-none hover:-translate-y-[2px] transition-transform duration-100
            active:shadow-lg active:-translate-y-[1px]"
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
