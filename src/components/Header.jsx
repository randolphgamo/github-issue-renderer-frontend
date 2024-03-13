import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

function Header() {

  return (
    <header>
      <h1>Welcome to GitHub Issue Renderer</h1>
      <Avatar />
    </header>
  );
}

export default Header;
