import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function IssueList(props) {
  //issues holds the current list of GitHub issues
  const [issues, setIssues] = useState([]);

  //keep track of any error while querying the API
  const [error, setError] = useState();

  //to show a fetching indicator
  const [isFetching, setIsFetching] = useState(false);

  localStorage.setItem("hasViewDetailsPage", false);

  var input = props.input;

  //url = https://api.github.com/repos/facebook/react/issues
  const url = "https://api.github.com/repos/" + input + "/issues";

  useEffect(() => {
    async function fetchIssues() {
      try {
        setIsFetching(true);
        const token = "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";
        const response = await axios.get(url, {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${token}`,
          },
          params: {
            per_page: 10,
          },
        });
        setIssues(response.data);

        setIsFetching(false);
        setError(false);
      } catch (error) {
        /* the error is thrown by axios*/
        setError(error);
      }
    }
    fetchIssues();
  }, [props.input]);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error.message}</p>;
  }

  return (
    <>
      {isFetching && <p>Fetching data ... </p>}
      {!isFetching && issues.length && (
        <>
          <h1>You are currently viewing issues for {props.input}</h1>
          <div className="issue-list">
            <ul>
              {/* map through the array of issues and render them*/}
              {issues.map((issue) => (
                <li key={issue.id}>
                  <Link to={`/${props.input}/issues/${issue.number}`}>
                    #{issue.number} {issue.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default IssueList;
