import React from "react";

const Footer = () => {
  return (
    <footer className="flex h-24 w-full mt-auto items-center justify-center border-t ">
      <a
        className="flex items-center justify-center gap-2 text-sm font-semibold font-serif"
        href="https://github.com/GranotOn"
        target="_blank"
        rel="noopener noreferrer"
      >
        Made with 💖 by <span className="text-blue-400">On Granot</span>
      </a>
    </footer>
  );
};

export default Footer;
