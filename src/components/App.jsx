import React, { useEffect, useState } from "react";
import Home from "./Home";
import Signin from "./Signin";
import LoginSuccess from "./LoginSuccess";
import axios from "axios";

import { Routes, Route, Navigate } from "react-router-dom";
import IssueDetails from "./IssueDetails";

function App() {
  //const token = sessionStorage.getItem("token");

  // //var token = null;

  const [token, setToken] = useState(null);

  // async function fetchAuthUser() {
  //   try {
  //     const response = await axios.get("http://localhost:3001/auth/user", {
  //       withCredentials: true,
  //     });
  //     const newToken = response.data.githubAccessToken;
  //     setToken(newToken);
  //     sessionStorage.setItem("token", newToken);
  //   } catch (e) {
  //     console.error("Error fetching token:", e);
  //   }
  // }

  // useEffect(() => {
  //   fetchAuthUser();
  // }); // Empty dependency array to run only once

  //get the github token on the connected user


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  })



  //const token = sessionStorage.getItem("token");

  //console.log(token);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route
          path="/issues"
          element={token ? <Home /> : <Navigate to="/" replace />}
        />
        {/* <Route path="/issues" element={<Home />} /> */}

        <Route exact path="/error">
          There was an error while logging in. Please try again
        </Route>
        <Route
          path="/:owner/:organisation/issues/:issueNumber"
          element={<IssueDetails />}
        />
        <Route exact path="/login/success" element={<LoginSuccess />} />
      </Routes>
    </>
  );
}

export default App;
