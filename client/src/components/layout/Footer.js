import React from "react";
import "./Footer.css";

export default () => {
  return (
    <footer className="Footer  mt-auto text-dark p-4 text-center">
      <span>Copyright &copy; {new Date().getFullYear()} PFES App</span>

      <div className="ml-3">
        <a
          href="https://www.facebook.com/PalanyagFreightExpress"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fab fa-facebook fa-lg" />
        </a>

        <a
          className="ml-3"
          href="http://palanyagfreightexpress.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fas fa-globe fa-lg" />
        </a>
      </div>
    </footer>
  );
};
