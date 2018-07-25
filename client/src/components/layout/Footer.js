import React from "react";
import "./Footer.css"

export default () => {
  return (
    <footer className="Footer mt-auto bg-light text-dark mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} PFES App
    </footer>
  );
};
