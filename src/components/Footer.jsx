import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {currentYear} | Inspired by <a href="https://github.com/leocaprile" target="_blank"> Leo Caprile</a></p>
    </footer>
  );
}

export default Footer;
