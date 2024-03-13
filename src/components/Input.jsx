import React, { useState, useRef, useEffect } from "react";
import IssueList from "./IssueList";

//to get a previous value inputted by the user
function getInputValue() {
  const storedValue = sessionStorage.getItem("form");

  if (!storedValue) return "";

  return JSON.parse(storedValue);
}

function Input() {
  const inputName = useRef();
  const [name, setName] = useState(getInputValue);

  const [submitted, setSubmitted] = useState(false);

  const viewDetailsPage = JSON.parse(
    sessionStorage.getItem("hasViewDetailsPage")
  );

  useEffect(() => {
    sessionStorage.setItem("form", JSON.stringify(name));
  }, [name]);

  function handleSubmit() {
    setName(inputName.current.value);
    setSubmitted(true);
  }

  return (
    <div className="form">
      <input
        type="text"
        placeholder="Owner/Repo"
        ref={inputName}
        defaultValue={name}
      />
      <button onClick={handleSubmit}>Fetch Issues</button>
      {submitted || viewDetailsPage ? <IssueList input={name} /> : null}
    </div>
  );
}

export default Input;
