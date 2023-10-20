import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://github.com/m091u/Project3-FullStack"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} readCycle. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
