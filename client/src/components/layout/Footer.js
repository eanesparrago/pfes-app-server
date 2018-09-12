import React from "react";
import "./Footer.css";

export default () => {
  return (
    <footer className="Footer  mt-auto text-dark p-4 text-center">
      <div className="d-flex flex-column">
        <div className="d-flex">
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
        </div>

        <div>
          <a
            className=""
            href="https://darksky.net/poweredby/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Powered by Dark Sky
          </a>
        </div>
      </div>
    </footer>
  );
};
