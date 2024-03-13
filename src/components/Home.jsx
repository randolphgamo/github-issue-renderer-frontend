import React, { useEffect } from "react";
import Header from "./Header";
import Input from "./Input";
import Footer from "./Footer";
import IssueList from "./IssueList";
import axios from "axios";

function Home() {
  const fetchAuthUser = async function () {
   

    try {
      const response = await axios.get("http://localhost:3001/auth/user", {
        withCredentials: true,
      });

   
      console.log(response.data.githubAccessToken);
      sessionStorage.setItem("token", response.data.githubAccessToken);

    } catch (e) {
      console.log("the error is " + e);
    }
  };


  //  useEffect(() => {
  //    fetchAuthUser();
  //  }, []);


  return (
    <div className="holder">
      <Header />
      <Input />
      <Footer />
    </div>
  );
}

export default Home;
