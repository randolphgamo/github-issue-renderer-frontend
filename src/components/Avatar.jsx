import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Avatar() {

    const navigate = useNavigate();

  return (
    <img
      className="avatar"
      src="https://cdn-icons-png.flaticon.com/128/10313/10313098.png"
      title="Logout"
      onClick={async () => {
        sessionStorage.removeItem("token");
        
        try {
          const response = await axios.post("http://localhost:3001/logout", {
            withCredentials: true,
          });
        } catch (e) {
          console.log("the error is " + e);
        }

        //redirect to the logging page after logout
        navigate("/");
      }}
    />
  );
}

export default Avatar;
